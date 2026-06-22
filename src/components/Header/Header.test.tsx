import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithStore, makeTestStore } from '../../test/renderWithStore';

describe('Header cart badge', () => {
  it('shows 0.00 when the cart is empty', () => {
    // Seed an explicit empty cart so the assertion does not depend on the
    // slice's module-level initial state (which is read once at import time).
    const store = makeTestStore({ cart: { items: [], total: 0 } });
    renderWithStore(<Header />, { store });
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('reflects the current cart total from the store', () => {
    const store = makeTestStore({
      cart: {
        items: [
          { id: '1', meal: 'Burger', price: 10, img: '', quantity: 2 },
        ],
        total: 20,
      },
    });
    renderWithStore(<Header />, { store });
    expect(screen.getByText('20.00')).toBeInTheDocument();
  });
});
