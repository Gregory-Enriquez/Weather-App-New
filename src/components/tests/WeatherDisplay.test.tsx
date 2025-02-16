import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../WeatherDisplay';
import { describe, it, expect } from 'vitest';
import { translateWeather } from '../../utils/translateWeather';

// Mock de datos del clima
const mockWeather = {
  name: 'Ciudad de México',
  weather: [{ icon: '04d', description: 'broken clouds' }],
  main: { temp: 22, humidity: 65 },
  wind: { speed: 3.5 },
};

describe('WeatherDisplay', () => {
  it('should render the city name', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText('Ciudad de México')).toBeInTheDocument();
  });

  it('should render the weather icon', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    const weatherIcon = screen.getByRole('img', { name: mockWeather.weather[0].description });
    expect(weatherIcon).toBeInTheDocument();
  });

  it('should render the weather description', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    const translatedDescription = translateWeather(mockWeather.weather[0].description);
    expect(screen.getByText(translatedDescription)).toBeInTheDocument();
  });

  it('should render the temperature', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText(`${mockWeather.main.temp}°C`)).toBeInTheDocument();
  });

  it('should render the humidity', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText(`${mockWeather.main.humidity}%`)).toBeInTheDocument();
  });

  it('should render the wind speed', () => {
    render(<WeatherDisplay weather={mockWeather} />);
    expect(screen.getByText(`${mockWeather.wind.speed} m/s`)).toBeInTheDocument();
  });

  it('should render the correct icons', () => {
    render(<WeatherDisplay weather={mockWeather} />);

    // Verifica que los íconos estén presentes
    expect(screen.getByTestId('thermometer-icon')).toBeInTheDocument();
    expect(screen.getByTestId('humidity-icon')).toBeInTheDocument();
    expect(screen.getByTestId('wind-icon')).toBeInTheDocument();
  });
});