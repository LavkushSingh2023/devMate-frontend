import { Users, Code } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {setSearch} from "../utils/searchSlice"

export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState([]);
   const navigate = useNavigate();
  const user = useSelector((state) => state.loggedInUser)
  const userSkills = user?.skills?.flatMap(skill => skill.split(",").map(s => s.trim()))
  const dispatch = useDispatch()

  async function findAllMatches() {
    const res = await axios.get(`${BASE_URL}/allUsers`, { withCredentials: true });
    const users = res.data.filter((value) =>
      value.skills[0]
        .split(",")
        .map((skill) => skill.trim())
        .some((skill) => userSkills?.includes(skill))
    );
    setAllMatches(users);
  }

  useEffect(() => {
    findAllMatches();
  }, []);

  const calculateMatchPercentage = (profile) => {
    let profileSkills = [];
    if (profile.skills && profile.skills.length) {
      profileSkills = profile.skills.flatMap((skillStr) =>
        typeof skillStr === "string" ? skillStr.split(",").map((s) => s.trim()) : []
      );
    }
    const commonSkills = profileSkills.filter((skill) =>
      userSkills.some((filterSkill) => filterSkill.toLowerCase() === skill.toLowerCase())
    );
    return ((commonSkills.length / userSkills.length) * 100).toFixed(0);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Users className="w-10 h-10 text-purple-300" />
            Developer Matches
          </h1>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allMatches.map((match) => (
            <div
              key={match._id}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-transparent hover:border-purple-500 transition-all"
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={match.avatar}
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-white">{match.name}</h3>
                  <p className="text-gray-400">{match.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {match.skills[0]
                  .split(",")
                  .map((tech) => tech.trim())
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              {/* Match Percentage */}
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                  Match {calculateMatchPercentage(match)}%
                </span>
              </div>

              {/* View Profile Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    navigate(`/`)
                    dispatch(setSearch(match.name))
                    }}
                  className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {allMatches.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Code className="w-12 h-12 mx-auto mb-4" />
            <p>No matches found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
