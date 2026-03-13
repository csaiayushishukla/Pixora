import { useState } from "react";
import axios from "axios";

function CreatePost() {

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    await axios.post("http://localhost:3000/posts", formData);

    alert("Post created!");
  };

  return (
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
  );
}

export default CreatePost;