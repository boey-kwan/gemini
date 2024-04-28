import express from 'express';
import { prisma } from '../db/prismaClient';

import daysRouter from './days/days.js';
import tasksRouter from './tasks/tasks.js';

const router = express.Router();


router.use('/days', daysRouter);
router.use('/tasks', tasksRouter);

// Get all Tasks in day
router.get('/', isAuthenticated, async (req, res) => {
    const { userId, date } = req.query;
  
    try {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);
  
      const tasks = await prisma.task.findMany({
        where: {
          userId: parseInt(userId),
          days: {
            some: {
              date: targetDate
            }
          }
        },
        include: {
          photos: true // Include related photos
        }
      });
  
      const data = tasks.map(task => ({
        title: task.title,
        description: task.description,
        time: task.time,
        location: task.location,
        photoIDs: task.photos.map(photo => photo.id)
      }));
  
      return res.json({
        status: true,
        message: 'successful',
        data: data
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
          status: false,
          message: error.message
        });
      }
      return res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  });

export default router;
