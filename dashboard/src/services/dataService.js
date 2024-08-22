import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';

export const getData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const filterData = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/filter`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error filtering data:', error);
  }
};
