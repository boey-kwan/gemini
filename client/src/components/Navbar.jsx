import { NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <div className="navbar" >
      <nav>
        <NavLink to="/" className="row-item">
          Logo
        </NavLink>
        <NavLink to="/today" className="row-item">
        Today
        </NavLink>
      </nav>
      {/* <nav >
        <NavLink to="/" className="row-item">
          <img alt="Logo" src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png" style={{height: "3em"}}></img>
        </NavLink>

        <NavLink to="/today" className="row-item">
          Today
        </NavLink>
      </nav> */}
    </div>
  );
}