import type { ReactElement, ReactNode } from 'react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import authReducer from '../store/authSlice';
import cartReducer from '../store/cartSlice';
import type { RootState } from '../store';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

// Build a store with the same reducers as the production store so component
// tests exercise the real cart logic, while allowing per-test preloaded state.
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// combineReducers gives a reducer whose preloadedState allows each top-level
// slice to be supplied (or omitted) independently — handy for seeding tests.
export const makeTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type TestStore = ReturnType<typeof makeTestStore>;

interface Options {
  store?: TestStore;
  route?: string;
}

export const renderWithStore = (
  ui: ReactElement,
  { store = makeTestStore(), route = '/' }: Options = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper }) };
};
