//contexts/auth.jsx
import { createContext, useCallback, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { CORS_CONFIG, SERVER_BASE_URL } from '../constants'

var initialState = {
	user: null,
	isLoggedIn: false,
	login: async () => {},
	signup: async () => {},
	signout: () => {},
}

export const AuthContext = createContext(initialState)

export default function AuthProvider({ children }) {
	const navigate = useNavigate()

	const [user, setUser] = useState({
		role: null,
		username: null,
	})

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const verifyToken = useCallback(async (t) => {
		try {
			const response = await fetch(`${SERVER_BASE_URL}/auth/verify`, {
				method: 'GET',
				headers: {
					...CORS_CONFIG,
					Authorization: `Bearer token=${t}`,
				},
			})

			return await response.json()
		} catch (error) {
			console.log(error)
			return null
		}
	}, [])

	const login = useCallback(async ({ username, password }) => {
		try {
			const res = await fetch(`${SERVER_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					...CORS_CONFIG,
				},
				body: JSON.stringify({ username, password }), //username set here
			})

			if (res.status === 401) {
				return {
					success: false,
					message: 'Invalid Credentials',
				}
			} else if (res.status === 404) {
				return {
					success: false,
					message: 'Account does not exist',
				}
			} else if (res.ok === false) {
				return {
					success: false,
					message: 'Server Error',
				}
			}

			const data = await res.json()

			if (data?.success) {
				setUser({ ...data.user })
				setIsLoggedIn(true)
				setTokenInStorage(data.token)

				return {
					success: true,
					message: 'Login successful', //if success send to profilecontext
				}
			} else {
				return {
					success: false,
					message: 'Some error occurred. Please try again later.',
				}
			}
		} catch (error) {
			console.log(error)
			return {
				success: false,
				message: 'Invalid Credentials or Account does not exist',
			}
		}
	}, [])

	const signup = useCallback(async ({ username, password }) => {
		try {
			const res = await fetch(`${SERVER_BASE_URL}/auth/signup`, {
				method: 'POST',
				headers: {
					...CORS_CONFIG,
				},
				body: JSON.stringify({ username, password }),
			})

			const data = await res.json()

			if (data.success) {
				setUser({ ...data.user })
				setIsLoggedIn(true)
				setTokenInStorage(data.token)

				return {
					success: true,
					message: 'Signup successful',
				}
			}

			throw new Error(data.message)
		} catch (error) {
			console.error('Error during signup:', error)
			return {
				success: false,
				message: error.message || 'An error occurred during signup.',
			}
		}
	}, [])

	const signout = useCallback(() => {
		setUser(null)
		setIsLoggedIn(false)
		deleteTokenInStorage()
		navigate('/')
	}, [])

	useEffect(() => {
		const v = async () => {
			const t = getTokenFromStorage()
			if (t) {
				const res = await verifyToken(t)

				if (res?.success) {
					setIsLoggedIn(() => true)
					setUser(() => ({ ...res?.user }))
				}
			}
		}
		v()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				login,
				signup,
				signout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

function getTokenFromStorage(name = 'jwt') {
	return localStorage.getItem(name)
}
function setTokenInStorage(token, name = 'jwt') {
	localStorage.setItem(name, token)
}
function deleteTokenInStorage(name = 'jwt') {
	localStorage.removeItem(name)
}
