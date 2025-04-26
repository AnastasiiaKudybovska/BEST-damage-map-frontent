import { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <input 
          className="menu-toggle" 
          type="checkbox" 
          id="menu-toggle" 
          checked={menuOpen} 
          onChange={() => setMenuOpen(!menuOpen)} 
        />

        <label className="menu-icon" htmlFor="menu-toggle">
          <span className="menu-icon-line"></span>
        </label>
        
        <NavLink to="/" className="logo">Damage Map</NavLink>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/aboutUs" onClick={() => setMenuOpen(false)}>
            About Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;