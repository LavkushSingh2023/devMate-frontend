import { PenSquare, Image, X } from 'lucide-react';
import { useState } from 'react';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPost = {
        content,
        image: previewImage,
        author: { /* Add user data */ },
        createdAt: new Date().toISOString(),
      };

      onPostCreated(newPost);
      setContent('');
      setPreviewImage(null);
    } catch (error) {
      console.error('Post creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your breakthrough code..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-500"
          rows="3"
          disabled={isSubmitting}
        />

        {previewImage && (
          <div className="relative group">
            <img
              src={previewImage}
              alt="Preview"
              className="rounded-lg border border-gray-600 max-h-64 object-cover w-full"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4 text-gray-200" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isSubmitting}
            />
            <Image className="w-5 h-5" />
            <span className="text-sm">Attach Screenshot</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting || (!content && !previewImage)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <PenSquare className="w-5 h-5" />
            <span>{isSubmitting ? 'Posting...' : 'Publish'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
