import axios from 'axios';

const BASE_URL = "http://localhost:8000/api"; 

export const registerUser = (data) => axios.post(`${BASE_URL}/signup`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
export const createEvent = (data, token) => axios.post(`${BASE_URL}/events`, data, {
  headers: { Authorization: token },
});
export const getAllEvents = () => axios.get(`${BASE_URL}/events`);
