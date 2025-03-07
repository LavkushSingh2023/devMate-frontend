import axios from "axios";
import { LogOut, UserPlus, Users, Settings, Pencil, HelpCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { handleLogOut } from "./Sidebar";
import { BASE_URL } from "../utils/constants";

export default function UserProfileDropdown({ show }) {
     const navigate = useNavigate()
     const dispatch = useDispatch()

    const showLogin = useSelector((state) => state.login.showLogin)   
    const user = useSelector((state) => state.loggedInUser)
    

    async function findLogInUser() {
        try{
            const user = await axios.get(BASE_URL + "/profile/view", {withCredentials: true})    
            dispatch(addUser(user.data))
        }catch(error){
            console.error("Error in finding logInUser: ", error.message)
        }
    }

    useEffect(() => {
        findLogInUser()
    },[showLogin])

  return (
    <div onClick={(e) => {e.stopPropagation()}} className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-lg shadow-xl overflow-hidden transition duration-200 ease-in-out">
      {/* Profile Section */}
      <div className="p-4 flex items-center space-x-3 border-b border-blue-500 dark:border-indigo-700 bg-opacity-90">
        <img 
          src={user?.avatar || ""}
          alt="Profile" 
          className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-black" 
        />
        <div>
          <p className="text-sm font-semibold text-white">{user?.name || "no user exist"}</p>
          <p className="text-xs text-blue-200">{user?.email || ""}</p>
          <span className="text-xs text-green-400 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                {user && "Online"}         
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2">
        <button onClick={() => navigate("/connectionRequests")} className="w-full flex items-center space-x-2 p-3 text-sm text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition">
          <UserPlus className="w-5 h-5 text-white" />
          <span>Connection Requests</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
        </button>
        <button onClick={() => navigate("/myConnections")} className="w-full flex items-center space-x-2 p-3 text-sm text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition">
          <Users className="w-5 h-5 text-white" />
          <span>Your Connections</span>
        </button>
        <button onClick={() => navigate("/updateProfile")} className="w-full flex items-center space-x-2 p-3 text-sm text-white hover:bg-blue-600 dark:hover:bg-blue-600 rounded-lg transition">
          <Pencil className="w-5 h-5 text-white" />
          <span>Update Profile</span>
        </button>
        <button onClick={() => navigate("/settings")} className="w-full flex items-center space-x-2 p-3 text-sm text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition">
          <Settings className="w-5 h-5 text-white" />
          <span>Settings</span>
        </button>
        <button onClick={() => navigate("/help-support")} className="w-full flex items-center space-x-2 p-3 text-sm text-white hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition">
          <HelpCircle className="w-5 h-5 text-white" />
          <span>Help & Support</span>
        </button>
      </div>

      {/* Log Out Section */}
      <div className="p-2 border-t border-blue-500 dark:border-indigo-700 bg-opacity-90">
        <button
          onClick={() => handleLogOut(dispatch, navigate)}
          className="w-full flex items-center space-x-2 p-3 text-sm text-red-300 hover:bg-red-600 hover:text-white rounded-lg transition duration-150 ease-in-out"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}