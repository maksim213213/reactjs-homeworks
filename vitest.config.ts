import { defineConfig } from 'vitest/config'

// Vitest runs in jsdom with the automatic JSX runtime (no @vitejs/plugin-react
// needed here — esbuild handles the transform for tests). Kept separate from
// vite.config.ts so the app build and the test runner don't share plugin types.
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
