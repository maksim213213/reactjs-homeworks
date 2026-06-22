import { describe, it, expect, beforeEach, vi } from 'vitest';
import cartReducer, {
  addItem,
  removeItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
  STORAGE_KEY,
} from './cartSlice';
import type { CartItem } from '../types';
import type { RootState } from './index';

const burger: CartItem = {
  id: '1',
  meal: 'Burger',
  price: 10,
  img: 'burger.png',
  quantity: 1,
};

const pizza: CartItem = {
  id: '2',
  meal: 'Pizza',
  price: 8.5,
  img: 'pizza.png',
  quantity: 2,
};

const emptyState = () => ({ items: [], total: 0 });

describe('cartSlice reducer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial empty state', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state.items).toEqual([]);
    expect(state.total).toBe(0);
  });

  describe('addItem', () => {
    it('adds a new item and computes the total', () => {
      const state = cartReducer(emptyState(), addItem(burger));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(burger);
      expect(state.total).toBe(10);
    });

    it('increments quantity when the same item is added again', () => {
      const first = cartReducer(emptyState(), addItem(burger));
      const second = cartReducer(first, addItem({ ...burger, quantity: 3 }));
      expect(second.items).toHaveLength(1);
      expect(second.items[0].quantity).toBe(4);
      expect(second.total).toBe(40);
    });

    it('keeps distinct items separate and sums their totals', () => {
      const first = cartReducer(emptyState(), addItem(burger));
      const second = cartReducer(first, addItem(pizza));
      expect(second.items).toHaveLength(2);
      // 10 * 1 + 8.5 * 2 = 27
      expect(second.total).toBe(27);
    });

    it('persists the cart to localStorage', () => {
      cartReducer(emptyState(), addItem(burger));
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
      expect(saved.items).toHaveLength(1);
      expect(saved.total).toBe(10);
    });

    it('keeps the original price when re-adding the same id with a new price', () => {
      const first = cartReducer(emptyState(), addItem(burger));
      const second = cartReducer(
        first,
        addItem({ ...burger, price: 99, quantity: 1 })
      );
      expect(second.items).toHaveLength(1);
      // Merge only bumps quantity; the original price is preserved.
      expect(second.items[0].price).toBe(10);
      expect(second.items[0].quantity).toBe(2);
      expect(second.total).toBe(20);
    });
  });

  describe('removeItem', () => {
    it('removes the matching item and recomputes the total', () => {
      const withTwo = cartReducer(
        cartReducer(emptyState(), addItem(burger)),
        addItem(pizza)
      );
      const state = cartReducer(withTwo, removeItem(burger.id));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(pizza.id);
      expect(state.total).toBe(17);
    });

    it('is a no-op when the id is not in the cart', () => {
      const withOne = cartReducer(emptyState(), addItem(burger));
      const state = cartReducer(withOne, removeItem('does-not-exist'));
      expect(state.items).toHaveLength(1);
      expect(state.total).toBe(10);
    });

    it('persists the updated cart to localStorage', () => {
      const withOne = cartReducer(emptyState(), addItem(burger));
      cartReducer(withOne, removeItem(burger.id));
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
      expect(saved.items).toHaveLength(0);
      expect(saved.total).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('empties the cart and resets the total', () => {
      const withItems = cartReducer(
        cartReducer(emptyState(), addItem(burger)),
        addItem(pizza)
      );
      const state = cartReducer(withItems, clearCart());
      expect(state.items).toEqual([]);
      expect(state.total).toBe(0);
    });

    it('persists the empty cart to localStorage', () => {
      const withOne = cartReducer(emptyState(), addItem(burger));
      cartReducer(withOne, clearCart());
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
      expect(saved.items).toEqual([]);
      expect(saved.total).toBe(0);
    });
  });

  describe('loadFromStorage (initial state)', () => {
    it('hydrates the cart from previously persisted state on import', async () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: [burger], total: 10 })
      );
      vi.resetModules();
      const mod = await import('./cartSlice');
      const state = mod.default(undefined, { type: '@@INIT' });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(burger.id);
      expect(state.total).toBe(10);
    });

    it('falls back to an empty cart when the stored JSON is corrupt', async () => {
      localStorage.setItem(STORAGE_KEY, '{not valid json');
      vi.resetModules();
      const mod = await import('./cartSlice');
      const state = mod.default(undefined, { type: '@@INIT' });
      expect(state).toEqual({ items: [], total: 0 });
    });
  });

  describe('selectors', () => {
    it('selectCartItems and selectCartTotal read from cart state', () => {
      const root = {
        cart: { items: [burger, pizza], total: 27 },
      } as unknown as RootState;
      expect(selectCartItems(root)).toEqual([burger, pizza]);
      expect(selectCartTotal(root)).toBe(27);
    });
  });
});
