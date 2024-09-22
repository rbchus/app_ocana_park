import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/styles.css';
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
    <nav className="sidebar general-horizontal">
      <img className='logo' src="./img/ocanaPark_white.svg" />
    <ul className='link-menu'>
          <div ><a  className='font-menu' onClick={()=> ir(1)}>
          <img className='ico' src="./img/nino.svg" /></a></div>
          <div ><a  className='font-menu' onClick={()=> ir(2)}>
          <img className='ico' src="./img/juego.svg" /></a></div>
    </ul>
  
    <button className="delete-button ancho" onClick={handleLogout}>CERRAR SESION</button>
</nav>
  );
};

export default Menu;
