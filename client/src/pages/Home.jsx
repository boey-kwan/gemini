import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
	const navigate = useNavigate()

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
					marginTop: '3em',
					fontSize: '3em',
					fontWeight: 'bold',
					letterSpacing: '0',
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
						navigate('/today')
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
