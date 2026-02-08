import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export const userApi = {
  getUsers: () => API.get("/users"),
  createUser: (data: any) => API.post("/users", data),
  updateUser: (id: number, data: any) => API.put(`/users/${id}`, data),
  deleteUser: (id: number) => API.delete(`/users/${id}`),
};
