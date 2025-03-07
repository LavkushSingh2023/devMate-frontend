import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import ConnectionRequests from "./components/ConnectionRequests";
import MyConnections from "./components/MyConnections";
import SettingsPage from './components/SettingsPage';
import HelpSupportPage from './components/HelpSupportPage';
import ProfilePage from "./components/ProfilePage"
import MatchesPage from "./components/MatchesPage";
import MessagesPage from "./components/MessagesPage";

export default function App() {
  const user = useSelector((state) => state.loggedInUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />}>
          {/* Default route (Home) */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="updateProfile" element={<EditProfile user={user} />} />
          <Route path="connectionRequests" element={<ConnectionRequests/>} />
          <Route path="myConnections" element={<MyConnections/>} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help-support" element={<HelpSupportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
