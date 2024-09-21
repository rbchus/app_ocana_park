import axios from "axios";
import { getToken } from '../utils/auth';


const URL_ACUDIENTE = import.meta.env.VITE_URL_ACUDIENTE;

const TOKEN = getToken();



    export const getAllAcudientes  = async () => {
      try {
        const response = await axios.get(URL_ACUDIENTE, {
          headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json; charset=utf-8',   
            'Access-Control-Allow-Origin': '*' 
             }
          });
  
        if (response.status === 200) {
          return(response.data);
          
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            return({ status: false,  datos:[] , message: ' Error 400: Solicitud incorrecta.' });
          } else if (error.response.status === 500) {
            return({ status: false,  datos:[] , message: 'Error 500: Error interno del servidor.'  });
          }
        } else {
          // Error fuera de la respuesta (problema de red, timeout, etc.)
          return({ status: false,  datos:[] , message: 'Error: Problema de red o de servidor.'  });
        }
      }
    }


    export const getAcudiente  = async (id) => {
      try {
        const END_POINT = `${URL_ACUDIENTE}${id}`
        const response = await axios.get(END_POINT, {
          headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json; charset=utf-8',   
            'Access-Control-Allow-Origin': '*' 
             }
          });
  
        if (response.status === 200) {
          return(response.data);
          
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            return({ status: false,  datos:[] , message: ' Error 400: Solicitud incorrecta.' });
          } else if (error.response.status === 500) {
            return({ status: false,  datos:[] , message: 'Error 500: Error interno del servidor.'  });
          }
        } else {
          // Error fuera de la respuesta (problema de red, timeout, etc.)
          return({ status: false,  datos:[] , message: 'Error: Problema de red o de servidor.'  });
        }
      }
    }


    export const setAcudiente = async (data) => {
      try {
        const response = await axios.post(URL_ACUDIENTE, data , {
          headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json; charset=utf-8',   
            'Access-Control-Allow-Origin': '*' 
             }
          });
  
        if (response.status === 200) {
          return(response);
          
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            return({ status: false,  datos:[] , message: ' Error 400: Solicitud incorrecta.' });
          } else if (error.response.status === 500) {
            return({ status: false,  datos:[] , message: 'Error 500: Error interno del servidor.'  });
          }
        } else {
          // Error fuera de la respuesta (problema de red, timeout, etc.)
          return({ status: false,  datos:[] , message: 'Error: Problema de red o de servidor.'  });
        }
      }
    }


