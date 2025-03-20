import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state) => state.loggedInUser);

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
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-gray-800 to-blue-900 mt-12 mb-6 mx-24 px-8 pt-12 pb-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header with Title and Toggle Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Your Posts</h1>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            {showForm ? "Cancel" : "Create New Post"}
          </button>
        </div>

        {/* Conditionally render the PostForm */}
        {showForm && (
          <div className="bg-gray-800 backdrop-blur-sm p-6 rounded-xl border border-purple-600/30">
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
          <div className="text-center py-12 text-purple-300/60">
            <div className="text-4xl mb-4">🚀</div>
            <p className="text-xl font-medium">No posts yet. Start by creating a post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
