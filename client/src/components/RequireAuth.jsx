import { useAuth } from '../context/index'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

function RequireAuth() {
	const { isLoggedIn } = useAuth()
	const location = useLocation()

	if (!isLoggedIn) {
		return (
			<Navigate
				to="login"
				state={{
					from: location,
				}}
				replace
			/>
		)
	} else {
		return <Outlet />
	}
}
export default RequireAuth
