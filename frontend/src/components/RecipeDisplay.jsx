import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RecipeDisplay() {
  
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetched Recipe Data:", recipe);
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 text-2xl font-semibold">
        No recipe found.
      </div>
    );
  }

  const handleSaveRecipe = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      setMessage("You must be logged in to save recipes.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://recipe-generator-jwik.onrender.com/api/recipes/save",
        { recipe }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save recipe.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center  bg-black relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>

<div className="absolute -top-20 left-10 w-80 h-80 bg-blue-500 opacity-30 blur-3xl"></div>
<div className="absolute -bottom-20 right-10 w-80 h-80 bg-purple-500 opacity-30 blur-3xl"></div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full p-7 relative   rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{recipe.title || "Untitled Recipe"}</h2>
        
        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
        {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}{" "}
                {ingredient.preparation ? `(${ingredient.preparation})` : ""}
              </li>))}
        </ul>

        <h3 className="text-xl relative  font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-gray-400 space-y-2">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index}>
                <strong>Step {instruction.step}:</strong> {instruction.description}
              </li>
            ))}
          </ol>

        <p className="mt-4 text-gray-400">
          <strong>Cooking Time:</strong> {recipe.cooking_time || "N/A"}
        </p>
        <p className="text-gray-400">
          <strong>Serving Size:</strong> {recipe.serving_size || "N/A"}
        </p>

        <button
          onClick={handleSaveRecipe}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition transform hover:scale-105"
        >
           {loading ? (
              <span className="animate-spin h-6 w-6 border-b-2 border-white"></span>
            ) : (
              "Save Recipe"
            )} 
        </button>
        {message && (
            <p
              className={`mt-3 text-center text-lg ${
                message.includes("Failed") ? "text-red-500" : "text-blue-400"
              }`}
            >
              {message}
            </p>
          )}
      </motion.div>
    </div>
  );
}
