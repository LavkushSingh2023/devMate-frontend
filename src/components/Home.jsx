import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


let updateSearch;
function useSearch(setSearch) {
  updateSearch = setSearch;
}

export function setGlobalSearch(value) {
  if (updateSearch) {
    updateSearch(value);
  }
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [profiles, setProfiles] = useState([]);
  const [filterProfiles, setFilterProfiles] = useState([]);
  const [search, setSearch] = useState("");

  // Capture the setSearch function for global updates
  useSearch(setSearch);

  const showLogin = useSelector((state) => state.login?.showLogin);
  const navigate = useNavigate();

  async function allUserFind() {
    try {
      const allUsers = await axios.get(BASE_URL + "/allUsers", {
        withCredentials: true,
      });
      setProfiles(allUsers.data);
      setFilterProfiles(allUsers.data);
    } catch (error) {
      console.log(
        "Error in fetching allUserData: ",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    if (showLogin) {
      navigate("/login");
    }else{
        allUserFind();
    }
  }, [showLogin]);

  useEffect(() => {
    const filtered = profiles.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterProfiles(filtered);
    setIndex(0);
  }, [search, profiles]);

  const handleSwipe = (direction) => {
    if (direction === "like") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setIndex((prev) => (prev + 1) % filterProfiles.length);
  };

  const calculateMatchPercentage = (profile) => {
    const userSkills = ["React", "Node.js", "GraphQL"];
    let profileSkills = profile.skills;
    if (profileSkills.length && profileSkills[0].includes(",")) {
      profileSkills = profileSkills[0]
        .split(",")
        .map((skill) => skill.trim());
    }
    const commonSkills = profileSkills.filter((skill) =>
      userSkills.includes(skill)
    );
    return ((commonSkills.length / userSkills.length) * 100).toFixed(0);
  };

  return (
    <div className="w-full max-w-md">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-pink-500 h-2.5 rounded-full"
          style={{ width: `${((index + 1) / profiles.length) * 100}%` }}
        ></div>
      </div>
      <AnimatePresence>
        {filterProfiles[index] && (
          <motion.div
            key={filterProfiles[index].id}
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileCard
              profile={filterProfiles[index]}
              calculateMatchPercentage={calculateMatchPercentage}
              handleSwipe={handleSwipe}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
}
