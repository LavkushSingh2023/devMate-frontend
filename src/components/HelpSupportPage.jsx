import { HelpCircle, Mail, AlertTriangle, BookOpen } from "lucide-react";
import { useState } from "react";
import axios from "axios"
import { BASE_URL } from "../utils/constants";

export default function HelpSupportPage() {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(`${BASE_URL}/send-email`, formData);
      setStatus("Message sent!");
      setFormData({ email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen w-2/5 max-w-screen-xl bg-gradient-to-br from-gray-900 to-blue-900 p-6 mt-12 rounded-2xl">
      <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <HelpCircle className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-cyan-300">Help & Support</h1>
        </div>

        <div className="space-y-6">
          {/* FAQ Section */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="text-lg font-semibold text-cyan-300 mb-4">FAQs</h2>
            <div className="space-y-4">
              <div className="p-3 bg-black/30 rounded-lg border border-cyan-500/20">
                <h3 className="font-medium text-cyan-200">How do I reset my password?</h3>
                <p className="text-sm text-cyan-400/80 mt-1">
                  Go to Settings → Security → Change Password
                </p>
              </div>
              <div className="p-3 bg-black/30 rounded-lg border border-cyan-500/20">
                <h3 className="font-medium text-cyan-200">How to report a user?</h3>
                <p className="text-sm text-cyan-400/80 mt-1">
                  Visit the user's profile and click the report button
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Contact Support</span>
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-cyan-200 text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-200 focus:outline-none focus:border-cyan-400"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-cyan-200 text-sm mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-200 focus:outline-none focus:border-cyan-400"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-cyan-200 text-sm mb-2">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-200 focus:outline-none focus:border-cyan-400"
                  placeholder="Describe your issue"
                ></textarea>
              </div>
              <button type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition duration-200 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Documentation */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Documentation</span>
            </h2>
            <div className="space-y-2 text-cyan-400/80">
              <p>• Getting Started Guide</p>
              <p>• API Documentation</p>
              <p>• Community Guidelines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}