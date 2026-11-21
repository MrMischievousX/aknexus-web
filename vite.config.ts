import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The Three.js scene is its own lazy-loaded chunk, so its size doesn't hold up the first paint.
    chunkSizeWarningLimit: 1000,
  },
})
