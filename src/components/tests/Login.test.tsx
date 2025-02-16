import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importa MemoryRouter
import Login from '../Login';
import { vi } from 'vitest';

// Mock de las funciones de Firebase
vi.mock('../firebaseConfig', () => ({
  auth: {}, // Mock de auth
  GoogleAuthProvider: vi.fn(() => ({})), // Mock de GoogleAuthProvider
  GithubAuthProvider: vi.fn(() => ({})), // Mock de GithubAuthProvider
  signInWithPopup: vi.fn(() => Promise.resolve({})), // Mock de signInWithPopup
}));

describe('Login Component', () => {
  it('renders the title correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica que el título de la aplicación esté presente
    expect(screen.getByText('WeatherApp')).toBeInTheDocument();
  });

  it('renders the sun icon (FaSun)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica que el ícono del sol esté presente
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
  });

  it('renders the "Iniciar sesión" subtitle', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verifica que el subtítulo "Iniciar sesión" esté presente
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });



  it('calls handleGoogleLogin when Google button is clicked', () => {
    const mockHandleGoogleLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login handleGoogleLogin={mockHandleGoogleLogin} />
      </MemoryRouter>
    );

    // Simula el clic en el botón de Google
    const googleButton = screen.getByText('Iniciar sesión con Google');
    fireEvent.click(googleButton);

    // Verifica que la función handleGoogleLogin fue llamada
    expect(mockHandleGoogleLogin).toHaveBeenCalled();
  });

  it('calls handleGithubLogin when GitHub button is clicked', () => {
    const mockHandleGithubLogin = vi.fn();
    render(
      <MemoryRouter>
        <Login handleGithubLogin={mockHandleGithubLogin} />
      </MemoryRouter>
    );

    // Simula el clic en el botón de GitHub
    const githubButton = screen.getByText('Iniciar sesión con GitHub');
    fireEvent.click(githubButton);

    // Verifica que la función handleGithubLogin fue llamada
    expect(mockHandleGithubLogin).toHaveBeenCalled();
  });
});