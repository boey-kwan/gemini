import { NavLink } from 'react-router-dom'
import '../App.css'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Navbar(props) {
	const date = new Date()
	const dateString = date.toDateString()

	return (
		<nav>
			<div className="navbar" style={{ justifyContent: 'space-between' }}>
				<NavLink to="/" style={{ padding: '2em' }}>
					<FavoriteIcon />
				</NavLink>
				<div style={{ display: 'flex', columnGap: '1em' }}>
					<NavLink
						to={
							props.loggedIn
								? '/date/' + dateString + '/${username}'
								: '/login'
						}
						className="navbutton"
					>
						Today
					</NavLink>
					<NavLink
						to={props.loggedIn ? '/memories' : '/login'}
						className="navbutton"
					>
						Memories
					</NavLink>
					{props.loggedIn ? (
						<NavLink
							to="/login"
							className="navbutton loginbutton"
							onClick={() => props.setLoggedIn(false)}
						>
							Log out
						</NavLink>
					) : (
						<NavLink to="/login" className="navbutton loginbutton">
							Log in
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	)
}

{
	/* <nav >
        <NavLink to="/" className="row-item">
          <img alt="Logo" src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png" style={{height: "3em"}}></img>
        </NavLink>

        <NavLink to="/today" className="row-item">
          Today
        </NavLink>
      </nav> */
}
