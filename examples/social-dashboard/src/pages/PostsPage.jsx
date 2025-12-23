import { useState } from 'react';
import { usePostsStore } from '../stores/postsStore';
import PostList from '../components/posts/PostList';
import PostForm from '../components/posts/PostForm';
import './PostsPage.css';

function PostsPage() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  return (
    <div className="posts-page">
      <div className="page-header">
        <h1>Posts</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          + Schedule Post
        </button>
      </div>

      <div className="posts-filters">
        <button 
          onClick={() => setFilter('all')} 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('scheduled')} 
          className={`filter-btn ${filter === 'scheduled' ? 'active' : ''}`}
        >
          Scheduled
        </button>
        <button 
          onClick={() => setFilter('draft')} 
          className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
        >
          Drafts
        </button>
      </div>

      <PostList filter={filter} />

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PostForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsPage;
