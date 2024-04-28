import express from 'express';
import { prisma } from '../db/prismaClient';

import daysRouter from './days/days.js';
import tasksRouter from './tasks/tasks.js';

const router = express.Router();


router.use('/days', daysRouter);
// router.use('/tasks', tasksRouter);

// Get all Tasks in day
// code here ...

export default router;
