import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { prisma } from '../../db/prismaClient';

const router = express.Router();

router.get('/users/days', isAuthenticated, async (req, res) => {
  const { userID, listOfDates } = req.query;

  if (!userID || !listOfDates) {
    return res.status(400).json({
      status: false,
      message: 'Missing userID or listOfDates'
    });
  }

  try {
    // Convert listOfDates from string to array if necessary
    const dates = Array.isArray(listOfDates) ? listOfDates : JSON.parse(listOfDates);

    const userDays = await prisma.day.findMany({
      where: {
        userId: parseInt(userID),
        date: {
          in: dates.map(date => new Date(date))
        }
      },
      include: {
        tasks: true // TODO: probably maybe needs adjustment
      }
    });

    return res.status(200).json({
      status: true,
      message: 'successful',
      data: userDays
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
});

module.exports = router;