import { useEffect, useState } from "react";
import axios from "axios";
import { Check, XCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function ConnectionRequests({ onClose }) {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate()

  const handleRequest = async (review) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/review/${review}`, {}, { withCredentials: true })
      console.log(res.data)
    } catch (error) {
      console.error("Error in reviewing request:", error.message);
    }
  };

  async function fetchConnectionRequests() {
    const response = await axios.get(`${BASE_URL}/user/requests/received`, {withCredentials: true})
    let allRequests = []
    for(const req of response.data.connectionRequests){
        const res = await axios.get(`${BASE_URL}/allRequests/${req.fromUserId._id}`, {withCredentials: true})
        allRequests.push(res.data)
    }
    setRequests(allRequests)
  }

  useEffect(() => {
    fetchConnectionRequests()
  }, []);

   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-lg">
      <div className="w-full max-w-md transform transition-all duration-300 ease-out">
        <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 overflow-hidden neon-glow">
          {/* Vibrant Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-pink-500 border-b border-cyan-500/30">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
                Connection Requests
                <span className="ml-2 text-cyan-200/80">({requests.length})</span>
              </h2>
              <button
                onClick={() => navigate("/")}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6 text-cyan-300" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {requests.length === 0 ? (
              <div className="py-8 text-center">
                <div className="inline-block p-4 bg-black/20 rounded-full backdrop-blur-sm">
                  <span className="text-4xl text-cyan-400 animate-pulse">🚀</span>
                </div>
                <p className="mt-4 text-cyan-300 font-medium">
                  No pending requests
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {requests.map((req) => (
                  <li
                    key={req._id}
                    className="group flex items-center p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-cyan-400 transition-all duration-200 hover:shadow-lg neon-glow"
                  >
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30 shadow-lg"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-cyan-300">
                        {req.name}
                      </h3>
                      <p className="text-sm text-cyan-400/80">{req.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRequest('accepted')}
                        className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleRequest('rejected')}
                        className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        <XCircle className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <style>{`
        .neon-glow {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
          transition: box-shadow 0.3s ease;
        }
        .neon-glow:hover {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </div>
  );
}