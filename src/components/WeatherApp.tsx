import { useState, useEffect } from 'react';
import { getWeatherByCity, getWeatherByCoords, getForecast } from '../services/WeatherService';
import { getCityImage } from '../services/unsplashService';
import WeatherIcon from './WeatherIcon';
import { translateWeather } from '../utils/translateWeather';
import { FaGithub, FaGoogle, FaSignOutAlt, FaThermometerHalf, FaTint, FaWind } from 'react-icons/fa';

interface WeatherAppProps {
  user: { email: string; providerData: { providerId: string }[] }; // Usuario autenticado
  handleLogout: () => void; // Función para cerrar sesión
}

const WeatherApp = ({ user, handleLogout }: WeatherAppProps) => {
  const [city, setCity] = useState('');
  interface WeatherData {
    name: string;
    weather: { icon: string; description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
    coord: { lat: number; lon: number };
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  interface ForecastData {
    dt: number;
    main: { temp: number };
    weather: { icon: string; description: string }[];
  }

  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cityImage, setCityImage] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  // Fondo dinámico según el clima
  const getBackgroundClass = (code: string) => {
    if (code === '01d' || code === '01n') {
      return 'bg-gradient-to-br from-yellow-200 to-orange-300'; // Soleado
    } else if (code.startsWith('02') || code.startsWith('03') || code.startsWith('04')) {
      return 'bg-gradient-to-br from-gray-300 to-gray-500'; // Nublado
    } else if (code.startsWith('09') || code.startsWith('10')) {
      return 'bg-gradient-to-br from-blue-300 to-blue-600'; // Lluvia
    } else if (code.startsWith('11')) {
      return 'bg-gradient-to-br from-gray-700 to-black'; // Tormenta
    } else if (code.startsWith('13')) {
      return 'bg-gradient-to-br from-blue-100 to-blue-300'; // Nieve
    } else {
      return 'bg-gradient-to-br from-gray-100 to-gray-300'; // Por defecto
    }
  };

  // Obtener la ubicación del usuario y el clima
  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await getWeatherByCoords(latitude, longitude);
            const forecastData = await getForecast(latitude, longitude);
            setWeather(weatherData);
            setForecast(forecastData.list);
            setError('');
          } catch {
            setError('Error al cargar el clima de tu ubicación.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('No se pudo obtener tu ubicación.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalización no es soportada por tu navegador.');
      setLoading(false);
    }
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecast(weatherData.coord.lat, weatherData.coord.lon);
      const image = await getCityImage(city); // Obtener imagen de la ciudad
      setWeather(weatherData);
      setForecast(forecastData.list);
      setCityImage(image); // Establecer la imagen de la ciudad
      setError('');
    } catch {
      setError('Ciudad no encontrada. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 font-poppins ${
        weather ? getBackgroundClass(weather.weather[0].icon) : 'bg-gradient-to-br from-gray-100 to-gray-300'
      }`}
    >
      {/* Barra superior con el botón de cerrar sesión y el logo de Google/GitHub */}
      {user && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
            >
              <FaSignOutAlt className="text-sm" />
              <span>Cerrar sesión</span>
            </button>
            {/* Mostrar el logo al lado del botón si showEmail es true */}
            {showEmail && (
              <div className="cursor-pointer">
                {user.providerData[0].providerId === 'google.com' ? (
                  <FaGoogle className="text-gray-700 text-lg" />
                ) : (
                  <FaGithub className="text-gray-700 text-lg" />
                )}
              </div>
            )}
          </div>
          {/* Mostrar el correo debajo si showEmail es true */}
          {showEmail && (
            <p
              className="text-gray-700 text-sm mt-2 text-center cursor-pointer"
              onClick={() => setShowEmail(!showEmail)} // Ocultar el correo al hacer clic
            >
              {user.email}
            </p>
          )}
        </div>
      )}

      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-4xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">App del Clima</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Ingresa una ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {weather && (
          <div className={`mt-6 ${cityImage ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'text-center'}`}>
            {/* Sección del clima actual */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{weather.name}</h2>
              <div className="flex justify-center mt-4">
                <WeatherIcon code={weather.weather[0].icon} />
              </div>
              <p className="text-gray-700 text-lg mt-2">{translateWeather(weather.weather[0].description)}</p>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <FaThermometerHalf className="text-gray-700 text-xl" />
                  <p className="text-gray-700">{weather.main.temp}°C</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTint className="text-gray-700 text-xl" />
                  <p className="text-gray-700">{weather.main.humidity}%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaWind className="text-gray-700 text-xl" />
                  <p className="text-gray-700">{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
            {/* Sección de la imagen de la ciudad */}
            {cityImage && (
              <div className="flex justify-center items-center">
                <img
                  src={cityImage}
                  alt={city}
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            )}
          </div>
        )}
        {/* Pronóstico */}
        {forecast.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pronóstico</h3>
            <div className="space-y-3">
              {forecast.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white bg-opacity-80 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Hora (lado izquierdo) */}
                  <p className="text-gray-700 w-24">
                    {new Date(item.dt * 1000).toLocaleTimeString('es-MX', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                  {/* Ícono, temperatura y descripción (alineados a la derecha) */}
                  <div className="flex items-center flex-1 space-x-4">
                    {/* Ícono del clima */}
                    <div className="w-10 flex justify-center">
                      <WeatherIcon code={item.weather[0].icon} />
                    </div>
                    {/* Temperatura */}
                    <p className="text-gray-700 w-16">{item.main.temp}°C</p>
                    {/* Descripción del clima */}
                    <p className="text-gray-700 flex-1">
                      {translateWeather(item.weather[0].description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;