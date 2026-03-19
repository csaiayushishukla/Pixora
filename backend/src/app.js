import axios from "axios";

// Use deployed backend
const API = axios.create({
  baseURL: "https://pixora-backend-iu2z.onrender.com",
});

// POSTS
export const getPosts = async () => (await API.get("/posts")).data;
export const createPost = async (postData) => (await API.post("/posts", postData)).data;
export const likePost = async (id) => (await API.put(`/posts/like/${id}`)).data;
export const commentPost = async (id, comment) => (await API.post(`/posts/comment/${id}`, { comment })).data;
export const deletePost = async (id) => (await API.delete(`/posts/${id}`)).data;

// USERS
export const signupUser = async (userData) => (await API.post("/users/signup", userData)).data;
export const loginUser = async (userData) => (await API.post("/users/login", userData)).data;