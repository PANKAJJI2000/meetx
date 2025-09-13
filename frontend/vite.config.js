import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://vcbackend-cx24.onrender.com',
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/socket.io/, '/socket.io')
      },
      '/api': {
        target: 'https://vcbackend-cx24.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
