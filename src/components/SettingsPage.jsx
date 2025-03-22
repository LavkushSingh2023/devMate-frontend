import { Settings, Lock, Bell, Shield, EyeOff } from "lucide-react";

export default function SettingsPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6 mt-12 rounded-2xl">
      <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-cyan-300">Account Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="flex items-center space-x-2 text-lg font-semibold text-cyan-300 mb-4">
              <EyeOff className="w-5 h-5" />
              <span>Privacy Settings</span>
            </h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 text-cyan-200">
                <input type="checkbox" className="form-checkbox text-cyan-500" />
                <span>Make my profile private</span>
              </label>
              <label className="flex items-center space-x-3 text-cyan-200">
                <input type="checkbox" className="form-checkbox text-cyan-500" />
                <span>Hide my online status</span>
              </label>
              <label className="flex items-center space-x-3 text-cyan-200">
                <input type="checkbox" className="form-checkbox text-cyan-500" />
                <span>Disable search by email</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="flex items-center space-x-2 text-lg font-semibold text-cyan-300 mb-4">
              <Lock className="w-5 h-5" /> 
              <span>Security</span>
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 bg-black/30 hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-200 transition duration-200">
                Change Password
              </button>
              <button className="w-full text-left p-3 bg-black/30 hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-200 transition duration-200">
                Two-Factor Authentication
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="flex items-center space-x-2 text-lg font-semibold text-cyan-300 mb-4">
              <Bell className="w-5 h-5" /> 
              <span>Notifications</span>
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 text-cyan-200">
                <input type="checkbox" className="form-checkbox text-cyan-500" />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center space-x-3 text-cyan-200">
                <input type="checkbox" className="form-checkbox text-cyan-500" />
                <span>Push Notifications</span>
              </label>
            </div>
          </div>

          {/* Connected Apps */}
          <div className="bg-black/20 p-6 rounded-xl border border-cyan-500/20">
            <h2 className="flex items-center space-x-2 text-lg font-semibold text-cyan-300 mb-4">
              <Shield className="w-5 h-5" />
              <span>Connected Apps</span>
            </h2>
            <div className="space-y-4">
              <button className="w-full text-left p-3 bg-black/30 hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-200 transition duration-200">
                Manage GitHub Connection
              </button>
              <button className="w-full text-left p-3 bg-black/30 hover:bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-200 transition duration-200">
                Disconnect Google Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
