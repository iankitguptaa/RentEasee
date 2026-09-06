import prisma from '../config/prisma.js';

// @desc    Submit an enquiry for a property
// @route   POST /api/enquiries
// @access  Public / Optional Auth
export const createEnquiry = async (req, res) => {
  try {
    const { propertyId, propertyTitle, senderName, senderEmail, senderPhone, moveInDate, message } = req.body;

    if (!propertyId || !senderName || !senderEmail || !senderPhone || !message) {
      return res.status(400).json({ message: 'Please fill in all required enquiry fields' });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        propertyId,
        propertyTitle: propertyTitle || 'RentEase Property',
        senderName,
        senderEmail,
        senderPhone,
        moveInDate: moveInDate || 'Immediate',
        message,
        senderId: req.user ? req.user.id : null,
      },
    });

    res.status(201).json({ message: 'Enquiry sent successfully!', enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's sent or received enquiries
// @route   GET /api/enquiries/my-enquiries
// @access  Private
export const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      where: {
        OR: [
          { senderId: req.user.id },
          { property: { ownerId: req.user.id } },
        ],
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            locality: true,
            images: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
