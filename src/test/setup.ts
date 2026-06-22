import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Unmount React trees and reset persisted cart state between tests so each
// test starts from a clean slate.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
