import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/clima" element={<App />} />
        <Route path="*" element={<Login />} /> {/* Redirige a /login por defecto */}
      </Routes>
    </Router>
  </React.StrictMode>
);