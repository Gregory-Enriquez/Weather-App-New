import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherApp from '../WeatherApp'; // Ruta relativa // Usa alias
import { getWeatherByCity, getForecast } from '../../services/WeatherService'; // Ruta relativa
import { getCityImage } from '../../services/unsplashService'; // Ruta relativa // Usa alias
import { vi } from 'vitest';

// Mock de los servicios
vi.mock('../services/WeatherService'); // Ruta relativa
vi.mock('../services/unsplashService'); // Ruta relativa

const mockUser = {
  email: 'test@example.com',
  providerData: [{ providerId: 'google.com' }],
};

const mockHandleLogout = vi.fn(); // Usa `vi.fn()` en lugar de `jest.fn()`

describe('WeatherApp', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Usa `vi.clearAllMocks()` en lugar de `jest.clearAllMocks()`
  });

  test('renders WeatherApp component', () => {
    render(<WeatherApp user={mockUser} handleLogout={mockHandleLogout} />);
    expect(screen.getByPlaceholderText('Ingresa una ciudad')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  test('searches for city weather', async () => {
    const mockWeatherData = {
      name: 'London',
      weather: [{ icon: '01d', description: 'clear sky' }],
      main: { temp: 20, humidity: 50 },
      wind: { speed: 5 },
      coord: { lat: 51.5074, lon: -0.1278 },
    };
    const mockForecastData = {
      list: [
        {
          dt: 1633035600,
          main: { temp: 18 },
          weather: [{ icon: '01d', description: 'clear sky' }],
        },
      ],
    };
    const mockCityImage = 'https://api.unsplash.com/search/photos';

    vi.mocked(getWeatherByCity).mockResolvedValue(mockWeatherData); // Usa `vi.mocked`
    vi.mocked(getForecast).mockResolvedValue(mockForecastData); // Usa `vi.mocked`
    vi.mocked(getCityImage).mockResolvedValue(mockCityImage); // Usa `vi.mocked`

    render(<WeatherApp user={mockUser} handleLogout={mockHandleLogout} />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa una ciudad'), { target: { value: 'London' } });
    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => expect(getWeatherByCity).toHaveBeenCalledWith('London'));
    await waitFor(() => expect(getForecast).toHaveBeenCalledWith(51.5074, -0.1278));
    await waitFor(() => expect(getCityImage).toHaveBeenCalledWith('London'));

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
    expect(screen.getByAltText('London')).toHaveAttribute('src', mockCityImage);
  });

  test('handles logout', () => {
    render(<WeatherApp user={mockUser} handleLogout={mockHandleLogout} />);
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  test('displays error when city not found', async () => {
    vi.mocked(getWeatherByCity).mockRejectedValue(new Error('City not found')); // Usa `vi.mocked`

    render(<WeatherApp user={mockUser} handleLogout={mockHandleLogout} />);

    fireEvent.change(screen.getByPlaceholderText('Ingresa una ciudad'), { target: { value: 'UnknownCity' } });
    fireEvent.click(screen.getByText('Buscar'));

    await waitFor(() => expect(getWeatherByCity).toHaveBeenCalledWith('UnknownCity'));

    expect(screen.getByText('Ciudad no encontrada. Intenta de nuevo.')).toBeInTheDocument();
  });
});