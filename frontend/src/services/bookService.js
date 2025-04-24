import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const BOOKS_URL = `${API_URL}/books`;

export const getBooks = () => axios.get(BOOKS_URL);
export const getBook = (id) => axios.get(`${BOOKS_URL}/${id}`);
export const createBook = (data) => axios.post(BOOKS_URL, data);
export const updateBook = (id, data) => axios.put(`${BOOKS_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BOOKS_URL}/${id}`);
