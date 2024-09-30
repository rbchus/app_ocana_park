import axios from "axios";
import { getToken } from "../utils/auth";

// Base URL
const baseURL = import.meta.env.VITE_API_BASE_URL;
const URL_JUEGO = `${baseURL}/api/juego/`;

// Configuración de los headers comunes
const getHeaders = (token) => ({
  Authorization: "Bearer " + token,
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
});

export const getAllJuegos = async (fecha) => {
  try {
    // Actualización del token dinámicamente
    const token = getToken();
    const END_POINT = `${URL_JUEGO}${fecha}`;

    // Realizamos la petición
    const response = await axios.get(END_POINT, {
      headers: getHeaders(token),
    });

    // Verificamos que la respuesta sea exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: "Datos obtenidos exitosamente.",
      };
    }

    // En caso de que no sea status 200 pero tampoco un error lanzado
    return {
      status: false,
      datos: [],
      message: `Error inesperado: ${response.statusText}`,
    };
  } catch (error) {
    // Manejo de errores con base en la respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: "Error 400: Solicitud incorrecta.",
        500: "Error 500: Error interno del servidor.",
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
      message: "Error de red: No se pudo establecer conexión con el servidor.",
    };
  }
};



export const setJuegos = async (data) => {
  try {
    // Obtener token dinámicamente
    const token = getToken();

    // Realizar la solicitud POST
    const response = await axios.post(URL_JUEGO, data, {
      headers: getHeaders(token),
    });

    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: "Datos guardados exitosamente.",
      };
    }

    // En caso de que no sea un status 200 pero tampoco un error lanzado
    return {
      status: false,
      datos: [],
      message: `Error inesperado: ${response.statusText}`,
    };
  } catch (error) {
    // Manejo de errores con base en la respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: "Error 400: Solicitud incorrecta.",
        500: "Error 500: Error interno del servidor.",
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
      message: "Error de red: No se pudo establecer conexión con el servidor.",
    };
  }
};


export const updateJuego = async (id, data) => {
  const END_POINT = `${URL_JUEGO}${id}`;
  try {
    // Obtener token dinámicamente
    const token = getToken();

    // Realizar la solicitud PUT
    const response = await axios.put(END_POINT, data, {
      headers: getHeaders(token),
    });

    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: "Juego actualizado exitosamente.",
      };
    }

    // En caso de que no sea un status 200 pero tampoco un error lanzado
    return {
      status: false,
      datos: [],
      message: `Error inesperado: ${response.statusText}`,
    };
  } catch (error) {
    // Manejo de errores con base en la respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: "Error 400: Solicitud incorrecta.",
        500: "Error 500: Error interno del servidor.",
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
      message: "Error de red: No se pudo establecer conexión con el servidor.",
    };
  }
};


export const updateJuegoStop= async (id, data) => {
  const END_POINT = `${URL_JUEGO}stop/${id}`;
  try {
    // Obtener token dinámicamente
    const token = getToken();

    // Realizar la solicitud PUT
    const response = await axios.put(END_POINT, data, {
      headers: getHeaders(token),
    });

    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: "Juego actualizado exitosamente.",
      };
    }

    // En caso de que no sea un status 200 pero tampoco un error lanzado
    return {
      status: false,
      datos: [],
      message: `Error inesperado: ${response.statusText}`,
    };
  } catch (error) {
    // Manejo de errores con base en la respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: "Error 400: Solicitud incorrecta.",
        500: "Error 500: Error interno del servidor.",
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
      message: "Error de red: No se pudo establecer conexión con el servidor.",
    };
  }
};


export const updateJuegoStart = async (id, data) => {
  const END_POINT = `${URL_JUEGO}start/${id}`;
  try {
    // Obtener token dinámicamente
    const token = getToken();

    // Realizar la solicitud PUT
    const response = await axios.put(END_POINT, data, {
      headers: getHeaders(token),
    });

    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return {
        status: true,
        datos: response.data,
        message: "Juego actualizado exitosamente.",
      };
    }

    // En caso de que no sea un status 200 pero tampoco un error lanzado
    return {
      status: false,
      datos: [],
      message: `Error inesperado: ${response.statusText}`,
    };
  } catch (error) {
    // Manejo de errores con base en la respuesta del servidor
    if (error.response) {
      const { status } = error.response;
      const errorMessages = {
        400: "Error 400: Solicitud incorrecta.",
        500: "Error 500: Error interno del servidor.",
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
      message: "Error de red: No se pudo establecer conexión con el servidor.",
    };
  }
};
