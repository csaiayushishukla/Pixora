import { useState } from "react";
import axios from "axios";

function CreatePost(){

  const [caption,setCaption] = useState("");
  const [file,setFile] = useState(null);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption",caption);
    formData.append("image",file);

    await axios.post("http://localhost:3000/posts",formData);
  }

  return (
    <div>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
        />

        <br/><br/>

        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e)=>setCaption(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Post</button>

      </form>
    </div>
  )
}

export default CreatePost;