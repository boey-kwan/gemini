import { useState } from 'react'
import '../App.css'
import { TextField } from '@mui/material'

export default function Memories() {
	const [prompt, setPrompt] = useState('')

	return (
		<div className="centered">
			<h1 className="h1">Memories</h1>

			<br />

			{/* Text field */}
			<div className="row">
				<TextField
					id="prompt-field"
					label="What do you want to remember?"
					variant="outlined"
					autoFocus={true}
					fullWidth
					style={{ margin: '1em', width: '100%' }}
					value={prompt}
					onChange={(e) => {
						setPrompt(e.target.value)
					}}
				/>

				<button className="button main-button">Go!</button>
			</div>
		</div>
	)
}
