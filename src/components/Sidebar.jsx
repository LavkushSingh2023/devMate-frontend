import axios from "axios";
import { Home, Users, MessageSquare, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import {removeUser} from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export async function handleLogOut(dispatch, navigate) {
    try{
        const response = await axios.post(BASE_URL + "/logout",{}, {withCredentials: true}) 
        dispatch(removeUser())
        navigate("/login")   
        console.log(response.data)
    }catch(error){
        console.error("Error in logOut: ", error.message)
    }
  }

export default function Sidebar({ isSidebarOpen }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector((state) => state.loggedInUser)

  return (
    <div
      className={`mt-16 fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-400 to-pink-400 text-white transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`} onClick={(e) => {e.stopPropagation()}}
    >
      {/* User Profile Section */}
      <div className="flex items-center p-6 border-b border-blue-500">
        <img
          src={user?.avatar || ""}
          alt="profile"
          className="w-10 h-10 rounded-full bg-black"
        />
        <div className="ml-3">
          <p className="font-semibold">{user?.name || "no user exist!"}</p>
          <p className="text-sm text-white-200">Premium Member</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4">
        <button
        onClick={() => {
            navigate("/");
        }}
        className="w-full flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
        <Home className="w-5 h-5" />
        <span className="ml-3">Home</span>
        </button>

        <button
        className="w-full flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
        >
        <Users className="w-5 h-5" />
        <span className="ml-3">Matches</span>
        </button>

        <button
          className="w-full flex items-center p-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="ml-3">Messages</span>
        </button>
      </nav>

      {/* Settings Dropdown */}
      <div className="mb-24 absolute bottom-0 w-full p-4 border-t border-blue-500">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center w-full p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="ml-3">Settings</span>
        </button>
        {showSettings && (
          <div className="mt-2 pl-8">
            <button onClick={() => handleLogOut(dispatch, navigate)}
              className="w-full flex items-center p-2 rounded-lg text-red-600 font-bold hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 " />
              <span className="ml-3">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
