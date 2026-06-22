import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuItem from './MenuItem';
import { renderWithStore } from '../../test/renderWithStore';
import type { Meal } from '../../types';

const meal: Meal = {
  id: '42',
  meal: 'Margherita Pizza',
  price: 12,
  img: 'pizza.png',
  instructions: 'Fresh basil and mozzarella on a thin crust',
  category: 'Pizza',
};

describe('MenuItem add to cart', () => {
  it('adds one item to the cart by default', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<MenuItem item={meal} />);

    await user.click(screen.getByRole('button', { name: /add to card/i }));

    const { items, total } = store.getState().cart;
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: '42', meal: 'Margherita Pizza', quantity: 1 });
    expect(total).toBe(12);
  });

  it('adds the quantity chosen in the number input', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<MenuItem item={meal} />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    await user.click(screen.getByRole('button', { name: /add to card/i }));

    const { items, total } = store.getState().cart;
    expect(items[0].quantity).toBe(3);
    expect(total).toBe(36);
  });

  it('accumulates quantity when added twice', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<MenuItem item={meal} />);

    const addButton = screen.getByRole('button', { name: /add to card/i });
    await user.click(addButton);
    await user.click(addButton);

    const { items, total } = store.getState().cart;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
    expect(total).toBe(24);
  });

  it.each(['0', '-5', 'abc'])(
    'clamps an invalid quantity (%s) back to 1 in the input and the cart',
    async (value) => {
      const user = userEvent.setup();
      const { store } = renderWithStore(<MenuItem item={meal} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value } });
      // The controlled input itself is re-clamped to 1, not just the dispatch.
      expect(input).toHaveValue(1);

      await user.click(screen.getByRole('button', { name: /add to card/i }));
      expect(store.getState().cart.items[0].quantity).toBe(1);
    }
  );
});
