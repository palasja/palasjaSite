import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    // setupFiles: ['./vitest.setup.ts'],
    exclude: [...configDefaults.exclude, '**/e2e/**'], // Example: Exclude e2e tests
    coverage: {
      provider: 'v8', // Use Vite's default coverage provider
      reporter: ['text', 'json', 'html'],
    },
    mockReset: true,
    // browser: {
    //   provider: 'playwright', // or 'webdriverio'
    //   enabled: true,
    //   // at least one instance is required
    //   instances: [
    //     { browser: 'chromium' },
    //   ],
    // },
    
  },
});
