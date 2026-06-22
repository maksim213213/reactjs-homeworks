import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

const STORAGE_KEY = 'cart_state';

const loadFromStorage = (): CartState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { items: [], total: 0 };
    return JSON.parse(saved) as CartState;
  } catch {
    return { items: [], total: 0 };
  }
};

const persist = (state: CartState) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ items: state.items, total: state.total })
  );
};

const recalcTotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadFromStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const { id, meal, price, img, quantity } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, meal, price, img, quantity });
      }
      state.total = recalcTotal(state.items);
      persist(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((it) => it.id !== action.payload);
      state.total = recalcTotal(state.items);
      persist(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      persist(state);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
