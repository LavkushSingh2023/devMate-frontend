import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import UserCard from "./components/UserCard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile"
import { useDispatch, useSelector } from "react-redux";
import { hideProfile } from "./utils/showProfileSlice";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.loggedInUser)    
  const dispatch = useDispatch()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const backgroundOptions = [
  {
    value: "url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80')",
    label: "Tinder-like Image",
  },
  {
  value: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')",
  label: "White Background",
  },
  {
    value: "url('https://images.unsplash.com/photo-1517842645767-c639042777e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "City Image",
  },
  {
    value: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Sunset Image",
  },
  {
    value: "url('https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Code Editor Image",
  },
  {
    value: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Laptop on Desk",
  },
  {
    value: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Developer Workspace",
  },
  {
    value: "url('https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Abstract Code Background",
  },
  {
    value: "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Coffee and Code",
  },
  {
    value: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Night Sky with Stars",
  },
  {
    value: "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Modern Office Space",
  },
  {
    value: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Developer Team Meeting",
  },
  {
    value: "url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Minimalist Desk Setup",
  },
  {
    value: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Coding on a Macbook",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Electronics and Circuits",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Futuristic Technology",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Neon Glow and Code",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Dark Mode Code Editor",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Abstract Digital Art",
  },
  {
    value: "url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    label: "Minimalist White Desk",
  },
];

const [background, setBackground] = useState(backgroundOptions[0]);

const handleBackgroundChange = (option) => {
  setBackground(option);
};


  return (
    <Router>
        <div className="min-h-screen bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: background.value }} // ✅ Applied dynamic background
            onClick={() => {
                dispatch(hideProfile())
                setIsSidebarOpen(false)
            }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} toggleSidebar={toggleSidebar} backgroundOptions={backgroundOptions}
             onBackgroundChange={handleBackgroundChange}/>

          <Sidebar isSidebarOpen={isSidebarOpen} />

          <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <div className="flex justify-center items-center min-h-screen pt-16">

              <Routes>
                <Route path="/" element={<UserCard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/updateProfile" element={<EditProfile user={user}/>}/>
              </Routes>

            </div>
          </main>

          <Footer />
        </div>
    </Router>
  );
}
