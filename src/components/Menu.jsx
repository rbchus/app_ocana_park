import React from 'react';
import { useNavigate } from 'react-router-dom';


import '../styles/stylesv2.css';
import { logout } from '../utils/auth';

const Menu = ({SetOption}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const ir =(opc)=> {
    
    SetOption(opc)
  }



  return (
    <header class="navbar">
        <div class="navbar-brand">
        <img className='logo' src="./img/ocanaPark_white.svg" />
        </div>
        <nav class="navbar-links">
            <a onClick={()=> ir(1)}>Niños</a>
            <a  onClick={()=> ir(2)}>Juegos</a>
            <a onClick={handleLogout}>Cerrar Sesión</a>
        </nav>
    </header>

  );
};

export default Menu;
