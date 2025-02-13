import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'es', // Para obtener los datos en español
    },
  });
  return response.data;
};

export const getWeatherByCoords = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'es', // Para obtener los datos en español
    },
  });
  return response.data;
};

export const getForecast = async (lat: number, lon: number) => {
  const response = await axios.get(FORECAST_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'es', // Para obtener los datos en español
      cnt: 5, // Número de pronósticos (5 para las próximas horas)
    },
  });
  return response.data;
};