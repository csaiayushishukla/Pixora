import { useEffect, useState } from "react";
import axios from "axios";

function Feed(){

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/posts")
    .then(res=>{
      setPosts(res.data);
    })
  },[])

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

      <h1>My Feed</h1>

      {posts.map((post)=>(
        <div 
          key={post._id} 
          style={{
            border:"1px solid #ddd",
            borderRadius:"10px",
            padding:"10px",
            margin:"20px",
            width:"300px",
            boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <img 
            src={post.image} 
            alt="post"
            style={{
              width:"100%",
              borderRadius:"10px"
            }}
          />
        </div>
      ))}

    </div>
  )
}

export default Feed;