import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl mb-6 overflow-hidden hover:scale-[1.02] transition duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{post.user}</h2>
            <p className="text-sm text-gray-400">2 hours ago</p>
          </div>
        </div>
        <span className="text-gray-400 cursor-pointer">•••</span>
      </div>

      {/* Image */}
      <img
  src={post.image || "https://picsum.photos/800/600"}
  className="w-full h-[300px] object-cover"
/>


      {/* Actions */}
      <div className="flex justify-between p-4">
        <div className="flex gap-4">
          <Heart
            onClick={() => setLiked(!liked)}
            className={`cursor-pointer transition ${
              liked ? "text-red-500 fill-red-500 scale-110" : ""
            }`}
          />
          <MessageCircle className="cursor-pointer hover:text-blue-400 hover:scale-110 transition" />
        </div>
        <Bookmark className="cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Caption */}
      <span className="font-semibold">{post.user || "User"}</span> {post.caption}
      

      {/* Comment */}
      <div className="border-t border-gray-700 p-3">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default PostCard;