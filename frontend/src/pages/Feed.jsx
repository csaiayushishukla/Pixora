import { useEffect, useState } from "react";
import axios from "axios";
import { getPosts, createPost } from "../api";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const fetchPosts = async () => {
    const res = await getPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await axios.post(
      "http://localhost:3000/api/posts/upload",
      formData
    );

    const imageUrl = uploadRes.data.url;

    await createPost({ caption, image: imageUrl });

    setCaption("");
    setFile(null);
    fetchPosts();
  };

  return (
    <div className="bg-black min-h-screen text-white">

      <div className="max-w-xl mx-auto pt-6">

        {/* CREATE POST */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h2 className="mb-2 font-semibold">Create Post</h2>

          <form onSubmit={handlePost} className="flex flex-col gap-3">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="bg-gray-800 p-2 rounded"
              required
            />

            <textarea
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-gray-800 p-2 rounded"
              required
            />

            <button className="bg-blue-500 p-2 rounded">
              Post
            </button>
          </form>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-900 rounded-lg mb-6">

            {/* USER */}
            <div className="p-3 font-semibold border-b border-gray-700">
              {post.user}
            </div>

            {/* IMAGE */}
            <img src={post.image} className="w-full" />

            {/* ACTIONS */}
            <div className="p-3">
              <button className="mr-3">❤️</button>
              <button>💬</button>
            </div>

            {/* CAPTION */}
            <div className="px-3 pb-3">
              <span className="font-bold">{post.user} </span>
              {post.caption}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Feed;