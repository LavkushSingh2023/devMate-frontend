import { Link, useNavigate } from "react-router-dom";
import { hide } from "../utils/showLoginSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL + "/login", {email, password}, {withCredentials: true});
            console.log(response.data.message)
            dispatch(hide());
            navigate("/");
        } catch (error) {
            console.log("❌ Error logging in:", error.response?.data || error.message);
        }
    }

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
      <div className="bg-black shadow-2xl rounded-xl m-8 p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>      
        <div className="mb-4">
          <label htmlFor="emailId" className="block text-white font-semibold">Email</label>
          <input
            type="text"
            id="emailId"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-white font-semibold">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Submit
          </button>
        </div>
        </form>  

        <p className="mt-4 text-center text-gray-300">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
