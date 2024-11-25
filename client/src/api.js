import axios from 'axios';

const BASE_URL = "http://localhost:8000/api";

// User Registration
export const registerUser = (data) => axios.post(`${BASE_URL}/signup`, data);

// User Login
export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);

// Create Event (includes file upload)
export const createEvent = (data, token) => {
  const formData = new FormData();

  // Append fields to FormData
  for (const key in data) {
    formData.append(key, data[key]);
  }

  return axios.post(`${BASE_URL}/events`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

// Get All Events
export const getAllEvents = () => axios.get(`${BASE_URL}/events`);
