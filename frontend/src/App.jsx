import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost"; // ✅ default export
import Feed from "./pages/Feed"; // ✅ default export

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Feed</Link> | <Link to="/create">Create Post</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;