import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Star, MessageSquare } from "lucide-react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Card from "./Card";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

let updateSearch;
function useSearch(setSearch){
    updateSearch = setSearch
 }

 export function setGlobalSearch(value){                               // mehnat
    if(updateSearch){
        updateSearch(value)
    }
 }

export default function UserCard() {
  const [index, setIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [profiles, setProfiles] = useState([])
  const [filterProfiles, setFilterProfiles] = useState([])

  const [search, setSearch] = useState("")
  useSearch(setSearch)

  const showLogin = useSelector((state) => state.login?.showLogin)
  const navigate = useNavigate()

  useEffect(() => {
    if(showLogin){
        navigate("/login")
    }  
  },[showLogin, navigate])

  async function allUserFind(){
    try{
        const allUsers = await axios.get(BASE_URL + "/allUsers",
            {
                withCredentials: true,
                // params: { page: 1, limit: 10 } 
            }
        )
        setProfiles(allUsers.data)
        setFilterProfiles(allUsers.data)
    }catch(error){
        console.log("Error in fetching allUserData: ", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    allUserFind()
  }, [showLogin])

  useEffect(() => {
    let filterUser = profiles.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    setFilterProfiles(filterUser)
  }, [search])

  const handleSwipe = (direction) => {
    (direction, profiles[index].name);
    if (direction === "like") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setIndex((prev) => (prev + 1) % profiles.length);
  };

  const calculateMatchPercentage = () => {
    const userSkills = ["React", "Node.js", "GraphQL"]; // Example user skills
    const profileSkills = profiles[index].skills;
    const commonSkills = profileSkills.filter((skill) => userSkills.includes(skill));
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
                <Card>
                  <img
                    src={filterProfiles[index].avatar}
                    alt={filterProfiles[index].name}
                    className="w-32 h-32 mx-auto rounded-full border-4 border-pink-300 shadow-lg"
                  />
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{filterProfiles[index].name}</h2>
                    <p className="text-red-600 font-medium">{filterProfiles[index].role}</p>
                    <p className="mt-2 text-gray-800">{filterProfiles[index].bio}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      {filterProfiles[index].skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-full shadow">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center items-center mt-3 text-yellow-400">
                      <Star className="w-5 h-5" />
                      <span className="ml-1 font-bold">{filterProfiles[index].rating}</span>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-gray-900">
                        Match: {calculateMatchPercentage()}%
                      </span>
                    </div>
                    <div className="flex justify-around mt-6">
                      <Button
                        className="bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                        onClick={() => handleSwipe("dislike")}
                        tooltip="Dislike"
                      >
                        <X className="w-6 h-6" />
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-cyan-500"
                        onClick={() => console.log("Chat initiated")}
                        tooltip="Chat"
                      >
                        <MessageSquare className="w-6 h-6" />
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-green-500 to-teal-500 animate-pulse"
                        onClick={() => handleSwipe("like")}
                        tooltip="Like"
                      >
                        <Heart className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
}
