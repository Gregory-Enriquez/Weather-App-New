// src/components/Auth.tsx
import { useState, useEffect } from 'react';
import { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from '../firebaseConfig';

const Auth = () => {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center space-x-4">
          <p className="text-sm">Bienvenido, {user.displayName}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Iniciar sesión con Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900"
          >
            Iniciar sesión con GitHub
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;