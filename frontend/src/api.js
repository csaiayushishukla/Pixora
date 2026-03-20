import axios from "axios";

// ✅ YOUR BACKEND URL
const API = "https://pixora-backend-iu2z.onrender.com";

// ------------------ AUTH ------------------
export const signup = (data) => {
  return axios.post(`${API}/api/v1/auth/signup`, data);
};

export const login = (data) => {
  return axios.post(`${API}/api/v1/auth/login`, data);
};

// ------------------ POSTS ------------------
export const getPosts = () => {
  return axios.get(`${API}/api/v1/posts`);
};

export const createPost = (data, token) => {
  return axios.post(`${API}/api/v1/posts`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likePost = (postId, token) => {
  return axios.put(`${API}/api/v1/posts/like/${postId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = (postId, token) => {
  return axios.delete(`${API}/api/v1/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};