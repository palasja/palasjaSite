// vite.config.ts
import { defineConfig } from 'file:///D:/GusMayHair/node_modules/vite/dist/node/index.js';
import react from 'file:///D:/GusMayHair/node_modules/@vitejs/plugin-react/dist/index.mjs';
var vite_config_default = defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    minify: false,
  },
  root: '',
});
export { vite_config_default as default };

