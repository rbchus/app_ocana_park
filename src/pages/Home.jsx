import React from 'react';
import Navbar from '../components/Navbar.jsx';
import '../styles/styles.css';

const Home = () => {
  return (
    <div className="container-all">
       <Navbar />
       <div className="container-login"> 
      
      <img className='logoGrande' src="./img/ocanaPark_blue.svg" />
    </div>
    </div>
  );
};

export default Home;
