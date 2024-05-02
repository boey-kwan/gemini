const isAuthenticated = (req, res, next) => {
	const token = req.body.token

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

export { isAuthenticated }
