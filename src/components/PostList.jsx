import { Clock, MessageSquare, Github, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function PostList({ posts, currentUserId, onDelete }) {
  const [expandedPost, setExpandedPost] = useState(null);

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div 
          key={post.id}
          className="bg-gray-900 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
              />
              <div>
                <h3 className="font-semibold text-purple-300">{post.author.name}</h3>
                <div className="flex items-center space-x-2 text-purple-400 text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
            
            {post.author.id === currentUserId && (
              <button 
                onClick={() => onDelete(post.id)}
                className="text-purple-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {post.content && (
            <p className="text-purple-200 mb-4 whitespace-pre-wrap font-mono">
              {post.content}
            </p>
          )}
          
          {post.image && (
            <div className="mb-4 relative group">
              <img
                src={post.image}
                alt="Code visual"
                className="rounded-lg border border-gray-700 w-full object-contain max-h-96 bg-gray-900"
              />
              <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-gray-800 rounded-lg hover:bg-purple-500 transition-colors">
                  <Github className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4 text-purple-400">
            <button 
              className="flex items-center space-x-1 hover:text-purple-300 transition-colors"
              onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments?.length || 0}</span>
            </button>
          </div>

          {expandedPost === post.id && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-purple-400 text-sm">
                Comment feature coming soon...
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
