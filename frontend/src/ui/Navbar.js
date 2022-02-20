import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="Navbar">
			<div><Link to="/movies">Filmy</Link></div>
			<div><Link to="/persons">Osoby</Link></div>

		</div>
	)
}

export default NavBar