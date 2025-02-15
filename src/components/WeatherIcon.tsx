import { FaSun, FaCloud, FaSnowflake, FaBolt, FaWind, FaCloudSun, FaCloudShowersHeavy } from 'react-icons/fa';

interface WeatherIconProps {
  code: string;
}

const WeatherIcon = ({ code }: WeatherIconProps) => {
  if (code === '01d' || code === '01n') {
    return <FaSun className="text-yellow-400 text-4xl" data-testid="weather-icon-sun" />; // Soleado
  } else if (code === '02d' || code === '02n') {
    return <FaCloudSun className="text-gray-400 text-4xl" data-testid="weather-icon-cloud-sun" />; // Parcialmente nublado
  } else if (code.startsWith('03') || code.startsWith('04')) {
    return <FaCloud className="text-gray-600 text-4xl" data-testid="weather-icon-cloud" />; // Nublado
  } else if (code.startsWith('09') || code.startsWith('10')) {
    return <FaCloudShowersHeavy className="text-blue-500 text-4xl" data-testid="weather-icon-rain" />; // Lluvia
  } else if (code.startsWith('11')) {
    return <FaBolt className="text-yellow-500 text-4xl" data-testid="weather-icon-bolt" />; // Tormenta
  } else if (code.startsWith('13')) {
    return <FaSnowflake className="text-blue-300 text-4xl" data-testid="weather-icon-snowflake" />; // Nieve
  } else if (code.startsWith('50')) {
    return <FaWind className="text-gray-500 text-4xl" data-testid="weather-icon-wind" />; // Neblina o viento
  } else {
    return <FaSun className="text-yellow-400 text-4xl" data-testid="weather-icon-default" />; // Por defecto: sol
  }
};

export default WeatherIcon;