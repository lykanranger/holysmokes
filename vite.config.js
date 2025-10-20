import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // This line is important

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This resolve block is the fix
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});