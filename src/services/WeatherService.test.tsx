import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import {
  getWeatherByCity,
  getWeatherByCoords,
  getForecast,
} from './WeatherService'; // Importa desde la misma carpeta

// Mock de axios
vi.mock('axios');

describe('WeatherService', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia los mocks después de cada test
  });

  it('debería obtener el clima por ciudad', async () => {
    const mockData = { name: 'Madrid', main: { temp: 20 } };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getWeatherByCity('Madrid');

    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: 'Madrid',
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    expect(result).toEqual(mockData);
  });

  it('debería obtener el clima por coordenadas', async () => {
    const mockData = { name: 'Madrid', main: { temp: 20 } };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getWeatherByCoords(40.4168, -3.7038);

    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: 40.4168,
        lon: -3.7038,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    expect(result).toEqual(mockData);
  });

  it('debería obtener el pronóstico del tiempo', async () => {
    const mockData = { list: [{ dt: 1638288000, main: { temp: 20 } }] };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getForecast(40.4168, -3.7038);

    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat: 40.4168,
        lon: -3.7038,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
        cnt: 5,
      },
    });
    expect(result).toEqual(mockData);
  });

  it('debería manejar errores al obtener el clima por ciudad', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getWeatherByCity('Madrid')).rejects.toThrow('Network Error');
  });

  it('debería manejar errores al obtener el clima por coordenadas', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getWeatherByCoords(40.4168, -3.7038)).rejects.toThrow('Network Error');
  });

  it('debería manejar errores al obtener el pronóstico del tiempo', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getForecast(40.4168, -3.7038)).rejects.toThrow('Network Error');
  });
});