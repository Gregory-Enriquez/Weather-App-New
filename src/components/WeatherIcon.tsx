import { FaSun, FaCloud, FaSnowflake, FaBolt, FaWind, FaCloudSun, FaCloudShowersHeavy } from 'react-icons/fa';

interface WeatherIconProps {
  code: string;
  description?: string; // Añade una prop para la descripción
}

const WeatherIcon = ({ code, description }: WeatherIconProps) => {
  if (code === '01d' || code === '01n') {
    return <FaSun className="text-yellow-400 text-4xl" data-testid="weather-icon-sun" aria-label={description} role="img" />; // Soleado
  } else if (code === '02d' || code === '02n') {
    return <FaCloudSun className="text-gray-400 text-4xl" data-testid="weather-icon-cloud-sun" aria-label={description} role="img" />; // Parcialmente nublado
  } else if (code.startsWith('03') || code.startsWith('04')) {
    return <FaCloud className="text-gray-600 text-4xl" data-testid="weather-icon-cloud" aria-label={description} role="img" />; // Nublado
  } else if (code.startsWith('09') || code.startsWith('10')) {
    return <FaCloudShowersHeavy className="text-blue-500 text-4xl" data-testid="weather-icon-rain" aria-label={description} role="img" />; // Lluvia
  } else if (code.startsWith('11')) {
    return <FaBolt className="text-yellow-500 text-4xl" data-testid="weather-icon-bolt" aria-label={description} role="img" />; // Tormenta
  } else if (code.startsWith('13')) {
    return <FaSnowflake className="text-blue-300 text-4xl" data-testid="weather-icon-snowflake" aria-label={description} role="img" />; // Nieve
  } else if (code.startsWith('50')) {
    return <FaWind className="text-gray-500 text-4xl" data-testid="weather-icon-wind" aria-label={description} role="img" />; // Neblina o viento
  } else {
    return <FaSun className="text-yellow-400 text-4xl" data-testid="weather-icon-default" aria-label={description} role="img" />; // Por defecto: sol
  }
};

export default WeatherIcon;