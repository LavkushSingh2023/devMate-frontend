import axios from "axios";
import { Home, Users, MessageSquare, Settings, LogOut, PenSquare } from "lucide-react";
import { removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {setSearch} from "../utils/searchSlice"
import { show } from "../utils/showLoginSlice"

export async function handleLogOut(dispatch, navigate) {
  try {
    const response = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(show())
    navigate("/login");
    console.log(response.data);
  } catch (error) {
    console.error("Error in logOut: ", error.message);
  }
}

export default function Sidebar({ isSidebarOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Matches", path: "/matches" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: PenSquare, label: "My Posts", path: "/profile" }
  ];

  return (
    <div
      className={`mt-16 fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-purple-800 via-pink-600 to-blue-900 text-white transition-transform duration-300 shadow-2xl ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Profile Section */}
      <div className="flex items-center p-6 border-b border-pink-500/30">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="profile"
          className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover"
        />
        <div className="ml-3">
          <p className="font-bold text-pink-200">{user?.name || "Guest"}</p>
          <p className="text-sm text-pink-100 mt-1">Developer</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
                if(item.path == "/"){
                    dispatch(setSearch(null))
                }
                navigate(item.path)
            }}
            className="w-full flex items-center p-3 rounded-lg hover:bg-blue-800/40 transition-all group"
          >
            <item.icon className="w-6 h-6 text-pink-300 group-hover:text-pink-200" />
            <span className="ml-3 text-lg text-pink-100 group-hover:text-white">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
