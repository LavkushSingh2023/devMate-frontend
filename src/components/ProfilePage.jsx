import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const user = useSelector(state => state.loggedInUser);

  // Simulate fetching posts (replace with actual API call)
  useEffect(() => {
    const fetchPosts = async () => {
      // Simulated delay
      setTimeout(() => {
        setPosts([]); // You can set some sample posts here if needed.
      }, 1000);
    };
    fetchPosts();
  }, [user]);

  const handlePostCreated = (newPost) => {
    // Prepend the new post and hide the form after creation.
    setPosts([{ ...newPost, id: Date.now(), author: user }, ...posts]);
    setShowForm(false);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header with Title and Toggle Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-cyan-300">Your Posts</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition"
          >
            {showForm ? "Cancel" : "Create New Post"}
          </button>
        </div>

        {/* Conditionally render the PostForm */}
        {showForm && (
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20">
            <PostForm onPostCreated={handlePostCreated} />
          </div>
        )}

        {/* Posts List */}
        {posts.length > 0 ? (
          <PostList 
            posts={posts} 
            currentUserId={user?.id} 
            onDelete={handleDeletePost}
          />
        ) : (
          <div className="text-center py-12 text-cyan-400/60">
            <div className="text-4xl mb-4">🚀</div>
            <p className="text-xl font-medium">No posts yet. Start by creating a post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
