import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts"); // ✅ correct URL
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.caption}</h3>
          <img src={post.image} alt={post.caption} width="200" />
        </div>
      ))}
    </div>
  );
};

export default Feed;