import axios from "axios";

const API = axios.create({ baseURL: "https://hustle4514.herokuapp.com/" });

export const generateOtp = (phoneNumber) =>
  API.get(`/auth/getotp/${phoneNumber}`);

export const userLogin = (userId, data) =>
  API.post(`/auth/login/${userId}`, data);

export const userRegister = (phoneNumber, data) =>
  API.post(`/users/${phoneNumber}`, data);

export const getUser = (userId) => API.get(`/users/${userId}`);
export const editUser = (userId, data) => API.patch(`users/${userId}`, data);

export const getHustler = (userId) => API.get(`/hustlers/${userId}`);
export const createHustler = (userId, data) =>
  API.post(`hustlers/${userId}`, data);
export const editHustler = (userId, data) =>
  API.patch(`/hustlers/${userId}`, data);

//export const updatePost=(id,post)=> API.patch(`/posts/${id}`,post)
//export const deletePost=(id)=> API.delete(`/posts/${id}`)
//export const likePost=(id)=>API.patch(`/posts/${id}/like`)
