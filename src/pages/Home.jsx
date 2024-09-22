import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import { getAllNinos } from "../services/ninos.js";
import '../styles/styles.css';

const Home = () => {

  const fetchNinos = () => {
    getAllNinos()
      .then((response) => {
        console.log("test " + test);
      })
      .catch((error) => {
        console.log("Error servicio  " + error);
     
      });
  };

  useEffect(() => {

    setTimeout(() => {
      fetchNinos();
    }, 500);
  
  }, []);


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
