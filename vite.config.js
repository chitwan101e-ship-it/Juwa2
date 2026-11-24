import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

import { blogPostsMetadata } from './blog-posts-metadata.js'

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

// Plugin to generate static HTML files for each blog post
function generateBlogPostsPlugin() {
  return {
    name: 'generate-blog-posts',
    closeBundle() {
      const distPath = join(process.cwd(), 'dist')
      const indexPath = join(distPath, 'index.html')
      const blogDir = join(distPath, 'blog')
      
      try {
        // Read the base index.html
        const baseHtml = readFileSync(indexPath, 'utf-8')
        
        const entryAssets = baseHtml.match(/<(?:script|link)\b[^>]*(?:src|href)="\/assets\/[^"]+"[^>]*>(?:<\/script>)?/g)
        if (!entryAssets?.length) throw new Error('Missing entry assets in built index.html')
        for (const page of ['blog.html', 'games.html', 'about.html', 'contact.html', 'contact/faq.html']) {
          const template = readFileSync(join(process.cwd(), 'public', page), 'utf-8')
          const html = template.replace('<script type="module" src="/src/main.jsx"></script>', entryAssets.join('\n    '))
          const target = join(distPath, page)
          mkdirSync(join(target, '..'), { recursive: true })
          writeFileSync(target, html)
          const indexTarget = join(distPath, page.replace(/\.html$/, ''), 'index.html')
          mkdirSync(join(indexTarget, '..'), { recursive: true })
          writeFileSync(indexTarget, html)
        }

        // Create blog directory if it doesn't exist
        mkdirSync(blogDir, { recursive: true })
        
        // Generate HTML for each blog post
        Object.entries(blogPostsMetadata).forEach(([slug, metadata]) => {
          const url = `https://juwa2casino.com/blog/${slug}`
          const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": metadata.title,
            "description": metadata.description,
            "author": {
              "@type": "Organization",
              "name": "Juwa2Casino"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Juwa2Casino",
              "logo": {
                "@type": "ImageObject",
                "url": "https://juwa2casino.com/pictures/icons/logo2.png"
              }
            },
            "datePublished": metadata.published || "2025-10-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            },
            "articleSection": metadata.category,
            "keywords": metadata.keywords,
            "image": metadata.image
          }
          
          // Replace meta tags in the HTML
          let blogHtml = baseHtml
            .replace(/<title>.*?<\/title>/, `<title>${metadata.title} | Juwa2Casino</title>`)
            .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${metadata.title} | Juwa2Casino" />`)
            .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${metadata.description}" />`)
            .replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${metadata.keywords}" />`)
            .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
            .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${metadata.title} | Juwa2Casino" />`)
            .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
            .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${metadata.image}" />`)
            .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="article" />`)
            .replace(/<meta property="twitter:url" content=".*?" \/>/, `<meta property="twitter:url" content="${url}" />`)
            .replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${metadata.title} | Juwa2Casino" />`)
            .replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${metadata.description}" />`)
            .replace(/<meta property="twitter:image" content=".*?" \/>/, `<meta property="twitter:image" content="${metadata.image}" />`)
            .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
          
          // Add Article structured data before the existing structured data
          const articleSchemaScript = `    <script type="application/ld+json" data-managed-schema="true">
    ${JSON.stringify(articleSchema, null, 2)}
    </script>
    `
          
          blogHtml = blogHtml.replace(/<script type="application\/ld\+json" data-managed-schema="true">[\s\S]*?<\/script>\s*/g, '')
          blogHtml = blogHtml.replace(
            /    <!-- Structured Data \(JSON-LD\) for Better SEO -->/,
            `    <!-- Structured Data (JSON-LD) for Better SEO -->${articleSchemaScript}`
          )
          
          // Write the blog post HTML file
          const blogHtmlPath = join(blogDir, `${slug}.html`)
          writeFileSync(blogHtmlPath, blogHtml, 'utf-8')
          const blogIndexPath = join(blogDir, slug, 'index.html')
          mkdirSync(join(blogIndexPath, '..'), { recursive: true })
          writeFileSync(blogIndexPath, blogHtml, 'utf-8')
          console.log(`✅ Generated static HTML for blog post: /blog/${slug}.html`)
        })
        
        console.log(`✅ Generated ${Object.keys(blogPostsMetadata).length} blog post HTML files`)
      } catch (error) {
        throw error
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin(), generateBlogPostsPlugin()],
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
