export const saveToken = (token) => {
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
  