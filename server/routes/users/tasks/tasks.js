import express from 'express'
import { isAuthenticated } from '../../../middleware/auth.js'
import { prisma } from '../../../db/prismaClient.js'

const router = express.Router()

// create a new task
router.post('/tasks', isAuthenticated, async (req, res) => {
	const { userId, title, description, location } = req.body

	// get current time in hours and minutes
	const time = new Date()
	time.setHours(0, 0, 0, 0)

	try {
		const newTask = await prisma.task.create({
			data: {
				title: title,
				userId: userId,
				description: description,
				location: location,
				time: time,
			},
		})

		res.status(200).json({
			status: true,
			message: 'successful',
			data: [{ taskID: newTask.id }],
		})
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

// get one task
router.get('/tasks', isAuthenticated, async (req, res) => {
	const { userID, taskID } = req.query

	try {
		const task = await prisma.task.findFirst({
			where: {
				id: parseInt(taskID),
				userId: parseInt(userID),
			},
			include: {
				photos: true,
			},
		})

		if (!task) {
			return res.status(404).json({
				status: false,
				message: 'Task not found',
			})
		}

		const responseData = {
			title: task.title,
			description: task.description,
			time: task.time,
			location: task.location,
			photoIDs: task.photos.map((photo) => photo.id),
		}

		return res.json({
			status: true,
			message: 'successful',
			data: [responseData],
		})
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

// Get all Tasks in day
router.get('/tasks-day', isAuthenticated, async (req, res) => {
	const { userId, date } = req.query

	try {
		const targetDate = new Date(date)
		targetDate.setHours(0, 0, 0, 0)

		const tasks = await prisma.task.findMany({
			where: {
				userId: parseInt(userId),
				days: {
					some: {
						date: targetDate,
					},
				},
			},
			include: {
				photos: true, // Include related photos
			},
		})

		const data = tasks.map((task) => ({
			title: task.title,
			description: task.description,
			time: task.time,
			location: task.location,
			photoIDs: task.photos.map((photo) => photo.id),
		}))

		return res.json({
			status: true,
			message: 'successful',
			data: data,
		})
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({
				status: false,
				message: error.message,
			})
		}
		return res.status(500).json({
			status: false,
			message: 'Internal server error',
		})
	}
})

// edit
router.patch('/tasks', isAuthenticated, async (req, res) => {
	const { userId, taskId, updates } = req.body

	try {
		// allow only the task owner to update the task
		const task = await prisma.task.findFirst({
			where: {
				id: taskId,
				userId: userId,
			},
		})

		if (!task) {
			return res.status(404).json({
				status: false,
				message: 'Task not found or not authorized to update this task',
			})
		}

		const updatedTask = await prisma.task.update({
			where: {
				id: taskId,
			},
			data: updates,
		})

		return res.status(200).json({
			status: true,
			message: 'Task updated successfully',
		})
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

export default router
