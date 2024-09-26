import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const URL_LOGIN = `${baseURL}/api/auth/`;

export const loginUser = async (data) => {
  try {
    // Realizamos la solicitud POST para el login
    const response = await axios.post(URL_LOGIN, data, {
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo es JSON
        'Access-Control-Allow-Origin': '*', // Permitimos todas las solicitudes CORS
      },
    });

    // Devolvemos solo los datos de la respuesta
    return {
      success: true,
      data: response.data,
      message: 'Login exitoso',
    };

  } catch (error) {
    console.error("Error during login: ", error);

    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status, data } = error.response;

      const errorMessages = {
        400: 'Solicitud incorrecta. Verifica los datos proporcionados.',
        401: 'Credenciales inválidas. Por favor, intenta nuevamente.',
        500: 'Error interno del servidor. Inténtalo más tarde.',
      };

      return {
        success: false,
        message: errorMessages[status] || 'Error en el servidor',
        error: data,
      };

    } else if (error.request) {
      // Manejo de errores cuando no hay respuesta del servidor
      console.error("Error request: ", error.request);
      return {
        success: false,
        message: 'No se recibió respuesta del servidor. Verifica tu conexión.',
      };

    } else {
      // Manejo de cualquier otro tipo de error
      console.error('Error message: ', error.message);
      return {
        success: false,
        message: 'Error al realizar la solicitud. Inténtalo nuevamente.',
      };
    }
  }
};
