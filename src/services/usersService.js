import apiClient from "./apiClient";

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/users/login",credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await apiClient.put(`/users/${id}`,userData);
  return response.data;
};

export const toggleRecruiterStatus = async (id) => {
  const response = await apiClient.patch(`/users/${id}`);
  return response.data;
};