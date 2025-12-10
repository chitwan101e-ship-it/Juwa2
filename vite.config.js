import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// Plugin to copy index.html to 404.html after build
// This ensures GitHub Pages serves the SPA correctly for all routes
function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      const distPath = join(process.cwd(), 'dist')
      const indexPath = join(distPath, 'index.html')
      const notFoundPath = join(distPath, '404.html')
      
      try {
        copyFileSync(indexPath, notFoundPath)
        console.log('✅ Copied index.html to 404.html for GitHub Pages SPA routing')
      } catch (error) {
        console.error('❌ Failed to copy index.html to 404.html:', error)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin()],
  base: '/', // For custom domain
  server: {
    port: 4174,
    host: '0.0.0.0', // Listen on all network interfaces
    fs: {
      allow: ['..']
    }
  },
  build: {
    target: 'es2015', // Better Edge compatibility
    minify: 'esbuild', // Use esbuild instead of terser
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'framer-motion'],
  },
})
