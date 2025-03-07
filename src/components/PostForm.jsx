import { useState } from 'react';
import { PenSquare, Image, X } from 'lucide-react';

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add your API call here
      const newPost = {
        content,
        image: previewImage,
        author: { /* Add user data */ },
        createdAt: new Date().toISOString()
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
    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your latest code breakthrough..."
          className="w-full bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-200 focus:outline-none focus:border-cyan-400 resize-none placeholder-cyan-500/60"
          rows="3"
          disabled={isSubmitting}
        />
        
        {previewImage && (
          <div className="relative group">
            <img
              src={previewImage}
              alt="Preview"
              className="rounded-lg border border-cyan-500/20 max-h-64 object-cover w-full"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-full hover:bg-red-500/80 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isSubmitting}
            />
            <Image className="w-5 h-5" />
            <span className="text-sm">Attach Code Screenshot</span>
          </label>
          
          <button
            type="submit"
            disabled={isSubmitting || (!content && !previewImage)}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <PenSquare className="w-5 h-5" />
            <span>{isSubmitting ? 'Posting...' : 'Publish'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}