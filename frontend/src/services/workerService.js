import axios from 'axios';

const API_URL = 'http://localhost:5000/api/workers';

export const getWorkers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};

export const addWorker = async (worker) => {
  try {
    const response = await axios.post(`${API_URL}/add`, worker);
    return response.data;
  } catch (error) {
    console.error("Error adding worker:", error);
    throw error;
  }
};