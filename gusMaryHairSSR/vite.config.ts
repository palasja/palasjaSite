import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cjsInterop } from 'vite-plugin-cjs-interop';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cjsInterop({
      // List of CJS dependencies that require interop
      dependencies: [
        'react-slick',
        'slick-carousel',
        '@mui/icons-material/*',
        '@mui/material/*',
        '**.module.css',
        // // Deep imports should be specified separately
        // "some-package/deep/import",
        // // But globs are supported
        // "some-package/foo/*",
        // // Even deep globs for scoped packages
        // "@some-scope/**",
      ],
    }),
  ],
  server: { port: 5173 },
  build: {
    minify: true,
    manifest: true,
  },
  root: '',
});
