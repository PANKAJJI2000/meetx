import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure assets are served from root
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://meetx-1-en8z.onrender.com',
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/socket.io/, '/socket.io')
      },
      '/api': {
        target: 'https://meetx-1-en8z.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
