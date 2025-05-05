import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get user with stored token
export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    localStorage.removeItem('token');
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data; // Should contain token and user info
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

// Existing functions
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userData.id}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Function to classify waste item
export const classifyWaste = async (imageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/waste/classify`, { image: imageData });
        return response.data;
    } catch (error) {
        console.error('Error classifying waste:', error);
        throw error;
    }
};

// Function to log waste item
export const logWaste = async (wasteData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/waste/log`, wasteData);
        return response.data;
    } catch (error) {
        console.error('Error logging waste:', error);
        throw error;
    }
};

// Function to get user eco-impact
export const getEcoImpact = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/impact`);
        return response.data;
    } catch (error) {
        console.error('Error fetching eco impact:', error);
        throw error;
    }
};

// Function to get community leaderboard
export const getLeaderboard = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/waste/leaderboard`);
        return response.data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};

// Function to get user's waste logs
export const getUserWasteLogs = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/waste/user/${userId}/logs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching waste logs:', error);
        throw error;
    }
};