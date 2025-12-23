import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * E-commerce cart store with Zustand
 * Features:
 * - Add/remove items
 * - Quantity management
 * - Total calculation
 * - Persistence in localStorage
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      
      // Computed
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      
      get itemCount() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      // Actions
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity: 1 }]
        };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(item => item.id !== productId)
          };
        }
        
        return {
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        };
      }),

      clearCart: () => set({ items: [] }),

      // Utilities
      hasItem: (productId) => {
        return get().items.some(item => item.id === productId);
      },

      getItemQuantity: (productId) => {
        const item = get().items.find(item => item.id === productId);
        return item?.quantity || 0;
      }
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
);
