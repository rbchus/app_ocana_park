import axios from 'axios';
const URL_LOGIN = import.meta.env.VITE_URL_LOGIN;

export const loginUser = async (data) => {
  //console.log("URL_LOGIN: " + URL_LOGIN);
  //console.log("Data being sent: " + JSON.stringify(data));
  
  try {
    const response = await axios.post(URL_LOGIN, data, {
        headers: {
          'Content-Type': 'application/json',   // Indica que el cuerpo de la solicitud está en formato JSON
          'Access-Control-Allow-Origin': '*' 
           }// Ejemplo de otro encabezado personalizado que puedas necesitar
        });
    //console.log("Response from login service: " + JSON.stringify(response.data));
    return response.data;  // Solo devuelve los datos reales de la respuesta
  } catch (error) {
    console.error("Error during login: ", error);
    
    // Puedes personalizar el manejo de errores según lo que esperas
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado que
      // cae fuera del rango de 2xx
      console.error("Error data: ", error.response.data);
      console.error("Error status: ", error.response.status);
      console.error("Error headers: ", error.response.headers);
      return { success: false, message: 'Error en el servidor', error: error.response.data };
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("Error request: ", error.request);
      return { success: false, message: 'No se recibió respuesta del servidor' };
    } else {
      // Algo sucedió al configurar la solicitud que desencadenó un error
      console.error('Error message: ', error.message);
      return { success: false, message: 'Error al realizar la solicitud' };
    }
  }
};
