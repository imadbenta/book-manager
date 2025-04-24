import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://bookmanager-git-main-imadbentas-projects.vercel.app";
const BOOKS_URL = `${API_URL}/api/books`;

export const getBooks = () => axios.get(BOOKS_URL);
export const getBook = (id) => axios.get(`${BOOKS_URL}/${id}`);
export const createBook = (data) => axios.post(BOOKS_URL, data);
export const updateBook = (id, data) => axios.put(`${BOOKS_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BOOKS_URL}/${id}`);
