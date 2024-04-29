import express from 'express';
import { prisma } from '../db/prismaClient';

import daysRouter from './days/days.js';
import tasksRouter from './tasks/tasks.js';
import memoriesRouter from './memories/memories.js';

const router = express.Router();

// deeper routes 
router.use('/days', daysRouter);
router.use('/tasks', tasksRouter);
router.use('/memories', memoriesRouter);

// Create User
router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing required fields"
      });
    }
  
    try {
      // Check for existing user
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "username is not unique"
        });
      }
  
      // Assuming all requests are authorized
  
      // Create new user
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password,
        },
      });
  
      return res.status(201).json({
        status: true,
        message: "successful"
      });
    } catch (error) {
      console.error('Failed to create user:', error);
      return res.status(500).json({
        status: false,
        message: error.message
      });
    }
  });
  

export default router;
