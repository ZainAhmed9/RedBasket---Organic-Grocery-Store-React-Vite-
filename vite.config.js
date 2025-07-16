import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RedBasket---Organic-Grocery-Store-React-Vite-/', // IMPORTANT for Vite routing
});
