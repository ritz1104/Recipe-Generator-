import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("https://recipe-generator-jwik.onrender.com/api/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
