import axios from "axios";
import { getToken } from '../utils/auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const URL_NINO = `${baseURL}/api/nino/`;

// Función para obtener los headers
const getHeaders = (token) => ({
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
});

export const getAllNinos = async () => {
  try {
    // Obtener el token dinámicamente
    const token = getToken();

    // Realizar la solicitud GET
    const response = await axios.get(URL_NINO, {
      headers: getHeaders(token),
    });

    // Verificar si la respuesta es exitosa
   // console.log (" response niños " +  JSON.stringify(response))
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: 'Datos obtenidos exitosamente.',
      };
    }

    // En caso de que el status no sea 200 pero no se lance error
    return {
      status: false,
      datos: [],
      message: 'Respuesta inesperada del servidor.',
    };

  } catch (error) {
    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: 'Error 400: Solicitud incorrecta.',
        500: 'Error 500: Error interno del servidor.',
      };

      return {
        status: false,
        datos: [],
        message: errorMessages[status] || `Error ${status}: Ocurrió un error inesperado.`,
      };
    }

    // Error fuera de la respuesta HTTP (problemas de red, timeout, etc.)
    return {
      status: false,
      datos: [],
      message: 'Error de red o de servidor. No se pudo establecer conexión.',
    };
  }
};



export const getNino = async (id) => {
  try {
    // Obtener el token dinámicamente
    const token = getToken();
    
    // Generar el endpoint con el ID
    const END_POINT = `${URL_NINO}${id}`;
    
    // Realizar la solicitud GET
    const response = await axios.get(END_POINT, {
      headers: getHeaders(token),
    });

    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: 'Datos del niño obtenidos exitosamente.',
      };
    }

    return {
      status: false,
      datos: [],
      message: 'Respuesta inesperada del servidor.',
    };

  } catch (error) {
    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: 'Error 400: Solicitud incorrecta.',
        404: 'Error 404: Niño no encontrado.',
        500: 'Error 500: Error interno del servidor.',
      };

      return {
        status: false,
        datos: [],
        message: errorMessages[status] || `Error ${status}: Ocurrió un error inesperado.`,
      };
    }

    // Error fuera de la respuesta HTTP (problemas de red, timeout, etc.)
    return {
      status: false,
      datos: [],
      message: 'Error de red o de servidor. No se pudo establecer conexión.',
    };
  }
};


export const setNino = async (data) => {
  try {
    // Obtener el token dinámicamente
    const token = getToken();
    
    // Realizar la solicitud POST
    const response = await axios.post(URL_NINO, data, {
      headers: getHeaders(token),
    });

    // Verificar si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: 'Niño creado exitosamente.',
      };
    }

    return {
      status: false,
      datos: [],
      message: 'Respuesta inesperada del servidor.',
    };

  } catch (error) {
    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: 'Error 400: Solicitud incorrecta.',
        500: 'Error 500: Error interno del servidor.',
      };

      return {
        status: false,
        datos: [],
        message: errorMessages[status] || `Error ${status}: Ocurrió un error inesperado.`,
      };
    }

    // Error fuera de la respuesta HTTP (problemas de red, timeout, etc.)
    return {
      status: false,
      datos: [],
      message: 'Error de red o de servidor. No se pudo establecer conexión.',
    };
  }
};

export const updateNino = async (id, data) => {
  try {
    // Obtener el token dinámicamente
    const token = getToken();
    
    // Generar el endpoint con el ID
    const END_POINT = `${URL_NINO}${id}`;
    
    // Realizar la solicitud PUT
    const response = await axios.put(END_POINT, data, {
      headers: getHeaders(token),
    });

    // Verificar si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: 'Niño actualizado exitosamente.',
      };
    }

    return {
      status: false,
      datos: [],
      message: 'Respuesta inesperada del servidor.',
    };

  } catch (error) {
    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: 'Error 400: Solicitud incorrecta.',
        404: 'Error 404: Niño no encontrado.',
        500: 'Error 500: Error interno del servidor.',
      };

      return {
        status: false,
        datos: [],
        message: errorMessages[status] || `Error ${status}: Ocurrió un error inesperado.`,
      };
    }

    // Error fuera de la respuesta HTTP (problemas de red, timeout, etc.)
    return {
      status: false,
      datos: [],
      message: 'Error de red o de servidor. No se pudo establecer conexión.',
    };
  }
};


   
export const deleteNino = async (id) => {
  try {
    // Obtener el token dinámicamente
    const token = getToken();

    // Generar el endpoint con el ID
    const END_POINT = `${URL_NINO}${id}`;

    // Realizar la solicitud DELETE
    const response = await axios.delete(END_POINT, {
      headers: getHeaders(token),
    });

    // Verificar si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: 'Niño eliminado exitosamente.',
      };
    }

    return {
      status: false,
      datos: [],
      message: 'Respuesta inesperada del servidor.',
    };

  } catch (error) {
    // Manejo de errores con respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: 'Error 400: Solicitud incorrecta.',
        404: 'Error 404: Niño no encontrado.',
        500: 'Error 500: Error interno del servidor.',
      };

      return {
        status: false,
        datos: [],
        message: errorMessages[status] || `Error ${status}: Ocurrió un error inesperado.`,
      };
    }

    // Error fuera de la respuesta HTTP (problemas de red, timeout, etc.)
    return {
      status: false,
      datos: [],
      message: 'Error de red o de servidor. No se pudo establecer conexión.',
    };
  }
};