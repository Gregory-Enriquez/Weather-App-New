import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../Auth';
import { vi } from 'vitest';
import { auth, signInWithPopup } from '../../firebaseConfig';

// Mock de Firebase
vi.mock('../../firebaseConfig', async (importOriginal) => {
  const actual = await importOriginal(); // Importa el módulo original
  return {
    ...(typeof actual === 'object' ? actual : {}), // Mantén todas las exportaciones originales
    auth: {
      onAuthStateChanged: vi.fn((callback) => {
        // Simula un usuario no autenticado por defecto
        callback(null);
        return vi.fn(); // Devuelve una función de limpieza
      }),
      signOut: vi.fn(), // Mock de signOut
    },
    signInWithPopup: vi.fn(), // Mock de signInWithPopup
  };
});

describe('Auth Component', () => {
  it('should render login buttons when user is not logged in', () => {
    // Simula que no hay usuario autenticado
    vi.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback(null); // No hay usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Verifica que los botones de inicio de sesión estén presentes
    expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión con GitHub')).toBeInTheDocument();
  });

  it('should render welcome message and logout button when user is logged in', () => {
    // Simula un usuario autenticado
    const mockUser = {
      displayName: 'John Doe',
      email: 'john@example.com',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: '',
      uid: '12345',
      delete: vi.fn(),
      getIdToken: vi.fn(),
      getIdTokenResult: vi.fn(),
      reload: vi.fn(),
      toJSON: vi.fn(),
      phoneNumber: null,
      photoURL: null,
      providerId: 'firebase',
    };

    vi.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback(mockUser); // Usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Verifica que el mensaje de bienvenida y el botón de cerrar sesión estén presentes
    expect(screen.getByText('Bienvenido, John Doe')).toBeInTheDocument();
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
  });

  it('should call handleGoogleLogin when Google login button is clicked', () => {
    // Simula que no hay usuario autenticado
    vi.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback(null); // No hay usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Simula un clic en el botón de Google
    const googleButton = screen.getByText('Iniciar sesión con Google');
    fireEvent.click(googleButton);

    // Verifica que signInWithPopup se haya llamado
    expect(signInWithPopup).toHaveBeenCalled();
  });

  it('should call handleGithubLogin when GitHub login button is clicked', () => {
    // Simula que no hay usuario autenticado
    vi.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback(null); // No hay usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Simula un clic en el botón de GitHub
    const githubButton = screen.getByText('Iniciar sesión con GitHub');
    fireEvent.click(githubButton);

    // Verifica que signInWithPopup se haya llamado
    expect(signInWithPopup).toHaveBeenCalled();
  });

  it('should call handleLogout when logout button is clicked', () => {
    // Simula un usuario autenticado
    const mockUser = {
      displayName: 'John Doe',
      email: 'john@example.com',
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: '',
      uid: '12345',
      delete: vi.fn(),
      getIdToken: vi.fn(),
      getIdTokenResult: vi.fn(),
      reload: vi.fn(),
      toJSON: vi.fn(),
      phoneNumber: null,
      photoURL: null,
      providerId: 'firebase',
    };

    vi.spyOn(auth, 'onAuthStateChanged').mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback(mockUser); // Usuario autenticado
      }
      return vi.fn(); // Devuelve una función de limpieza
    });

    render(<Auth />);

    // Simula un clic en el botón de cerrar sesión
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Verifica que auth.signOut se haya llamado
    expect(auth.signOut).toHaveBeenCalled();
  });
});