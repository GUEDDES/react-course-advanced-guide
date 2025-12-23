import { usePostsStore } from '../../stores/postsStore';
import { format } from 'date-fns';
import './PostList.css';

function PostList({ filter }) {
  const posts = usePostsStore((state) => state.posts);
  const deletePost = usePostsStore((state) => state.deletePost);

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const platformIcons = {
    twitter: '𝕏',
    instagram: '📷',
    linkedin: '💼'
  };

  if (filteredPosts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts found</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-item">
          <div className="post-header">
            <span className="platform-icon">{platformIcons[post.platform]}</span>
            <span className={`status-badge status-${post.status}`}>
              {post.status}
            </span>
          </div>
          <p className="post-content">{post.content}</p>
          {post.scheduledFor && (
            <p className="post-scheduled">
              📅 Scheduled for {format(new Date(post.scheduledFor), 'MMM dd, yyyy HH:mm')}
            </p>
          )}
          <div className="post-stats">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
          <button 
            onClick={() => deletePost(post.id)} 
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
