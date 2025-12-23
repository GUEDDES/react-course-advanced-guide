import { useState } from 'react';
import { usePostsStore } from '../../stores/postsStore';
import toast from 'react-hot-toast';
import './PostForm.css';

function PostForm({ onClose }) {
  const addPost = usePostsStore((state) => state.addPost);
  const [formData, setFormData] = useState({
    content: '',
    platform: 'twitter',
    scheduledFor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast.error('Please enter post content');
      return;
    }

    addPost(formData);
    toast.success('Post created successfully!');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Create New Post</h2>

      <div className="form-group">
        <label htmlFor="platform">Platform</label>
        <select
          id="platform"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
        >
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="What's on your mind?"
          rows="5"
          required
        />
        <span className="char-count">{formData.content.length} characters</span>
      </div>

      <div className="form-group">
        <label htmlFor="scheduledFor">Schedule For (optional)</label>
        <input
          type="datetime-local"
          id="scheduledFor"
          name="scheduledFor"
          value={formData.scheduledFor}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
