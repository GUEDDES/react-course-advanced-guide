import { create } from 'zustand';

export const useMetricsStore = create((set) => ({
  isConnected: false,
  metrics: {
    twitter: { followers: 1234, engagement: 3.5, posts: 42 },
    instagram: { followers: 5678, engagement: 5.2, posts: 38 },
    linkedin: { followers: 892, engagement: 2.8, posts: 15 }
  },

  setConnected: (connected) => set({ isConnected: connected }),

  updateMetrics: (platform, data) => set((state) => ({
    metrics: {
      ...state.metrics,
      [platform]: { ...state.metrics[platform], ...data }
    }
  })),

  getTotalFollowers: (state) => {
    return Object.values(state.metrics).reduce(
      (sum, platform) => sum + platform.followers,
      0
    );
  },

  getAverageEngagement: (state) => {
    const platforms = Object.values(state.metrics);
    const total = platforms.reduce((sum, p) => sum + p.engagement, 0);
    return (total / platforms.length).toFixed(1);
  }
}));
