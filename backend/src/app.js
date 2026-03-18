import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend URL
});

// GET POSTS
export const getPosts = () => API.get("/posts");

// CREATE POST
export const createPost = (data) => API.post("/posts", data);

export default API;