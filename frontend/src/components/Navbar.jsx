import React from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
const Navbar = (isAuthenticated,handleLogout) => {

  return (
    <motion.nav
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full flex justify-between items-center px-6 md:px-12 py-4  fixed top-0 left-0 right-0 z-50"
  >
    <h1 className="text-2xl font-bold text-green-400 hover:text-green-300 transition">
      Recipe Generator
    </h1>

    {isAuthenticated ?(
        <div className="hidden md:flex space-x-6">
        <Link
          to="/recipe-form"
          className="text-lg text-gray-300 hover:text-green-400 transition-all duration-300"
        >
          Generate
        </Link>
        <Link
          to="/saved-recipes"
          className="text-lg text-gray-300 hover:text-blue-400 transition-all duration-300"
        >
          View Saved
        </Link>
        <Link
          
          onClick={handleLogout}
          className="text-lg text-gray-300 hover:text-red-400 transition-all duration-300"
        >
          Logout
        </Link>
      </div>
    ):( <>
    <Link to="/login" className="hover:text-green-400">
      Login
    </Link>
    <Link to="/signup" className="hover:text-green-400">
      Signup
    </Link>
    </>
    )}
  </motion.nav>
  )
}

export default Navbar
