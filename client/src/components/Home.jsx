import { useNavigate, useLocation } from 'react-router-dom'
import '../App.css'

export default function Home() {
	const navigate = useNavigate()

	// Determine the user and the date
	const location = useLocation()
	let username = ''
	if (location.pathname.split('/').length > 2) {
		username = location.pathname.split('/')[2]
	}
	const date = new Date()
	const dateString = date.toDateString()

	return (
		<div
			style={{
				display: 'flex',
				height: '100%',
				flexDirection: 'column',
				gap: '4em',
			}}
		>
			<h1
				className="h1"
				style={{
					fontSize: '3em',
					fontWeight: 'bold',
				}}
			>
				Welcome to Gemini Task Manager!
			</h1>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<button
					className="button main-button"
					style={{
						minWidth: '15em',
					}}
					onClick={() => {
						navigate('/date/' + dateString + '/' + username)
					}}
				>
					Jump to today's tasks!
				</button>
				<button
					style={{
						minWidth: '15em',
					}}
					className="button secondary-button"
					onClick={() => {
						navigate('/memories')
					}}
				>
					See memories
				</button>
			</div>
		</div>
	)
}
