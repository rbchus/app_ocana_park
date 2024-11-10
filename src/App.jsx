import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
//import Navbar from "./components/Navbar";

/*
import Home from "./pages/Home";
import Juegos from "./pages/Juegos";

import Ninos from "./pages/Ninos";
*/
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Park from "./pages/Park";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Park />, // Componente para la página de inicio
    },
  
    {
      path: "/login",
      element: <Login />, // Componente para la página 'Acerca de'
    },
   /*
    {
      path: "/ninos",
      element: <Ninos />, // Componente para la página 'Acerca de'
    },
    {
      path: "/juegos",
      element: <Juegos />, // Componente para la página 'Acerca de'
    },

*/
    {
      path: "*", // Ruta para manejar páginas no encontradas (404)
      element: <NotFound />,
    },
  ],  
  {
    basename: "/",
  }
);

function App() {
  return (
      
        <div>
          <RouterProvider router={router} />
        </div>
      
  );
}

export default App;
