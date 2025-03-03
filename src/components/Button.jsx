export default function Button({ children, onClick, className, tooltip }) {
  return (
    <div className="relative group">
      <button
        className={`px-6 py-3 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
      {tooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {tooltip}
        </div>
      )}
    </div>
  );
}