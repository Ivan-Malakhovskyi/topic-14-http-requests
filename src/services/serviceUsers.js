import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://6a4e60de785c9ef536cbd48.mockapi.io",
});

export const getUsers = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

export const addUser = async (userData) => {
  const { data } = await axiosInstance.post("/users", userData);
  return data;
};

export const deleteUserById = async (userId) => {
  const { data } = await axiosInstance.delete(`/users/${userId}`);
  return data;
};
