import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/styles.css';
import { logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sidebar general-vertical">
      <img className='logo' src="./img/ocanaPark_white.png" />
    <ul>
    <li ><Link  to="/">Inicio</Link></li>
     
          <li ><Link  to="/ninos">Niños</Link></li>
          <li ><Link  to="/juegos">Juegos</Link></li>
    </ul>
  
    <button className="delete-button ancho" onClick={handleLogout}>Logout</button>
</nav>
  );
};

export default Navbar;
