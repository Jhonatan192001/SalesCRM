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
    if (response.data && response.data.worker) {
      return response.data.worker;
    } else {
      throw new Error("No se recibió la información del trabajador del servidor");
    }
  } catch (error) {
    console.error("Error adding worker:", error);
    throw error;
  }
};

export const updateWorker = async (workerId, workerData) => {
  try {
    const response = await axios.put(`${API_URL}/${workerId}`, workerData);
    if (response.data && response.data.worker) {
      return response.data.worker;
    } else {
      throw new Error("No se recibió la información actualizada del trabajador del servidor");
    }
  } catch (error) {
    console.error("Error updating worker:", error);
    throw error;
  }
};

export const deleteWorker = async (workerId) => {
  try {
    const response = await axios.delete(`${API_URL}/${workerId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting worker:", error);
    throw error;
  }
};