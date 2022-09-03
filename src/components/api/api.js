import axios from "axios";

const local = "http://localhost:5000/";
const prod = "https://hustle4514.herokuapp.com/";

const API = axios.create({ baseURL: local });

export const generateOtp = (phoneNumber) =>
  API.get(`/auth/getotp/${phoneNumber}`);

export const userLogin = (userId, data) =>
  API.post(`/auth/login/${userId}`, data);

export const userRegister = (phoneNumber, data) =>
  API.post(`/users/${phoneNumber}`, data);

export const getUser = (userId) => API.get(`/users/${userId}`);
export const editUser = (userId, data) => API.patch(`users/${userId}`, data);

export const getHustler = (userId) => API.get(`/hustlers/${userId}`);
export const getSkilledHustlers = (skill, data) =>
  API.post(`/hustlers/skill/${skill}`, data);
export const createHustler = (userId, data) =>
  API.post(`hustlers/${userId}`, data);
export const editHustler = (userId, data) =>
  API.patch(`/hustlers/${userId}`, data);

//export const updatePost=(id,post)=> API.patch(`/posts/${id}`,post)
//export const deletePost=(id)=> API.delete(`/posts/${id}`)
//export const likePost=(id)=>API.patch(`/posts/${id}/like`)
export const getAllComments = (hustlerId) =>
  API.get(`/comments/all/${hustlerId}`);

export const getComment = (commentId) => API.get(`/comments/${commentId}`);

export const createComment = async (hustlerId, data) =>
  API.post(`/comments/${hustlerId}`, data);

export const editComment = (commentId, data) =>
  API.patch(`/comments/${commentId}`, data);

export const toggleCommentLikes = (commentId, data) =>
  API.patch(`/comments/like/${commentId}`, data);

export const deleteComment = (commentId) =>
  API.delete(`/comments/${commentId}`);
