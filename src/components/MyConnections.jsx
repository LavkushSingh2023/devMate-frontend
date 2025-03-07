import { useEffect, useState } from "react";
import axios from "axios";
import { User, Search, ChevronRight, Sparkles, Plus, Link, Sliders } from "lucide-react";

export default function MyConnections() {
  const [connections, setConnections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Dummy data with more details
  const dummyConnections = [
    {
      id: "1",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Aurélie Dubois",
      title: "Lead UI Engineer",
      company: "PixelPerfect Inc.",
      mutual: 12,
      strength: 85,
      status: "recent"
    },
    {
      id: "2",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Marco Vitali",
      title: "Creative Director",
      company: "DesignHub",
      mutual: 8,
      strength: 65,
      status: "frequent"
    },
    {
      id: "3",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Sakura Tanaka",
      title: "AR/VR Specialist",
      company: "FutureVision",
      mutual: 15,
      strength: 92,
      status: "close"
    },
  ];

  useEffect(() => {
    setConnections(dummyConnections);
  }, []);

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" ? true : conn.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        
        {/* Floating Header */}
        <div className="p-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
                  Your Network
                </h1>
                <p className="text-sm text-purple-200/80 mt-1">
                  {connections.length} professional connections
                </p>
              </div>
            </div>
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-sm transition-all">
              <Sparkles className="w-6 h-6 text-purple-300" />
            </button>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-purple-300/80" />
            </div>
            <button className="ml-4 p-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl backdrop-blur-sm transition-all">
              <Plus className="w-6 h-6 text-purple-300" />
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex space-x-3">
            {["all", "recent", "frequent", "close"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? "bg-purple-500/30 text-purple-100 border border-purple-500/50"
                    : "bg-white/5 text-purple-200/80 hover:bg-white/10"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Connections Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-6xl mb-4">🌌</div>
                <h3 className="text-xl font-semibold text-purple-200">
                  No connections found
                </h3>
                <p className="text-purple-200/60 mt-2">
                  Try adjusting your search or filters
                </p>
                <button className="mt-4 px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full backdrop-blur-sm transition-all">
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            filteredConnections.map((conn) => (
              <div 
                key={conn.id}
                className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all hover:shadow-xl"
              >
                {/* Connection Strength Meter */}
                <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-xs font-bold text-purple-300">
                  <svg className="absolute inset-0" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      className="stroke-current text-white/5" 
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      className="stroke-current text-purple-400/80" 
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${conn.strength * 2.83} 1000`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {conn.strength}%
                </div>

                <div className="flex items-start space-x-4">
                  <img
                    src={conn.avatar}
                    alt={conn.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-100 group-hover:text-purple-300 transition-colors">
                      {conn.name}
                    </h3>
                    <p className="text-sm text-purple-200/80">{conn.title}</p>
                    <p className="text-xs text-purple-300/60 mt-1">
                      {conn.company}
                    </p>
                    <div className="flex items-center mt-3 space-x-2">
                      <Link className="w-4 h-4 text-purple-400/80" />
                      <span className="text-xs text-purple-300/60">
                        {conn.mutual} mutual connections
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <button className="w-full flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-sm text-purple-300/80">View Profile</span>
                    <ChevronRight className="w-5 h-5 text-purple-400/80" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}