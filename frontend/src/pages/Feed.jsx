// Feed.jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://pixora-backend-iu2z.onrender.com/posts");
      setPosts(res.data);
    } catch (err) {
      console.log("Error fetching posts:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.image} alt={post.caption} />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}