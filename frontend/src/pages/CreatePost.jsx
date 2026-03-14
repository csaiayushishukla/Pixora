import axios from "axios";
import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // Convert "data:image/png;base64,..." to pure base64
      const base64 = reader.result.split(",")[1];

      try {
        const res = await axios.post("http://localhost:3000/posts", {
          title,
          description,
          fileBuffer: base64, // send proper base64
        });
        console.log("Post created:", res.data);
      } catch (err) {
        console.error("Error creating post:", err);
      }
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;