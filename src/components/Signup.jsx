import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hide } from "../utils/showLoginSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    skills: "",
    rating: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(BASE_URL + "/signup", formData, { withCredentials: true });
      console.log(data);
      dispatch(hide());
      navigate("/")
    } catch (error) {
      console.log("Error to sending data on backend: ", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 min-h-screen rounded-xl mt-12 text-white">
      <div className="bg-black shadow-2xl rounded-xl m-8 p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Your role" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Avatar URL</label>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Profile image URL" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold">Skills (comma separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Node.js" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold">Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="5" step="0.1" placeholder="Your rating" className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-400" required />
          </div>

          <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
