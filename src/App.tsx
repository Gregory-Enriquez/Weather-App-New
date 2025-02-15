import { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords, getForecast } from './services/WeatherService';
import { getCityImage } from './services/unsplashService';
import { auth, signOut } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import { User } from 'firebase/auth'; // Importar User de Firebase

// Definir los tipos directamente en el archivo
interface WeatherData {
  name: string;
  weather: { icon: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  coord: { lat: number; lon: number };
}

interface ForecastData {
  dt: number;
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cityImage, setCityImage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Usar el tipo User de Firebase
  const [showEmail, setShowEmail] = useState(false);
  const navigate = useNavigate();

  // Función para obtener la clase de fondo según el código del clima
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

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Pasar el objeto user completo
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
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

  // Manejar la búsqueda de una ciudad
  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecast(weatherData.coord.lat, weatherData.coord.lon);
      const image = await getCityImage(city);
      setWeather(weatherData);
      setForecast(forecastData.list);
      setCityImage(image);
      setError('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Ciudad no encontrada. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 font-poppins ${
        weather ? getBackgroundClass(weather.weather[0].icon) : 'bg-gradient-to-br from-gray-100 to-gray-300'
      }`}
    >
      {/* Barra superior con la información del usuario y el botón de cerrar sesión */}
      {user && (
        <UserInfo user={user} handleLogout={handleLogout} showEmail={showEmail} setShowEmail={setShowEmail} />
      )}

      {/* Contenedor principal */}
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-4xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">App del Clima</h1>

        {/* Barra de búsqueda */}
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} loading={loading} />

        {/* Mensaje de error */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Mostrar el clima actual */}
        {weather && (
          <div className={`mt-6 ${cityImage ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'text-center'}`}>
            <WeatherDisplay weather={weather} />
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

        {/* Mostrar el pronóstico */}
        {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
      </div>
    </div>
  );
};

export default App;