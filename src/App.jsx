import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import "./App.css";
//import Navbar from "./components/Navbar";
import Juegos from "./pages/Juegos";
import Login from "./pages/Login";
import Ninos from "./pages/Ninos";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Juegos />, // Componente para la página de inicio
    },
    {
      path: "/login",
      element: <Login />, // Componente para la página 'Acerca de'
    },
    {
      path: "/ninos",
      element: <Ninos />, // Componente para la página 'Acerca de'
    },
    {
      path: "/juegos",
      element: <Juegos />, // Componente para la página 'Acerca de'
    },
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
      <div className="dashboard">
        <div className="content">
          <RouterProvider router={router} />
        </div>
      </div>
  );
}

export default App;
