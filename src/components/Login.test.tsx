import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom';
import { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from '../firebaseConfig';
import { User, NextOrObserver } from 'firebase/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';

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
}));

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()), // Mock de useNavigate
  };
});

describe('Login Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    // Limpia todos los mocks antes de cada prueba
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders login buttons when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica que los botones de inicio de sesión estén presentes
    expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión con GitHub')).toBeInTheDocument();
  });

  it('calls handleGoogleLogin when Google login button is clicked', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simula el clic en el botón de Google
    const googleButton = screen.getByText('Iniciar sesión con Google');
    fireEvent.click(googleButton);

    // Verifica que se llamó a signInWithPopup con el proveedor de Google
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
  });

  it('calls handleGithubLogin when GitHub login button is clicked', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simula el clic en el botón de GitHub
    const githubButton = screen.getByText('Iniciar sesión con GitHub');
    fireEvent.click(githubButton);

    // Verifica que se llamó a signInWithPopup con el proveedor de GitHub
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GithubAuthProvider());
  });

  it('redirects to /clima after successful login', () => {
    // Simula un usuario autenticado
    const mockUser = { displayName: 'John Doe' } as User;
    vi.mocked(auth.onAuthStateChanged).mockImplementation((callback: NextOrObserver<User | null>) => {
      if (typeof callback === 'function') {
        callback(mockUser); // Simula que hay un usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica que se llamó a navigate con '/clima'
    expect(mockNavigate).toHaveBeenCalledWith('/clima');
  });
});