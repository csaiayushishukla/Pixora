import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getPosts = () => API.get("/posts");

export const createPost = (data) => API.post("/posts", data);