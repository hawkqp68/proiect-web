import { NavLink } from 'react-router';
function Navbar() {
 return (
 <nav className="nav">
 <NavLink to="/" className={function({isActive}) { return isActive ? 'active' : ''; }}>Home</NavLink>
 <NavLink to="/projects" className={function({isActive}) { return isActive ? 'active' : ''; }}>Proiecte</NavLink>
 <NavLink to="/contact" className={function({isActive}) { return isActive ? 'active' : ''; }}>Contact</NavLink>
 </nav>
 );
}
export default Navbar;