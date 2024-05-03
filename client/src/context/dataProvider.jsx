//contexts/auth.jsx
import { createContext, useCallback } from 'react'

import { CORS_CONFIG, SERVER_BASE_URL } from '../constants'
import { useAuth } from '.'

var initialState = {
	getDays: async () => {},
}

export const DataContext = createContext(initialState)

export default function DataProvider({ children }) {
	const { getTokenFromStorage } = useAuth()

	const getDays = useCallback(async () => {
		try {
			const response = await fetch(`${SERVER_BASE_URL}/days`, {
				method: 'GET',
				headers: {
					...CORS_CONFIG,
					Authorization: `Bearer token=${getTokenFromStorage()}`,
				},
			})

			if (!response.ok) {
				console.log('response error for getDays')
				return null
			}
			return await response.json()
		} catch (error) {
			console.log(error)
			return null
		}
	}, [])

	return (
		<DataContext.Provider
			value={{
				getDays,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}
