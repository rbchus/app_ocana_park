
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
       
        if (response.auth) {
          console.log(response.message);
         // console.log ( " TOKEN " + response.data)
          saveToken(response.data);
          navigate('/ ');
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
    <div className="container-form">
      <h2>Login</h2>
      <form className="login-form"  onSubmit={handleLogin}>
      <div className="input-container">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='add-button ancho' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
