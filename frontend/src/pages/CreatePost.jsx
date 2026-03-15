import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://pixora-backend-iu2z.onrender.com/posts", // your deployed backend
        formData
      );
      console.log("Post created:", res.data);
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      alert("Error creating post");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;