import WeatherIcon from '../components/WeatherIcon';
import { translateWeather } from '../utils/translateWeather';

interface ForecastData {
  dt: number;
  main: { temp: number };
  weather: { icon: string; description: string }[];
}

interface ForecastDisplayProps {
  forecast: ForecastData[];
}

const ForecastDisplay = ({ forecast }: ForecastDisplayProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pronóstico de las próximas 12 horas</h3>
      <div className="space-y-3">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white bg-opacity-80 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-700">
              {new Date(item.dt * 1000).toLocaleTimeString('es-MX', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
            <div className="flex items-center space-x-2">
              <WeatherIcon code={item.weather[0].icon} />
              <p className="text-gray-700">{item.main.temp}°C</p>
              <p className="text-gray-700">{translateWeather(item.weather[0].description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;