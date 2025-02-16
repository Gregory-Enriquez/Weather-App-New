import { render, screen, fireEvent } from '@testing-library/react';
import UserInfo from '../UserInfo';
import { User } from 'firebase/auth';
import { vi } from 'vitest';

// Mock de las funciones y objetos necesarios
const mockUser = {
  email: 'test@example.com',
  providerData: [
    {
      providerId: 'google.com', // Cambia a 'github.com' para probar el ícono de GitHub
    },
  ],
} as unknown as User; // Cast a User para evitar errores de tipo

const mockHandleLogout = vi.fn();
const mockSetShowEmail = vi.fn();

describe('UserInfo Component', () => {
  it('renders the Google icon when the provider is Google', () => {
    render(
      <UserInfo
        user={mockUser}
        handleLogout={mockHandleLogout}
        showEmail={false}
        setShowEmail={mockSetShowEmail}
      />
    );

    // Verifica que el ícono de Google esté presente
    const googleIcon = screen.getByTestId('google-icon');
    expect(googleIcon).toBeInTheDocument();
  });

  it('renders the GitHub icon when the provider is GitHub', () => {
    // Cambia el providerId a GitHub
    const githubUser = {
      ...mockUser,
      providerData: [
        {
          providerId: 'github.com',
        },
      ],
    } as unknown as User;

    render(
      <UserInfo
        user={githubUser}
        handleLogout={mockHandleLogout}
        showEmail={false}
        setShowEmail={mockSetShowEmail}
      />
    );

    // Verifica que el ícono de GitHub esté presente
    const githubIcon = screen.getByTestId('github-icon');
    expect(githubIcon).toBeInTheDocument();
  });

  it('calls handleLogout when the logout button is clicked', () => {
    render(
      <UserInfo
        user={mockUser}
        handleLogout={mockHandleLogout}
        showEmail={false}
        setShowEmail={mockSetShowEmail}
      />
    );

    // Simula el clic en el botón de cerrar sesión
    const logoutButton = screen.getByText('Cerrar sesión');
    fireEvent.click(logoutButton);

    // Verifica que la función handleLogout fue llamada
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it('shows the email when showEmail is true', () => {
    render(
      <UserInfo
        user={mockUser}
        handleLogout={mockHandleLogout}
        showEmail={true}
        setShowEmail={mockSetShowEmail}
      />
    );

    // Verifica que el correo electrónico esté visible
    const emailElement = screen.getByText(mockUser.email!);
    expect(emailElement).toBeInTheDocument();
  });

  it('calls setShowEmail when the provider icon is clicked', () => {
    render(
      <UserInfo
        user={mockUser}
        handleLogout={mockHandleLogout}
        showEmail={false}
        setShowEmail={mockSetShowEmail}
      />
    );

    // Simula el clic en el ícono del proveedor
    const providerIcon = screen.getByTestId('google-icon');
    fireEvent.click(providerIcon);

    // Verifica que la función setShowEmail fue llamada
    expect(mockSetShowEmail).toHaveBeenCalledWith(true); // Cambia a false si showEmail ya es true
  });
});