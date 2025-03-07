import { Users, Search, Code, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const dummyMatches = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Alex Chen",
      title: "Full Stack Developer",
      techStack: ["React", "Node.js", "AWS"],
      status: "new"
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Sarah Johnson",
      title: "Mobile Developer",
      techStack: ["Swift", "Kotlin", "Firebase"],
      status: "connected"
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Raj Patel",
      title: "DevOps Engineer",
      techStack: ["Docker", "Kubernetes", "Terraform"],
      status: "pending"
    }
  ];

  const filteredMatches = dummyMatches.filter(match =>
    match.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === "all" || match.status === activeFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-cyan-300 flex items-center gap-2">
            <Users className="w-8 h-8" />
            Developer Matches
          </h1>
        </div>

        {/* Controls */}
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-200 focus:outline-none focus:border-cyan-400"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-cyan-400" />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "connected", "pending"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeFilter === filter
                    ? "bg-cyan-600 text-cyan-100"
                    : "bg-black/40 text-cyan-400 hover:bg-cyan-500/20"
                } transition-colors`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div key={match.id} className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={match.avatar}
                  alt={match.name}
                  className="w-14 h-14 rounded-full border-2 border-cyan-400 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-cyan-300">{match.name}</h3>
                  <p className="text-cyan-400/80 text-sm">{match.title}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {match.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                  {match.status === "connected" ? "Message" : "Connect"}
                </button>
                {match.status === "pending" && (
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12 text-cyan-400/60">
            <Code className="w-12 h-12 mx-auto mb-4" />
            <p>No matches found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}