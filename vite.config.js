import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base "./" supaya bisa di-deploy ke GitHub Pages maupun Vercel
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
