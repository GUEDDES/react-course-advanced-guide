import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const SAMPLE_POSTS = [
  {
    id: '1',
    content: 'Just launched our new feature! 🚀',
    platform: 'twitter',
    scheduledFor: new Date(Date.now() + 3600000).toISOString(),
    status: 'scheduled',
    likes: 0,
    comments: 0
  },
  {
    id: '2',
    content: 'Check out our latest blog post!',
    platform: 'linkedin',
    scheduledFor: new Date(Date.now() + 7200000).toISOString(),
    status: 'scheduled',
    likes: 0,
    comments: 0
  }
];

export const usePostsStore = create((set, get) => ({
  posts: SAMPLE_POSTS,

  addPost: (postData) => set((state) => ({
    posts: [
      ...state.posts,
      {
        id: uuidv4(),
        ...postData,
        status: 'draft',
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
      }
    ]
  })),

  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, ...updates } : post
    )
  })),

  deletePost: (id) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== id)
  })),

  schedulePost: (id, scheduledFor) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id
        ? { ...post, scheduledFor, status: 'scheduled' }
        : post
    )
  })),

  getScheduledPosts: () => {
    return get().posts.filter((post) => post.status === 'scheduled');
  },

  getDraftPosts: () => {
    return get().posts.filter((post) => post.status === 'draft');
  },

  getPublishedPosts: () => {
    return get().posts.filter((post) => post.status === 'published');
  }
}));
