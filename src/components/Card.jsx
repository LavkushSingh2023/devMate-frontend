export default function Card({ children }) {
  return (
    <div className="p-6 border rounded-lg shadow-xl bg-gradient-to-br from-red-500 to-yellow-500 backdrop-blur-md w-96 text-white">
      {children}
    </div>
  );
}