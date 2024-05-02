import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useState } from 'react'

import '../App.css'
import { useAuth } from '../context'

export default function Login() {
	const navigate = useNavigate()
	const { isLoggedIn, login, signup } = useAuth()

	function redirect() {
		navigate(location.state?.from?.pathname || '/')
	}

	if (isLoggedIn) {
		redirect()
	}

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})
	const [signupForm, setSignupForm] = useState({
		username: '',
		password: '',
	})

	async function handleLogin(e) {
		e.preventDefault()

		const username = e.target['username-field'].value
		const password = e.target['password-field'].value

		const response = await login({ username, password })

		if (response.success) {
			redirect()
		} else {
			// handle error nicely later
			alert('Invalid credentials')
			setLoginForm({
				username: '',
				password: '',
			})
		}
	}

	async function handleSignup(e) {
		e.preventDefault()

		const username = e.target['new-username-field'].value
		const password = e.target['new-password-field'].value

		const response = await signup({ username, password })

		if (response.success) {
			redirect()
		} else {
			// handle error nicely later
			alert('Invalid credentials')
			setLoginForm({
				username: '',
				password: '',
			})
		}
	}

	return (
		<div
			className="row"
			style={{ justifyContent: 'center', columnGap: '5%' }}
		>
			{/*login form here */}
			<form
				onSubmit={handleLogin}
				className="column login shadowed-card strong-shadow"
				style={{
					minWidth: 'fit-content',
				}}
			>
				<h1 className="h1">Log in</h1>
				<br />

				<TextField
					id="username-field"
					label="Username"
					variant="outlined"
					fullWidth
					value={loginForm.username}
					onChange={(e) => {
						setLoginForm({
							...loginForm,
							username: e.target.value,
						})
					}}
				/>

				<TextField
					id="password-field"
					label="Password"
					variant="outlined"
					value={loginForm.password}
					fullWidth
					onChange={(e) => {
						setLoginForm({
							...loginForm,
							password: e.target.value,
						})
					}}
				/>

				<button className="main-button outlined centered" type="submit">
					Submit
				</button>
			</form>

			<form
				onSubmit={handleSignup}
				className="column login shadowed-card strong-shadow"
				style={{
					minWidth: 'fit-content',
				}}
			>
				<h1 className="h1">Create New User</h1>
				<br />

				<TextField
					id="new-username-field"
					label="New username"
					variant="outlined"
					fullWidth
					value={signupForm.username}
					onChange={(e) => {
						setSignupForm({
							...signupForm,
							username: e.target.value,
						})
					}}
				/>

				<TextField
					id="new-password-field"
					label="New password"
					variant="outlined"
					fullWidth
					value={signupForm.password}
					onChange={(e) => {
						setSignupForm({
							...signupForm,
							password: e.target.value,
						})
					}}
				/>

				<button className="main-button outlined centered" type="submit">
					Submit
				</button>
			</form>
		</div>
	)
}
