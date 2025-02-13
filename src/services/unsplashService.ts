import axios from 'axios';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const getCityImage = async (city: string) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query: city,
      client_id: UNSPLASH_API_KEY,
      per_page: 1, // Solo una imagen
    },
  });
  return response.data.results[0]?.urls?.regular || null; // Devuelve la URL de la imagen
};