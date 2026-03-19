import axios from "axios";

// 🔹 Your deployed backend URL
const BASE_URL = "https://pixora-backend-iu2z.onrender.com";

// 🔹 Create Post
export const createPost = async (postData) => {
  try {
    const res = await axios.post(`${BASE_URL}/posts`, postData);
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Get All Posts (optional but useful)
export const getPosts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/posts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Like Post
export const likePost = async (postId) => {
  try {
    const res = await axios.put(`${BASE_URL}/posts/like/${postId}`);
    return res.data;
  } catch (error) {
    console.error("Error liking post:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Add Comment
export const addComment = async (postId, comment) => {
  try {
    const res = await axios.post(`${BASE_URL}/posts/comment/${postId}`, {
      text: comment,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
    throw error;
  }
};