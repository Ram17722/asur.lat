import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div id="loadingBar" style={{ position: 'fixed', top: 0, left: 0, height: '3px', width: '0%', background: '#c85600', zIndex: 200 }} />
      <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
      
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={toggleMenu}>&times;</div>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/blogs" onClick={toggleMenu}>Blogs</Link>
        <Link to="/projects" onClick={toggleMenu}>Projects</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
