import express from 'express'
import cors from 'cors'
import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

import usersRouter from './routes/users/index.js'
import authRouter from './routes/auth/auth.js'
import { isAuthenticated } from './middleware/auth.js'

const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())

app.options('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, Content-Length, X-Requested-With'
	)
	res.send(200)
})

// public routes
app.use('/auth', authRouter)

// private routes protected by isAuthenticated middleware
app.use(isAuthenticated)
app.use('/users', usersRouter)

// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
