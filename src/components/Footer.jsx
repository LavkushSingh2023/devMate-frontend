import { ArrowUp, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="text-center text-sm text-gray-400">
          © 2023 devMate. All rights reserved.
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </footer>
  );
}