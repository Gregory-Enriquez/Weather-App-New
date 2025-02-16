import { FaThermometerHalf, FaTint, FaWind } from 'react-icons/fa';
import WeatherIcon from '../components/WeatherIcon';
import { translateWeather } from '../utils/translateWeather';

interface WeatherData {
  name: string;
  weather: { icon: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">{weather.name}</h2>
      <div className="flex justify-center mt-4">
        <WeatherIcon code={weather.weather[0].icon} description={weather.weather[0].description} />
      </div>
      <p className="text-gray-700 text-lg mt-2">{translateWeather(weather.weather[0].description)}</p>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <FaThermometerHalf data-testid="thermometer-icon" className="text-gray-700 text-xl" />
          <p className="text-gray-700">{weather.main.temp}°C</p>
        </div>
        <div className="flex items-center space-x-2">
          <FaTint data-testid="humidity-icon" className="text-gray-700 text-xl" />
          <p className="text-gray-700">{weather.main.humidity}%</p>
        </div>
        <div className="flex items-center space-x-2">
          <FaWind data-testid="wind-icon" className="text-gray-700 text-xl" />
          <p className="text-gray-700">{weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;