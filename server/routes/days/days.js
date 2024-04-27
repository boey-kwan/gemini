import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { prisma } from '../../db/prismaClient';

const router = express.Router();


// create a new day
router.post('/days', isAuthenticated, async (req, res) => {
  const { userId, date } = req.body;

  try {
    // valid user?
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userExists) {
      return res.status(404).json({
        status: false,
        message: 'User not found'
      });
    }

    // day already exists?
    const dayExists = await prisma.day.findFirst({
      where: {
        date: new Date(date),
        userId: userId
      }
    });

    if (dayExists) {
      return res.status(400).json({
        status: false,
        message: 'Day already exists'
      });
    }

    // valid date
    const newDay = await prisma.day.create({
      data: {
        date: new Date(date),
        userId: userId,
      },
    });

    return res.status(200).json({
      status: true,
      message: 'successful',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
});


export default router;