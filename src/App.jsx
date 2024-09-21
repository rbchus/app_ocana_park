import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Juegos from './pages/Juegos';
import Login from './pages/Login';
import Ninos from './pages/Ninos';

function App() {
  return (
    
    <div className="dashboard">
    <Router>
      <Navbar />
      <div className="content">
      <Routes>
        <Route path="/" element={<Juegos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ninos" element={<Ninos />} />
        <Route path="/juegos" element={<Juegos />} />
      </Routes>
      </div>
    </Router>
    </div>
   
  );
}

export default App;
