import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
     
     <Navbar/>
      
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-6 drop-shadow-lg relative z-10"
        >
          Welcome to <span className="text-green-400">Recipe Generator</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg mb-8 text-gray-300 text-center max-w-xl relative z-10"
        >
          Create and save unique recipes effortlessly based on your ingredients.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex space-x-6 relative z-10"
        >
          <Link
            to="/recipe-form"
            className="bg-gradient-to-r from-green-500 to-green-400 text-black py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
          >
            Generate Recipe
          </Link>
          <Link
            to="/saved-recipes"
            className="bg-gradient-to-r from-blue-500 to-blue-400 text-black py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
          >
            View Saved Recipes
          </Link>
        </motion.div>
      </div>

      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
    </div>
  );
}