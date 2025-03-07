import axios from "axios";
import { Home, Users, MessageSquare, Settings, LogOut, PenSquare } from "lucide-react";
import { useState } from "react";
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export async function handleLogOut(dispatch, navigate) {
  try {
    const response = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
    console.log(response.data);
  } catch (error) {
    console.error("Error in logOut: ", error.message);
  }
}

export default function Sidebar({ isSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const user = useSelector((state) => state.loggedInUser);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Matches", path: "/matches" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: PenSquare, label: "My Posts", path: "/profile" }
  ];

  return (
    <div
      className={`mt-16 fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-gray-900 to-blue-900 text-white transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Profile Section */}
      <div className="flex items-center p-6 border-b border-cyan-500/20">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="profile"
          className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold text-cyan-300">{user?.name || "Guest"}</p>
          <p className="text-sm text-cyan-400/80 mt-1">Developer Profile</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center p-3 rounded-xl hover:bg-cyan-500/10 transition-all group"
          >
            <item.icon className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
            <span className="ml-3 text-cyan-200 group-hover:text-white">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Settings Section */}
      <div className="absolute bottom-0 w-full p-4 border-t border-cyan-500/20">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center p-3 rounded-xl hover:bg-cyan-500/10 transition-all group"
        >
          <Settings className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
          <span className="ml-3 text-cyan-200 group-hover:text-white">Settings</span>
        </button>

        {showSettings && (
          <div className="mt-2 pl-8">
            <button
              onClick={() => handleLogOut(dispatch, navigate)}
              className="w-full flex items-center p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}