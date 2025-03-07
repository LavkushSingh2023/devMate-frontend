import { X, MessageSquare, Heart } from "lucide-react";

export default function SwipeButtons({ handleSwipe }) {
  return (
    <div className="flex justify-around mt-6">
      {/* Dislike Button */}
      <div className="relative group">
        <button
          onClick={() => handleSwipe("dislike")}
          className="px-6 py-3 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Dislike
        </div>
      </div>

      {/* Chat Button */}
      <div className="relative group">
        <button
          onClick={() => console.log("Chat initiated")}
          className="px-6 py-3 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Chat
        </div>
      </div>

      {/* Like Button */}
      <div className="relative group">
        <button
          onClick={() => handleSwipe("like")}
          className="px-6 py-3 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-green-500 to-teal-500 animate-pulse"
        >
          <Heart className="w-6 h-6" />
        </button>
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Like
        </div>
      </div>
    </div>
  );
}
