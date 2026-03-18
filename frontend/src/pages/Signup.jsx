import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">

      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <h2 className="text-xl mb-4 text-center">Signup</h2>

        <input placeholder="Username" className="w-full p-2 mb-3 bg-gray-800 rounded" />
        <input placeholder="Email" className="w-full p-2 mb-3 bg-gray-800 rounded" />
        <input placeholder="Password" type="password" className="w-full p-2 mb-3 bg-gray-800 rounded" />

        <button className="w-full bg-blue-500 p-2 rounded">
          Signup
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </div>

    </div>
  );
};

export default Signup;