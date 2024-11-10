
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/login.js";
import '../styles/styles.css';
import { saveToken } from '../utils/auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log(` usuario ${userName} clave ${userPass}`);
    let objeto = JSON.stringify({
      correo_usuario: username,
      clave_usuario: password,
    });
    loginUser(objeto)
      .then((response) => {
        //console.log("datos loginUser ... " + JSON.stringify(response));
       
        if (response.success) {
          console.log(response.message);
         // console.log ( " TOKEN " + response.data)
          saveToken(response.data);
          navigate('/');
        } else {
          console.log(response.message);
          console.log(" no estas logeaddo ");
          setError('Credenciales incorrectas');
          return null;
        }
      })
      .catch((err) => {
        console.log ( " err " + err)
        setError('Credenciales incorrectas');
      });

    /*
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, { username, password });
      console.log ( " TOKEN " + response.data.data)
      saveToken(response.data.data);
      navigate('/dashboard');
    } catch (err) {
      console.log ( " err " + err)
      setError('Credenciales incorrectas');
    }
      */
  };

  return (
    
    <div className="container-login">
    <div className="container-form">
      <h2 className='formularioTxt'>INICIO SESION</h2>
      <form className="login-form"  onSubmit={handleLogin}>
      <div className="input-container">
         
          <input className='formularioTxt'
          placeholder='USUARIO'
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
         
          <input className='formularioTxt'
            placeholder='CONTRASEÑA'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='centrar-boton'>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='add-button ancho' type="submit">Login</button>

        </div>
        
      </form>
    </div>
    </div>
  );
};

export default Login;
