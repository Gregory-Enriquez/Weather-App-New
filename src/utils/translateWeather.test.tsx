import { describe, it, expect } from 'vitest';
import { translateWeather } from './translateWeather'; // Asegúrate de que la ruta sea correcta

describe('translateWeather', () => {
  it('debería traducir "clear sky" a "Cielo despejado"', () => {
    expect(translateWeather('clear sky')).toBe('Cielo despejado');
  });

  it('debería traducir "few clouds" a "Pocas nubes"', () => {
    expect(translateWeather('few clouds')).toBe('Pocas nubes');
  });

  it('debería traducir "scattered clouds" a "Nubes dispersas"', () => {
    expect(translateWeather('scattered clouds')).toBe('Nubes dispersas');
  });

  it('debería traducir "broken clouds" a "Nubes rotas"', () => {
    expect(translateWeather('broken clouds')).toBe('Nubes rotas');
  });

  it('debería traducir "shower rain" a "Lluvia ligera"', () => {
    expect(translateWeather('shower rain')).toBe('Lluvia ligera');
  });

  it('debería traducir "rain" a "Lluvia"', () => {
    expect(translateWeather('rain')).toBe('Lluvia');
  });

  it('debería traducir "thunderstorm" a "Tormenta"', () => {
    expect(translateWeather('thunderstorm')).toBe('Tormenta');
  });

  it('debería traducir "snow" a "Nieve"', () => {
    expect(translateWeather('snow')).toBe('Nieve');
  });

  it('debería traducir "mist" a "Neblina"', () => {
    expect(translateWeather('mist')).toBe('Neblina');
  });

  it('debería traducir "overcast clouds" a "Nublado"', () => {
    expect(translateWeather('overcast clouds')).toBe('Nublado');
  });

  it('debería devolver la descripción original si no hay traducción', () => {
    expect(translateWeather('unknown description')).toBe('unknown description');
  });
});