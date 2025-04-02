import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const userId = "YOUR_USER_ID";
      const response = await axios.get(`https://recipe-generator-jwik.onrender.com/api/recipes/saved/${userId}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("Error fetching saved recipes:", error.response?.data || error.message);
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`https://recipe-generator-jwik.onrender.com/api/recipes/delete/${recipeId}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center  bg-black relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>

    <div className="absolute -top-20 left-10 w-80 h-80 bg-blue-500 opacity-30 blur-3xl"></div>
    <div className="absolute -bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-30 blur-3xl"></div>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-3xl mt-5 relative  font-bold mb-6"
      >
        Saved Recipes
      </motion.h1>
      {recipes.length === 0 ? (
        <p className="text-gray-400">No saved recipes found.</p>
      ) : (
        <motion.ul 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          {recipes.map((recipe) => (
            <motion.li 
              key={recipe._id} 
              className="mb-4 border-b border-gray-600 pb-4"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-xl font-semibold text-white">{recipe.title}</h2>
              <p className="text-gray-400">{recipe.instructions}</p>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition transform hover:scale-105"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
