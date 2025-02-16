import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importa MemoryRouter
import App from '../../App';
import { vi } from 'vitest';
import { getWeatherByCity } from '../../services/WeatherService';

// Mock de las funciones de Firebase
vi.mock('../firebaseConfig', () => ({
  auth: {},
  signOut: vi.fn(),
}));

// Mock de las funciones de los servicios
vi.mock('../services/WeatherService', () => ({
  getWeatherByCity: vi.fn(() => Promise.resolve({
    name: 'Test City',
    weather: [{ icon: '01d', description: 'Clear sky' }],
    main: { temp: 20, humidity: 60 },
    wind: { speed: 5 },
    coord: { lat: 0, lon: 0 },
  })),
  getWeatherByCoords: vi.fn(() => Promise.resolve({
    name: 'Test City',
    weather: [{ icon: '01d', description: 'Clear sky' }],
    main: { temp: 20, humidity: 60 },
    wind: { speed: 5 },
    coord: { lat: 0, lon: 0 },
  })),
  getForecast: vi.fn(() => Promise.resolve({
    list: [
      { dt: 1638316800, main: { temp: 18 }, weather: [{ icon: '02d', description: 'Few clouds' }] },
    ],
  })),
}));

vi.mock('../services/unsplashService', () => ({
  getCityImage: vi.fn(() => Promise.resolve('https://example.com/image.jpg')),
}));

describe('App Component', () => {
  it('renders the app title', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const titleElement = screen.getByTestId('app-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('App del Clima');
  });

  it('renders the search bar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();
  });

  it('shows an error message when city is not found', async () => {
    // Mock de la función getWeatherByCity para simular un error
    vi.mocked(getWeatherByCity).mockRejectedValueOnce(new Error('City not found'));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Simula la búsqueda de una ciudad
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.change(searchInput, { target: { value: 'Invalid City' } });
    fireEvent.click(searchButton);

    // Verifica que el mensaje de error se muestre
    await waitFor(() => {
      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('Ciudad no encontrada. Intenta de nuevo.');
    });
  });

  it('renders the weather display when weather data is available', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verifica que el componente WeatherDisplay se renderice
    await waitFor(() => {
      const weatherDisplay = screen.getByTestId('weather-display');
      expect(weatherDisplay).toBeInTheDocument();
    });
  });

  it('renders the city image when available', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verifica que la imagen de la ciudad se renderice
    await waitFor(() => {
      const cityImage = screen.getByTestId('city-image');
      expect(cityImage).toBeInTheDocument();
    });
  });
});