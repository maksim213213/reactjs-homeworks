import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderPage from './OrderPage';
import { renderWithStore, makeTestStore } from '../test/renderWithStore';
import type { CartItem, AuthUser } from '../types';

const user: AuthUser = {
  uid: 'u1',
  email: 'diner@example.com',
  displayName: 'Diner',
};

const burger: CartItem = {
  id: '1',
  meal: 'Burger',
  price: 10,
  img: 'burger.png',
  quantity: 2,
};

const pizza: CartItem = {
  id: '2',
  meal: 'Pizza',
  price: 8.5,
  img: 'pizza.png',
  quantity: 1,
};

const setup = (items: CartItem[]) => {
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const store = makeTestStore({
    auth: { user, loading: false },
    cart: { items, total },
  });
  return renderWithStore(<OrderPage />, { store, route: '/order' });
};

describe('OrderPage cart view', () => {
  it('shows the empty-cart message and a link to the menu', () => {
    setup([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /browse menu/i })
    ).toBeInTheDocument();
  });

  it('lists each cart item with its line total and the signed-in user', () => {
    setup([burger, pizza]);
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('diner@example.com')).toBeInTheDocument();
    // Burger line total 10 * 2 = 20, scoped to its own row.
    const burgerRow = screen.getByText('Burger').closest('li') as HTMLElement;
    expect(within(burgerRow).getByText('$20.00')).toBeInTheDocument();
    // Grand total 20 + 8.5 = 28.5
    expect(screen.getByText('$28.50')).toBeInTheDocument();
  });

  it('removes a single item when its Remove button is clicked', async () => {
    const u = userEvent.setup();
    const { store } = setup([burger, pizza]);

    const burgerRow = screen.getByText('Burger').closest('li') as HTMLElement;
    await u.click(within(burgerRow).getByRole('button', { name: /remove/i }));

    expect(screen.queryByText('Burger')).not.toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(store.getState().cart.items).toHaveLength(1);
  });

  it('empties the cart when Clear cart is clicked', async () => {
    const u = userEvent.setup();
    const { store } = setup([burger, pizza]);

    await u.click(screen.getByRole('button', { name: /clear cart/i }));

    expect(store.getState().cart.items).toHaveLength(0);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('places the order: clears the cart and shows confirmation', async () => {
    const u = userEvent.setup();
    const { store } = setup([burger, pizza]);

    await u.click(screen.getByRole('button', { name: /place order/i }));

    expect(store.getState().cart.items).toHaveLength(0);
    expect(store.getState().cart.total).toBe(0);
    expect(
      screen.getByText(/thank you! your order has been placed/i)
    ).toBeInTheDocument();
    // The `placed` confirmation replaces the cart UI, so the action buttons go away.
    expect(
      screen.queryByRole('button', { name: /place order/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /clear cart/i })
    ).not.toBeInTheDocument();
  });
});
