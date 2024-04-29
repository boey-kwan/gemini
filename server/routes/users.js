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
  const { email, password, name } = req.body;

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
        name: name
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

// Edit User
router.patch('/users/:userId', isAuthenticated, async (req, res) => {
  const { userId } = req.params;
  const { email, password, name } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { email, password, name },
    });

    return res.json({ status: true, message: "successful" });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ status: false, message: "username is not unique" });
    }
    return res.status(500).json({ status: false, message: error.message });
  }
});

export default router;
