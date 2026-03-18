import { useState } from "react";
import axios from "axios";
import { createPost } from "../api";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 STEP 1: Upload image
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:3000/api/posts/upload",
        formData
      );

      const imageUrl = uploadRes.data.url;

      // 🔥 STEP 2: Create post
      await createPost({
        caption,
        image: imageUrl,
      });

      alert("Post created 🚀");

      // redirect to feed
      window.location.href = "/";

    } catch (err) {
      console.log(err);
      alert("Error uploading post ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-[#1e293b] p-6 rounded-xl text-white">
      <h2 className="text-2xl mb-4 font-bold">Create Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* IMAGE INPUT */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 bg-gray-800 rounded"
          required
        />

        {/* CAPTION */}
        <textarea
          placeholder="Write caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="p-2 rounded bg-gray-800"
          required
        />

        {/* BUTTON */}
        <button className="bg-blue-500 p-2 rounded hover:bg-blue-600">
          Upload 🚀
        </button>
      </form>
    </div>
  );
};

export default CreatePost;