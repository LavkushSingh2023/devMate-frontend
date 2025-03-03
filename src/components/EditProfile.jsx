import { useState } from "react";
import axios from "axios";
import { Camera, Save } from "lucide-react";
import { useDispatch} from "react-redux";
import { toggleProfile } from "../utils/showProfileSlice";
import { BASE_URL } from "../utils/constants";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    role: user?.role || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
    skills: user?.skills || "",
    rating: user?.rating || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(BASE_URL + "/profile/edit", formData, { withCredentials: true });
      dispatch(toggleProfile())
    } catch (error) {
      console.log("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl mt-12">
      <div className="bg-black shadow-2xl rounded-xl m-8 p-8 w-full max-w-3xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Update Profile</h2>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={formData.avatar || "https://via.placeholder.com/100"}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-transform duration-300 group-hover:scale-110">
              <Camera className="w-5 h-5" />
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-400 text-sm mt-2">Click to update avatar URL</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Role", name: "role", type: "text" },
            { label: "Bio", name: "bio", type: "textarea" },
            { label: "Skills", name: "skills", type: "text", placeholder: "e.g., React, Node.js" },
            { label: "Rating", name: "rating", type: "number", min: 0, max: 5, step: 0.1 }
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label className="block text-white font-semibold">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  {...rest}
                ></textarea>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                  {...rest}
                />
              )}
            </div>
          ))}
        </form>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
