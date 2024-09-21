import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { isAuthenticated } from '../utils/auth';


const Dashboard = () => {


  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='anchoDashBoard'> 
    <div className='general-horizontal'>
          <img className='logo' src="./img/ocanaPark_blue.png" />
    </div>

    
    <div className='general-horizontal anchoDashBoard'>
    <Link  className= 'textoLink' to="/acudientes">
    <div className='general-vertical'>
    <img className='icono' src="./img/acudiente.svg" />
    <h2 className='textoCentrado'>Registrar<br/>Acudiente</h2>
    </div>
    </Link>
    
    <Link  className= 'textoLink'  to="/ninos">
    <div className='general-vertical'>
    <img className='icono' src="./img/nino.svg" />
      <h2 className='textoCentrado'>Registrar<br/>Niño</h2>
    </div>
    </Link>

    <Link  className= 'textoLink'   to="/juegos">
    <div className='general-vertical'>
    <img className='icono' src="./img/juego.svg" />
      <h2 className='textoCentrado'>Registrar<br/>Juego</h2>
    </div>
    </Link>n
    </div>
    
    
     

    
    </div>
  );
};

export default Dashboard;
