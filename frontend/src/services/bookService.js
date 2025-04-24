import axios from "axios";

// Configuration globale d'axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

const API_URL = process.env.REACT_APP_API_URL || "https://bookmanager-git-main-imadbentas-projects.vercel.app";
const BOOKS_URL = `${API_URL}/api/books`;

// Ajout de la gestion des erreurs
const handleError = (error) => {
  console.error('Erreur API:', error);
  throw error;
};

export const getBooks = () => axios.get(BOOKS_URL).catch(handleError);
export const getBook = (id) => axios.get(`${BOOKS_URL}/${id}`).catch(handleError);
export const createBook = (data) => axios.post(BOOKS_URL, data).catch(handleError);
export const updateBook = (id, data) => axios.put(`${BOOKS_URL}/${id}`, data).catch(handleError);
export const deleteBook = (id) => axios.delete(`${BOOKS_URL}/${id}`).catch(handleError);
