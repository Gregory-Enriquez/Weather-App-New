export const translateWeather = (description: string) => {
    const translations: { [key: string]: string } = {
      'clear sky': 'Cielo despejado',
      'few clouds': 'Pocas nubes',
      'scattered clouds': 'Nubes dispersas',
      'broken clouds': 'Nubes rotas',
      'shower rain': 'Lluvia ligera',
      'rain': 'Lluvia',
      'thunderstorm': 'Tormenta',
      'snow': 'Nieve',
      'mist': 'Neblina',
      'overcast clouds': 'Nublado',
    };
    return translations[description] || description;
  };