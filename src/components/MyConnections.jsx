import { useEffect, useState } from "react";
import axios from "axios";
import { User, ChevronRight, XCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

export default function MyConnections() {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  async function findConnections() {
    const response = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
    let fetchedConnections = [];
    for (let item of response.data.data) {
      const id = typeof item === "object" && item._id ? item._id : item;
      const res = await axios.get(`${BASE_URL}/allRequests/${id}`, { withCredentials: true });
      fetchedConnections.push(res.data);
    }
    setConnections(fetchedConnections);
  }

  useEffect(() => {
    findConnections();
  }, []);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 pt-4 pb-4 p-12">
      <div className="mx-auto my-8 max-w-6xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <header className="p-8 bg-gradient-to-r from-purple-500 to-blue-500 border-b border-white/10 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/5 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Your Network</h1>
              <p className="text-sm text-white/80">
                {connections.length} professional connection{connections.length !== 1 && "s"}
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/")} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
            <XCircle className="w-6 h-6 text-cyan-300" />
          </button>
        </header>

        {/* Connections Grid */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block p-6 bg-white/20 rounded-2xl">
                <div className="text-6xl mb-4">🌌</div>
                <h3 className="text-xl font-semibold text-white">No connections found</h3>
                <button
                  onClick={findConnections}
                  className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-full transition-all text-white"
                >
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            connections.map((conn) => (
              <div
                key={conn._id}
                className="group relative p-6 bg-gray-200 backdrop-blur-sm rounded-2xl border border-purple-600 hover:border-yellow-500 transition-all hover:shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={conn.avatar}
                    alt={conn.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900 group-hover:text-yellow-500 transition-colors">
                      {conn.name}
                    </h3>
                    <p className="text-sm text-purple-700">{conn.role}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-sm text-purple-800">View Profile</span>
                    <ChevronRight className="w-5 h-5 text-purple-800" />
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
