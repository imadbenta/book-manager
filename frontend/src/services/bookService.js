import axios from "axios";

// Configuration globale d'axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

const API_URL = process.env.REACT_APP_API_URL || "https://bookmanager-imadbentas-projects.vercel.app";
const BOOKS_URL = `${API_URL}/api/books`;

console.log('API URL:', API_URL);
console.log('Books URL:', BOOKS_URL);

// Intercepteur pour les requêtes
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

// Intercepteur pour les réponses
axios.interceptors.response.use(
  response => {
    console.log('Response:', response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const getBooks = async () => {
  try {
    const response = await axios.get(BOOKS_URL);
    return response;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(`${BOOKS_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    throw error;
  }
};

export const createBook = async (data) => {
  try {
    // Conversion de l'année en nombre
    const bookData = {
      ...data,
      year: data.year ? parseInt(data.year, 10) : null
    };
    console.log('Création d\'un livre avec les données:', bookData);
    const response = await axios.post(BOOKS_URL, bookData);
    console.log('Réponse de création:', response.data);
    return response;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    // Conversion de l'année en nombre
    const bookData = {
      ...data,
      year: data.year ? parseInt(data.year, 10) : null
    };
    console.log('Mise à jour du livre', id, 'avec les données:', bookData);
    const response = await axios.put(`${BOOKS_URL}/${id}`, bookData);
    console.log('Réponse de mise à jour:', response.data);
    return response;
  } catch (error) {
    console.error(`Error updating book ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${BOOKS_URL}/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    throw error;
  }
};
