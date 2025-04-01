import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/recipes/generate", {
        ingredients: ingredients.split(",").map((item) => item.trim()),
        cuisine,
        dietaryPreferences,
      });

      if (response.data) {
        navigate("/recipes", { state: { recipe: response.data } });
      } else {
        setError("No recipe data received.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to generate recipe.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center  bg-black p-6 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      <div className="absolute -top-20 left-10 w-80 h-80 bg-blue-500 opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-0 right-10 w-80 h-80 bg-purple-500 opacity-30 blur-3xl"></div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full p-8  bg-black bg-opacity-30 border border-gray-700 rounded-2xl flex shadow-2xl backdrop-blur-md"
      >
       
        <div className="lg:w-full w-full block  justify-center">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
            <h2 className="text-4xl font-extrabold mb-3">Generate a Recipe</h2>
            <p className="text-gray-400 text-sm mb-5">Enter ingredients, select cuisine, and get a personalized recipe instantly!</p>
            </div>
            <div>
              <label className="block text-gray-300  font-semibold">Ingredients</label>
              <input
                type="text"
                className="w-full p-3 border-none rounded-lg bg-gray-700 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Rice,vegetables,oil"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold">Cuisine Type</label>
              <input
                type="text"
                className="w-full p-3 border-none rounded-lg bg-gray-700 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={cuisine}
                placeholder=" snacks"
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold">Dietary Preferences</label>
              <input
                type="text"
                className="w-full p-3 border-none rounded-lg bg-gray-700 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={dietaryPreferences}
                placeholder="vegan,gluten-free"
                onChange={(e) => setDietaryPreferences(e.target.value)}
              />
            </div>
            <motion.button 
            type="submit" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center font-semibold text-lg"
          >
            <span className="">Generate Recipe</span>
          </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
