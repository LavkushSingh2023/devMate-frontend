import { Sun, Moon, Search, Bell, User, Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../utils/showLoginSlice";
import { toggleProfile } from "../utils/showProfileSlice";
import Profile from "./UserProfileDropdown";
// import {setGlobalSearch} from "./Home"
import { setSearch } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode, toggleSidebar, backgroundOptions, onBackgroundChange }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const showLogin = useSelector((state) => state.login.showLogin);
  const showProfile = useSelector((state) => state.profile.showProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Function to handle background change
  const handleThemeChange = () => {
    const nextIndex = (currentBackgroundIndex + 1) % backgroundOptions.length;
    setCurrentBackgroundIndex(nextIndex);
    onBackgroundChange(backgroundOptions[nextIndex]);
  };

  return (
    <div className="fixed top-0 w-full flex justify-between items-center p-4 bg-gradient-to-r from-pink-200 to-blue-400 backdrop-blur-md shadow-md z-50">
      {/* Left Section: Menu Button and Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={(e) => {
            toggleSidebar()
            e.stopPropagation()
        }}
          className="p-2 rounded-full hover:bg-pink-300"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="text-2xl font-bold text-gray-800">devMate</div>
      </div>

      {/* Middle Section: Search Bar */}
      {!showLogin && (
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-96">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search profiles..."
            className="text-gray-700 ml-2 bg-transparent outline-none w-full"
            // name="search"
            // value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>
      )}

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-6">
        {/* Theme Change Button */}
        <button
          onClick={handleThemeChange}
          className="p-2 rounded-full hover:bg-pink-300"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="p-2 rounded-full hover:bg-pink-300"
  >
    <Bell className="w-6 h-6 text-gray-700" />
  </button>
  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Notifications
          </h3>
          <button
            onClick={() => setShowNotifications(false)}
            className="text-sm text-pink-500 hover:underline"
          >
            Dismiss All
          </button>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start">
            <img
              src="https://via.placeholder.com/40"
              alt="Jane"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                New match with{" "}
                <span className="font-semibold text-gray-900">Jane</span>!
              </p>
              <p className="text-xs text-gray-500">5 mins ago</p>
            </div>
          </li>
          <li className="flex items-start">
            <img
              src="https://via.placeholder.com/40"
              alt="Mike"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Mike</span> liked your profile.
              </p>
              <p className="text-xs text-gray-500">12 mins ago</p>
            </div>
          </li>
        </ul>
        <div className="mt-4 text-center">
          <button className="text-sm text-pink-500 hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  )}
</div>


        {/* Profile Dropdown */}
        {showLogin ? (
          <div className="relative">
            <button
              onClick={() => {
                dispatch(show())
                navigate("/login")
            }}
              className="px-6 py-2 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()   // use for stop trigger to parent(event bubbling)
                dispatch(toggleProfile())
              }} 
              className="p-2 rounded-full hover:bg-pink-300"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
            {showProfile && <Profile />}
          </div>
        )}
      </div>
    </div>
  );
}

