import prisma from '../config/prisma.js';

// @desc    Get all properties with filtering, search & sorting
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const {
      search,
      city,
      locality,
      type,
      bhk,
      minPrice,
      maxPrice,
      furnishing,
      featured,
      sort,
    } = req.query;

    const where = {};

    if (city && city !== 'All') {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (locality) {
      where.locality = { contains: locality, mode: 'insensitive' };
    }

    if (type && type !== 'All') {
      where.type = type;
    }

    if (bhk && bhk !== 'All') {
      where.bhk = parseInt(bhk);
    }

    if (furnishing && furnishing !== 'All') {
      where.furnishing = furnishing;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { locality: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-high') {
      orderBy = { price: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    // Format owner details for frontend compatibility
    const formattedProperties = properties.map((prop) => ({
      ...prop,
      owner: {
        name: prop.ownerName || prop.owner?.name || 'Verified Owner',
        type: 'Verified Owner',
        avatar: prop.ownerAvatar || prop.owner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: prop.ownerPhone || prop.owner?.phone || '+91 98765 43210',
        responseRate: '98% (Responds in ~15 mins)',
        memberSince: '2023',
      },
    }));

    res.json(formattedProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    if (property) {
      const formatted = {
        ...property,
        owner: {
          name: property.ownerName || property.owner?.name || 'Verified Owner',
          type: 'Verified Owner',
          avatar: property.ownerAvatar || property.owner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          phone: property.ownerPhone || property.owner?.phone || '+91 98765 43210',
          responseRate: '98% (Responds in ~15 mins)',
          memberSince: '2023',
        },
      };
      res.json(formatted);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new property listing
// @route   POST /api/properties
// @access  Private (Owner/Admin)
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      tagline,
      city,
      locality,
      address,
      price,
      deposit,
      maintenance,
      type,
      bhk,
      bathrooms,
      areaSqFt,
      furnishing,
      floor,
      facing,
      availableFrom,
      amenities,
      description,
      images,
    } = req.body;

    let imageList = [];
    if (req.files && req.files.length > 0) {
      imageList = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (images && Array.isArray(images)) {
      imageList = images;
    } else if (typeof images === 'string') {
      imageList = [images];
    } else {
      imageList = [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      ];
    }

    const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities || [];

    const property = await prisma.property.create({
      data: {
        title,
        tagline: tagline || '',
        city,
        locality,
        address,
        price: parseFloat(price),
        deposit: parseFloat(deposit || price * 3),
        maintenance: parseFloat(maintenance || 3000),
        type,
        bhk: parseInt(bhk),
        bathrooms: parseInt(bathrooms || 2),
        areaSqFt: parseInt(areaSqFt),
        furnishing: furnishing || 'Semi-Furnished',
        floor: floor || '2nd Floor',
        facing: facing || 'East Facing',
        availableFrom: availableFrom || 'Immediate',
        verified: true,
        featured: false,
        images: imageList,
        amenities: parsedAmenities,
        description,
        ownerId: req.user.id,
        ownerName: req.user.name,
        ownerAvatar: req.user.avatar || '',
        ownerPhone: req.user.phone || '+91 98765 43210',
      },
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update property listing
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
export const updateProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId && property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to edit this property' });
    }

    const updatedProperty = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete property listing
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
export const deleteProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId && property.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await prisma.property.delete({ where: { id: req.params.id } });
    res.json({ message: 'Property removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get listings owned by logged in user
// @route   GET /api/properties/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: { ownerId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
