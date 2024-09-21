import axios from "axios";
import { getToken } from '../utils/auth';


const URL_JUEGO = import.meta.env.VITE_URL_JUEGO;

const TOKEN = getToken();


export const getAllJuegos = async (fecha) => {
   
    try {

        const END_POINT = `${URL_JUEGO}${fecha}`
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


    
    export const setJuegos = async (data) => {
      try {
        const response = await axios.post(URL_JUEGO, data , {
          headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json; charset=utf-8',   
            'Access-Control-Allow-Origin': '*' 
             }
          });
          console.log ( " setJuegos SERVICIO " + JSON.stringify(response))
        if (response.status == 200) {
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


    export const updateJuego = async ( id , data) => {

      const END_POINT = `${URL_JUEGO}${id}`
     try {
       const response = await axios.put(END_POINT, data , {
         headers: {
           'Authorization': 'Bearer ' + TOKEN,
           'Content-Type': 'application/json; charset=utf-8',   
           'Access-Control-Allow-Origin': '*' 
            }
         });
 
       if (response.status === 200) {
         //console.log ( " RESPONSE SERVICIO " + JSON.stringify(response))
         return(response);
         
         
       }
     } catch (error) {
       //console.log ( " RESPONSE SERVICIO " + JSON.stringify(error.response))
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