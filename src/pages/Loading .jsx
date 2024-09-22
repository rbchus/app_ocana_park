import React from 'react';
import './loading.css'; // Importamos los estilos CSS

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
      <img className='logo' src="./img/ocanaPark_blue.svg" />
      </div>
    </div>
  );
};

export default Loading;
