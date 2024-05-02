import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', (req, res) => {
	const { email, password } = req.body
	const result = login({ email, password })
	if (result.status) {
		res.status(200).json({
			status: true,
			message: 'Success',
		})
	} else {
		res.status(401).json({
			status: false,
			message: 'Invalid credentials',
		})
	}
})

function login({ email, password }) {
	if (!email || !password) {
		return res.status(400).json({
			status: false,
			message: 'Missing required fields',
		})
	}

	const user = prisma.user.findUnique({
		where: {
			email: email,
		},
	})

	if (!user) {
		return {
			status: false,
			message: 'User not found',
		}
	}

	if (user.password !== password) {
		return {
			status: false,
			message: 'Incorrect password',
		}
	}

	jwt.sign({ email }, process.env.MY_SECRET, null, (err, token) => {
		if (err) {
			return {
				status: false,
				message: 'Failed to generate token\n' + err,
			}
		}

		return {
			status: true,
			message: 'Success',
			token: token,
		}
	})
}

// Create User
router.post('/', async (req, res) => {
	const { email, password, name } = req.body

	if (!email || !password) {
		return res.status(400).json({
			status: false,
			message: 'Missing required fields',
		})
	}

	try {
		// Check for existing user
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		})

		if (existingUser) {
			return res.status(400).json({
				status: false,
				message: 'username is not unique',
			})
		}

		// Assuming all requests are authorized

		// Create new user
		const user = await prisma.user.create({
			data: {
				email: email,
				password: password,
				name: name,
			},
		})

		jwt.sign({ email }, process.env.MY_SECRET, null, (err, token) => {
			if (err) {
				return {
					status: false,
					message: 'Failed to generate token\n' + err,
				}
			}

			return {
				status: true,
				message: 'Success',
				token: token,
			}
		})
	} catch (error) {
		console.error('Failed to create user:', error)
		return res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

export default router
