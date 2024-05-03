import express from 'express'
import { prisma } from '../../db/prismaClient.js'

const router = express.Router()

// Edit User
router.patch('/users/:userId', async (req, res) => {
	const { userId } = req.params
	const { email, password, name } = req.body

	if (!email || !password) {
		return res.status(400).json({
			status: false,
			message: 'Missing required fields',
		})
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(userId) },
		})
		if (!user) {
			return res
				.status(404)
				.json({ status: false, message: 'user not found' })
		}

		const updatedUser = await prisma.user.update({
			where: { id: parseInt(userId) },
			data: { email, password, name },
		})

		return res.json({ status: true, message: 'successful' })
	} catch (error) {
		if (error.code === 'P2002') {
			return res
				.status(409)
				.json({ status: false, message: 'username is not unique' })
		}
		return res.status(500).json({ status: false, message: error.message })
	}
})

export default router
