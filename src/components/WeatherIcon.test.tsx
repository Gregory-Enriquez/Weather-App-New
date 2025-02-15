import { render, screen } from '@testing-library/react';
import WeatherIcon from './WeatherIcon';

describe('WeatherIcon', () => {
  it('renders the sun icon for clear sky (01d)', () => {
    render(<WeatherIcon code="01d" />);
    const sunIcon = screen.getByTestId('weather-icon-sun');
    expect(sunIcon).toHaveClass('text-yellow-400');
  });

  it('renders the sun icon for clear sky at night (01n)', () => {
    render(<WeatherIcon code="01n" />);
    const sunIcon = screen.getByTestId('weather-icon-sun');
    expect(sunIcon).toHaveClass('text-yellow-400');
  });

  it('renders the cloud sun icon for partly cloudy (02d)', () => {
    render(<WeatherIcon code="02d" />);
    const cloudSunIcon = screen.getByTestId('weather-icon-cloud-sun');
    expect(cloudSunIcon).toHaveClass('text-gray-400');
  });

  it('renders the cloud sun icon for partly cloudy at night (02n)', () => {
    render(<WeatherIcon code="02n" />);
    const cloudSunIcon = screen.getByTestId('weather-icon-cloud-sun');
    expect(cloudSunIcon).toHaveClass('text-gray-400');
  });

  it('renders the cloud icon for cloudy (03d)', () => {
    render(<WeatherIcon code="03d" />);
    const cloudIcon = screen.getByTestId('weather-icon-cloud');
    expect(cloudIcon).toHaveClass('text-gray-600');
  });

  it('renders the cloud icon for overcast (04d)', () => {
    render(<WeatherIcon code="04d" />);
    const cloudIcon = screen.getByTestId('weather-icon-cloud');
    expect(cloudIcon).toHaveClass('text-gray-600');
  });

  it('renders the rain icon for rain (09d)', () => {
    render(<WeatherIcon code="09d" />);
    const rainIcon = screen.getByTestId('weather-icon-rain');
    expect(rainIcon).toHaveClass('text-blue-500');
  });

  it('renders the rain icon for heavy rain (10d)', () => {
    render(<WeatherIcon code="10d" />);
    const rainIcon = screen.getByTestId('weather-icon-rain');
    expect(rainIcon).toHaveClass('text-blue-500');
  });

  it('renders the bolt icon for thunderstorm (11d)', () => {
    render(<WeatherIcon code="11d" />);
    const boltIcon = screen.getByTestId('weather-icon-bolt');
    expect(boltIcon).toHaveClass('text-yellow-500');
  });

  it('renders the snowflake icon for snow (13d)', () => {
    render(<WeatherIcon code="13d" />);
    const snowflakeIcon = screen.getByTestId('weather-icon-snowflake');
    expect(snowflakeIcon).toHaveClass('text-blue-300');
  });

  it('renders the wind icon for mist (50d)', () => {
    render(<WeatherIcon code="50d" />);
    const windIcon = screen.getByTestId('weather-icon-wind');
    expect(windIcon).toHaveClass('text-gray-500');
  });

  it('renders the default sun icon for unknown codes', () => {
    render(<WeatherIcon code="unknown" />);
    const defaultIcon = screen.getByTestId('weather-icon-default');
    expect(defaultIcon).toHaveClass('text-yellow-400');
  });
});