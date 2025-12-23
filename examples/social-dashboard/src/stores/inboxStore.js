import { create } from 'zustand';

const SAMPLE_MESSAGES = [
  {
    id: '1',
    platform: 'twitter',
    from: 'John Doe',
    message: 'Great post! Really helpful.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '2',
    platform: 'instagram',
    from: 'Jane Smith',
    message: 'Can you share more details?',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false
  },
  {
    id: '3',
    platform: 'linkedin',
    from: 'Mike Johnson',
    message: 'Interested in collaborating!',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    read: true
  }
];

export const useInboxStore = create((set, get) => ({
  messages: SAMPLE_MESSAGES,

  markAsRead: (id) => set((state) => ({
    messages: state.messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    )
  })),

  deleteMessage: (id) => set((state) => ({
    messages: state.messages.filter((msg) => msg.id !== id)
  })),

  getUnreadCount: () => {
    return get().messages.filter((msg) => !msg.read).length;
  },

  getMessagesByPlatform: (platform) => {
    return get().messages.filter((msg) => msg.platform === platform);
  }
}));
