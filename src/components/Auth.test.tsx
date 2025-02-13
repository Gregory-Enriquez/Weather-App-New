import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa jest-dom
import Auth from './Auth';
import { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from '../firebaseConfig';
import { User, NextOrObserver } from 'firebase/auth'; // Importa los tipos necesarios de Firebase

// Mock de Firebase
vi.mock('../firebaseConfig', () => ({
  auth: {
    onAuthStateChanged: vi.fn((callback: NextOrObserver<User | null>) => {
      if (typeof callback === 'function') {
        callback(null); // Simula que no hay usuario autenticado inicialmente
      }
      return vi.fn(); // Devuelve una función de limpieza
    }),
    currentUser: null,
  },
  GoogleAuthProvider: vi.fn(),
  GithubAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

describe('Auth Component', () => {
  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('renders login buttons when user is not authenticated', () => {
    render(<Auth />);

    // Verifica que los botones de inicio de sesión estén presentes
    expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión con GitHub')).toBeInTheDocument();
  });

  it('calls handleGoogleLogin when Google login button is clicked', async () => {
    render(<Auth />);

    // Simula el clic en el botón de Google
    const googleButton = screen.getByText('Iniciar sesión con Google');
    fireEvent.click(googleButton);

    // Verifica que se llamó a signInWithPopup con el proveedor de Google
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
  });

  it('calls handleGithubLogin when GitHub login button is clicked', async () => {
    render(<Auth />);

    // Simula el clic en el botón de GitHub
    const githubButton = screen.getByText('Iniciar sesión con GitHub');
    fireEvent.click(githubButton);

    // Verifica que se llamó a signInWithPopup con el proveedor de GitHub
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GithubAuthProvider());
  });

  it('renders welcome message and logout button when user is authenticated', () => {
    // Simula un usuario autenticado
    const mockUser = { displayName: 'John Doe' } as User;
    vi.mocked(auth.onAuthStateChanged).mockImplementation((callback: NextOrObserver<User | null>) => {
      if (typeof callback === 'function') {
        callback(mockUser); // Simula que hay un usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Verifica que se muestra el mensaje de bienvenida y el botón de cerrar sesión
    expect(screen.getByText('Bienvenido, John Doe')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('calls handleLogout when logout button is clicked', async () => {
    // Simula un usuario autenticado
    const mockUser = { displayName: 'John Doe' } as User;
    vi.mocked(auth.onAuthStateChanged).mockImplementation((callback: NextOrObserver<User | null>) => {
      if (typeof callback === 'function') {
        callback(mockUser); // Simula que hay un usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Simula el clic en el botón de cerrar sesión
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Verifica que se llamó a signOut
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});