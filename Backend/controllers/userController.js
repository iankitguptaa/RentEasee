import prisma from '../config/prisma.js';

// @desc    Get user's saved properties
// @route   GET /api/users/saved
// @access  Private
export const getSavedProperties = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        savedProperties: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.savedProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle save/unsave property
// @route   POST /api/users/saved/:propertyId
// @access  Private
export const toggleSaveProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { savedProperties: { select: { id: true } } },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isAlreadySaved = user.savedProperties.some((p) => p.id === propertyId);

    if (isAlreadySaved) {
      // Disconnect (Unsave)
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          savedProperties: {
            disconnect: { id: propertyId },
          },
        },
      });
      res.json({ message: 'Property removed from saved', saved: false, propertyId });
    } else {
      // Connect (Save)
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          savedProperties: {
            connect: { id: propertyId },
          },
        },
      });
      res.json({ message: 'Property added to saved', saved: true, propertyId });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
