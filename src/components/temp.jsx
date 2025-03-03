import { Sun, Moon, Search, Bell, User, Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../utils/showLoginSlice";
import { toggleProfile } from "../utils/showProfileSlice";
import Profile from "./Profile";
import {setGlobalSearch} from "./UserCard"

export default function Navbar({ darkMode, setDarkMode, toggleSidebar, backgroundOptions, onBackgroundChange }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const showLogin = useSelector((state) => state.login.showLogin);
  const showProfile = useSelector((state) => state.profile.showProfile);
  const dispatch = useDispatch();

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
            onChange={(e) => setGlobalSearch(e.target.value)}
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
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
              <div className="p-4">
                <p className="text-sm font-semibold">Notifications</p>
                <div className="mt-2 space-y-2">
                  <div className="text-sm text-gray-600">New match with Jane!</div>
                  <div className="text-sm text-gray-600">Mike liked your profile.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        {showLogin ? (
          <div className="relative">
            <button
              onClick={() => dispatch(show())}
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