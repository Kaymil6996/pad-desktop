import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { useAuthenticate } from './hooks/useAuthenticate';
import { useEffect } from 'react';
import HomePage from './pages/Home';

export default function App() {
  const navigate = useNavigate();

  const { checkIfSaved } = useAuthenticate();

  useEffect(() => {
    const isAuth = checkIfSaved();

    console.log(isAuth);

    isAuth ? navigate('/') : navigate('/landing');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
