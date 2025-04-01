import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      <div className="absolute -top-20 left-10 w-80 h-80 bg-blue-500 opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-30 blur-3xl"></div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }} 
         animate={{ opacity: 1, scale: 1 }} 
         transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-black bg-opacity-30 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-md"
      >
         <motion.h1 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-white"
        >
          Create an Account
        </motion.h1>

        <form onSubmit={handleSignup} className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center font-semibold text-lg"
          >
            {loading ? <span className="animate-spin h-6 w-6 border-b-2 border-white"></span> : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-5">
          Already have an account? 
          <span className="text-blue-400 hover:underline cursor-pointer  ml-1" onClick={() => navigate('/login')}>
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}
