/*export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const isAuthenticated = () => {
    const token = getToken();
    // Aquí podrías agregar lógica para verificar la expiración del token
    return token !== null;
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };
  */

  
  export const saveToken = (token) => {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error("Error al guardar el token:", error);
    }
  };
  
  export const getToken = () => {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null; // En caso de error, retorna null
    }
  };
  
  
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
/*
  try {
    const payload = jwtDecode(token); /
    const isExpired = payload.exp < Date.now() / 1000; /
    return !isExpired;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false; 
  }*/
    return token !== null;
};
  
  export const logout = () => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  