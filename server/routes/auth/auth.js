import express from 'express'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

const router = express.Router()

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const result = await login({ username, password })

	console.log('result', result)
	if (result.status) {
		res.status(200).json({
			status: true,
			message: 'Success',
		})
	} else {
		res.status(401).json({
			status: false,
			message: result.message,
		})
	}
})

async function login({ username, password }) {
	if (!username || !password) {
		return res.status(400).json({
			status: false,
			message: 'Missing required fields',
		})
	}

	const user = await prisma.user.findUnique({
		where: {
			email: username,
		},
	})

	console.log('user', user)

	if (!user) {
		return {
			status: false,
			message: 'User not found',
		}
	}

	console.log('user.password', user.password)
	console.log('password', password)
	if (user.password !== password) {
		return {
			status: false,
			message: 'Incorrect password',
		}
	}

	try {
		const token = jwt.sign({ username }, process.env.MY_SECRET)

		return {
			status: true,
			message: 'Success',
			token: token,
		}
	} catch (err) {
		return {
			status: false,
			message: 'Failed to generate token\n',
		}
	}
}

// Create User
router.post('/signup', async (req, res) => {
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

router.get('/verify', async (req, res) => {
	/**
	 * Return type:
	 *
	 * {
	 * 		success: boolean,
	 * 		message: string,
	 * 		user? : {
	 * 			username: string,
	 * 		}
	 * }
	 */

	const token = getTokenFromHeader(req)
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
		})
	}

	try {
		const decodedToken = jwt.verify(token, process.env.MY_SECRET)
		if (!decodedToken) {
			console.log('Token is expired or invalid')
			return res.status(403).json({
				success: false,
				message: 'Invalid token',
			})
		}

		return res.json({
			success: true,
			message: 'Verified successfully',
			user: decodedToken,
		})
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			return res.status(403).json({
				success: false,
				message: 'Token expired',
			})
		} else if (err instanceof jwt.JsonWebTokenError) {
			return res.status(403).json({
				success: false,
				message: 'Invalid token',
			})
		} else {
			return res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
})

function getTokenFromHeader(req) {
	let header = req?.headers?.authorization.split('Bearer ')[1]

	try {
		const tokenParts = header.split('=')
		if (tokenParts.length !== 2 || tokenParts[0] !== 'token') {
			console.log('Cookie format is invalid')
			console.log('Token parts: ', tokenParts)
			throw new Error('Invalid token format')
		}
		return tokenParts[1]
	} catch (error) {
		return null
	}
}
export default router
