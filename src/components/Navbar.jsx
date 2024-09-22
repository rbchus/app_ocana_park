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
    <nav className="sidebar general-horizontal">
      <img className='logo' src="./img/ocanaPark_white.png" />
    <ul className='link-menu'>
          <li ><Link  className='font-menu' to="/ninos">ADMIN NIÑOS</Link></li>
          <li ><Link  className='font-menu' to="/juegos">ADMIN JUEGOS</Link></li>
    </ul>
  
    <button className="delete-button ancho" onClick={handleLogout}>Logout</button>
</nav>
  );
};

export default Navbar;
