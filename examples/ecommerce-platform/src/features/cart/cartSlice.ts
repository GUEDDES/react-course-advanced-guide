import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discount: number;
}

const initialState: CartState = {
  items: [],
  promoCode: null,
  discount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        if (existingItem.quantity < existingItem.maxStock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      
      if (item) {
        const newQuantity = Math.min(action.payload.quantity, item.maxStock);
        if (newQuantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        } else {
          item.quantity = newQuantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discount = 0;
    },

    applyPromoCode: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.promoCode = action.payload.code;
      state.discount = action.payload.discount;
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.discount = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * state.cart.discount) / 100;
  return {
    subtotal,
    discount: discountAmount,
    total: subtotal - discountAmount
  };
};
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
