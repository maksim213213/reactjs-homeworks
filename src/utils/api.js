// src/utils/api.js

const API_BASE_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1';

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/meals`);
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};