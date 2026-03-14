import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:3000/posts");
        setPosts(res.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    }

    fetchPosts();

  }, []);

  return (
    <div>

      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.image} width="300" />
        </div>
      ))}

    </div>
  );
}

export default Feed;