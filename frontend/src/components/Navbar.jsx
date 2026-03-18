import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold">MySocial</h1>

      {/* NAV LINKS */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Navbar;