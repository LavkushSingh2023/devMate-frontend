import { MessageSquare, Send, Users } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const dummyConversations = [
    {
      id: 1,
      user: {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Alex Chen",
        online: true,
      },
      lastMessage: "Hey, did you check out the new React docs?",
      timestamp: "2h ago",
      unread: 3,
    },
    {
      id: 2,
      user: {
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Sarah Johnson",
        online: false,
      },
      lastMessage: "Let's schedule the code review",
      timestamp: "5h ago",
      unread: 0,
    },
    // You can add more dummy conversations here...
  ];

  const dummyMessages = [
    {
      id: 1,
      text: "Hey, did you check out the new React docs?",
      sender: "Alex",
      timestamp: "2:45 PM",
    },
    {
      id: 2,
      text: "Not yet, any particular section I should look at?",
      sender: "me",
      timestamp: "2:47 PM",
    },
    // Add more messages as needed...
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations List */}
          <div className="col-span-1 border-r border-cyan-500/20">
            <div className="p-4 border-b border-cyan-500/20">
              <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Conversations
              </h2>
            </div>
            <div className="overflow-y-auto h-[70vh]">
              {dummyConversations.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => setActiveChat(convo.id)}
                  className={`p-4 border-b border-cyan-500/10 cursor-pointer transition-colors 
                    ${activeChat === convo.id ? "bg-cyan-500/10" : "hover:bg-cyan-500/5"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={convo.user.avatar}
                        alt={convo.user.name}
                        className="w-12 h-12 rounded-full border-2 border-cyan-400"
                      />
                      {convo.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-cyan-300">{convo.user.name}</h3>
                      <p className="text-sm text-cyan-400/80 truncate">
                        {convo.lastMessage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-cyan-500">{convo.timestamp}</p>
                      {convo.unread > 0 && (
                        <span className="mt-1 inline-block px-2 py-1 text-xs bg-cyan-600 text-white rounded-full">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2">
            {activeChat ? (
              <div className="flex flex-col h-[70vh]">
                {/* Chat Header */}
                <div className="p-4 border-b border-cyan-500/20 flex items-center">
                  <img
                    src={
                      dummyConversations.find((c) => c.id === activeChat)?.user.avatar
                    }
                    alt={
                      dummyConversations.find((c) => c.id === activeChat)?.user.name
                    }
                    className="w-10 h-10 rounded-full border-2 border-cyan-400 mr-3"
                  />
                  <h3 className="text-lg font-semibold text-cyan-300">
                    {
                      dummyConversations.find((c) => c.id === activeChat)?.user.name
                    }
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {dummyMessages.map((message) => (
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
                    />
                    <button className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
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
