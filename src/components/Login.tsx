import { useState, useEffect } from 'react';
import { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from '../firebaseConfig';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaSun } from 'react-icons/fa';

const Login = () => {
  const [, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate('/clima'); // Redirigir al clima después de iniciar sesión
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error al iniciar sesión con GitHub:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-700 flex flex-col items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md text-center backdrop-blur-sm">
        {/* Ícono del clima */}
        <div className="flex justify-center mb-4">
          <FaSun className="text-6xl text-yellow-400 animate-pulse" /> {/* Ícono de sol con animación */}
        </div>
        {/* Título de la aplicación */}
        <h1 className="text-4xl font-bold mb-2 text-gray-800 font-poppins">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
            WeatherApp
          </span>
        </h1>
        {/* Subtítulo "Iniciar sesión" */}
        <p className="text-gray-600 text-lg mb-6">Iniciar sesión</p>
        {/* Botones de inicio de sesión */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <FaGoogle className="text-xl" />
            <span>Iniciar sesión con Google</span>
          </button>
          <button
            onClick={handleGithubLogin}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <FaGithub className="text-xl" />
            <span>Iniciar sesión con GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;