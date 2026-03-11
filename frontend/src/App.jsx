import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>

      <nav>
        <h2>Post App</h2>
        <Link to="/">Home</Link> |{" "}
        <Link to="/create">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;