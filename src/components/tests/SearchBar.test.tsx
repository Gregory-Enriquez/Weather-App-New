import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
  const mockSetCity = vi.fn();
  const mockHandleSearch = vi.fn();

  const defaultProps = {
    city: '',
    setCity: mockSetCity,
    handleSearch: mockHandleSearch,
    loading: false,
  };

  it('should render the input and button', () => {
    render(<SearchBar {...defaultProps} />);

    // Verifica que el campo de entrada y el botón estén presentes
    expect(screen.getByPlaceholderText('Ingresa una ciudad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('should update the input value when typing', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText('Ingresa una ciudad');
    fireEvent.change(input, { target: { value: 'Madrid' } });

    // Verifica que la función setCity se haya llamado con el valor correcto
    expect(mockSetCity).toHaveBeenCalledWith('Madrid');
  });

  it('should call handleSearch when the button is clicked', () => {
    render(<SearchBar {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(button);

    // Verifica que la función handleSearch se haya llamado
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('should disable the button when loading is true', () => {
    render(<SearchBar {...defaultProps} loading={true} />);

    const button = screen.getByRole('button', { name: 'Buscando...' });
    expect(button).toBeDisabled();
  });

  it('should show "Buscando..." text on the button when loading is true', () => {
    render(<SearchBar {...defaultProps} loading={true} />);

    const button = screen.getByRole('button', { name: 'Buscando...' });
    expect(button).toHaveTextContent('Buscando...');
  });
});