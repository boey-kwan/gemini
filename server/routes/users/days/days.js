import express from 'express'
import { isAuthenticated } from '../../../middleware/auth.js'
import { prisma } from '../../../db/prismaClient.js'

const router = express.Router()

// create a new day
router.post('/days', isAuthenticated, async (req, res) => {
	const { userId, date } = req.body

	try {
		// valid user?
		const userExists = await prisma.user.findUnique({
			where: { id: userId },
		})

		if (!userExists) {
			return res.status(404).json({
				status: false,
				message: 'User not found',
			})
		}

		// day already exists?
		const dayExists = await prisma.day.findFirst({
			where: {
				date: new Date(date),
				userId: userId,
			},
		})

		if (dayExists) {
			return res.status(400).json({
				status: false,
				message: 'Day already exists',
			})
		}

		// valid date
		const newDay = await prisma.day.create({
			data: {
				date: new Date(date),
				userId: userId,
			},
		})

		return res.status(200).json({
			status: true,
			message: 'successful',
		})
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

// get a day
router.get('/days', isAuthenticated, async (req, res) => {
	const { userId, date } = req.query

	try {
		const parsedDate = new Date(date)
		if (isNaN(parsedDate)) {
			return res.status(400).json({
				status: false,
				message: 'Invalid date format',
			})
		}

		const tasks = await prisma.day.findMany({
			where: {
				userId: parseInt(userId),
				date: parsedDate,
			},
			include: {
				tasks: true, // Include related tasks
			},
		})

		if (tasks.length === 0) {
			return res.status(404).json({
				status: false,
				message: 'No tasks found for this day',
			})
		}

		const taskIDs = tasks[0].tasks.map((task) => task.id)

		return res.status(200).json({
			status: true,
			message: 'successful',
			data: [
				{
					taskIDs: taskIDs,
				},
			],
		})
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

// update a day (overwrite tasks)
router.put('/days', isAuthenticated, async (req, res) => {
	const { userId, date, taskIDList } = req.body

	try {
		if (!(user.id === parseInt(userId))) {
			return res.status(403).json({
				status: false,
				message: 'not authorized',
			})
		}

		// set to 00:00:00 for consistency
		const dateObj = new Date(date)
		dateObj.setHours(0, 0, 0, 0)

		// Find the Day record
		const day = await prisma.day.findUnique({
			where: {
				userId_date: { userId: parseInt(userId), date: dateObj },
			},
		})

		if (!day) {
			return res.status(404).json({
				status: false,
				message: 'Day not found',
			})
		}

		// Disconnect all current tasks from this day
		await prisma.day.update({
			where: {
				userId_date: { userId: parseInt(userId), date: dateObj },
			},
			data: {
				tasks: {
					set: [],
				},
			},
		})

		// Connect new tasks to this day
		await prisma.day.update({
			where: {
				userId_date: { userId: parseInt(userId), date: dateObj },
			},
			data: {
				tasks: {
					connect: taskIDList.map((taskId) => ({ id: taskId })),
				},
			},
		})

		// Successfully updated
		res.status(200).json({
			status: true,
			message: 'successful',
		})
	} catch (error) {
		console.error('Error updating tasks for day:', error)
		res.status(500).json({
			status: false,
			message: error.message || 'Internal server error',
		})
	}
})

export default router
