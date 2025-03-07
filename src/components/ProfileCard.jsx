import { Star } from "lucide-react";
import SwipeButtons from "./SwipeButtons";

export default function ProfileCard({ profile, calculateMatchPercentage, handleSwipe }) {
  return (
    <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-br from-red-500 to-yellow-500 backdrop-blur-md w-96 text-white">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-32 h-32 mx-auto rounded-full border-4 border-pink-300 shadow-lg"
      />
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-red-600 font-medium">{profile.role}</p>
        <p className="mt-2 text-gray-800">{profile.bio}</p>
        <div className="flex justify-center gap-2 mt-3">
          {profile.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-full shadow">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center mt-3 text-yellow-400">
          <Star className="w-5 h-5" />
          <span className="ml-1 font-bold">{profile.rating}</span>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-900">
            Match: {calculateMatchPercentage(profile)}%
          </span>
        </div>
        <SwipeButtons handleSwipe={handleSwipe} />
      </div>
    </div>
  );
}
