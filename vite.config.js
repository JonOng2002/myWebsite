import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",  // Adjust this if your API is running elsewhere
        changeOrigin: true,
        secure: false,
      },
    },
  },
});