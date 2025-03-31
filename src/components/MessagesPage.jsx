import { MessageSquare, Send, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constants"; // e.g. "http://localhost:3000" for dev

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connections, setConnections] = useState([]);
  const socketRef = useRef();

  async function findConnections() {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      let fetchedConnections = [];
      for (let item of response.data.data) {
        const id = typeof item === "object" && item._id ? item._id : item;
        const res = await axios.get(`${BASE_URL}/allRequests/${id}`, {
          withCredentials: true,
        });
        fetchedConnections.push(res.data);
      }
      setConnections(fetchedConnections);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  }

  useEffect(() => {
    findConnections();
  }, []);

  // Connect to Socket.IO server using BASE_URL.
  useEffect(() => {
    socketRef.current = io(BASE_URL);
    socketRef.current.on("message", (message) => {
      // Only add messages relevant to the active chat.
      if (message.chatId === activeChat) {
        setMessages((prev) => {
          if (prev.find((m) => m.id === message.id)) return prev;
          return [...prev, message];
        });
      }
    });
    return () => socketRef.current.disconnect();
  }, [activeChat]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    const messageData = {
      id: `${Date.now()}-${Math.random()}`, // Composite unique id.
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString(),
      chatId: activeChat,
    };
    socketRef.current.emit("message", messageData);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-800 p-6 mt-6 rounded-xl">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-900 to-purple-900 backdrop-blur-xl rounded-xl border border-indigo-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations List */}
          <div className="col-span-1 border-r border-cyan-500/20">
            <div className="p-4 border-b border-cyan-500/20">
              <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                <Users className="w-6 h-6" /> Conversations
              </h2>
            </div>
            <div className="overflow-y-auto h-[70vh]">
              {connections.length > 0 ? (
                connections.map((convo) => (
                  <div
                    key={convo._id}
                    onClick={() => {
                      setActiveChat(convo._id);
                      setMessages([]); // Reset messages on chat switch.
                    }}
                    className={`p-4 border-b border-cyan-500/10 cursor-pointer transition-colors ${
                      activeChat === convo._id
                        ? "bg-cyan-500/10"
                        : "hover:bg-cyan-500/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Fixed-size container for avatar */}
                      <div className="relative flex-shrink-0 w-12 h-12 bg-gray-600 rounded-full">
                        {convo.avatar ? (
                            <img
                            src={convo.avatar}
                            alt={convo.name}
                            className="block w-full h-full rounded-full border-2 border-cyan-400 object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-cyan-900 flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-cyan-400" />
                            </div>
                        )}
                        </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-cyan-300">
                          {convo.name}
                        </h3>
                        <p className="text-sm text-cyan-400/80 truncate">
                          {convo.bio || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-300 p-4">No connections found.</p>
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2">
            {activeChat ? (
              <div className="flex flex-col h-[70vh]">
                {/* Chat Header */}
                <div className="p-4 border-b border-cyan-500/20 flex items-center">
                  {connections
                    .filter((c) => c._id === activeChat)
                    .map((convo) => (
                      <div key={convo._id} className="flex items-center">
                        <div className="relative w-10 h-10">
                          <img
                            src={convo.avatar}
                            alt={convo.name}
                            className="w-full h-full rounded-full border-2 border-cyan-400 object-cover mr-3"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-cyan-300">
                          {convo.name}
                        </h3>
                      </div>
                    ))}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 mx-12">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                          message.sender === "me"
                            ? "bg-cyan-600 text-white"
                            : "bg-black/40 text-cyan-200"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-cyan-500/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-200 focus:outline-none focus:border-cyan-400"
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-[70vh] items-center justify-center text-cyan-400/60">
                <MessageSquare className="w-12 h-12 mb-4" />
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
