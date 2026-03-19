import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // ← this line is missing

export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})