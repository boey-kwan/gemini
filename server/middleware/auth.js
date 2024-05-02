const isAuthenticated = (req, res, next) => {
	const token = getTokenFromHeader(req)

	if (!token) {
		return res.status(401).json({
			status: false,
			message: 'Unauthorized',
		})
	}

	jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: false,
				message: 'Unauthorized',
			})
		}

		req.userEmail = decoded
		next()
	})
}

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

export { isAuthenticated }
