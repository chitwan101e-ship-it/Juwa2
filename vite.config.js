import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// Blog posts metadata for static HTML generation
const blogPostsMetadata = {
  'juwa-2-0-download-guide': {
    title: 'Juwa 2.0 Download Free Android & iOS – Experience Gaming Like Never Before',
    description: 'Discover the latest version of Juwa 2.0 with improved features, smoother gameplay, and a wide range of casino-style games. Learn how to download for Android and iOS devices. Get the Juwa 2.0 download link APK and iOS installation guide.',
    keywords: 'juwa 2.0 download, juwa 2.0 download link android, juwa 2.0 download link ios, juwa 2.0 download apk, juwa 2.0 download free, clash casino juwa 2.0, juwa 2.0 apk download, juwa777 2.0 download, juwa 2.0 android, juwa 2.0 ios',
    category: 'Download Guide',
    date: 'October 2025',
    image: 'https://juwa2casino.com/pictures/icons/Juwa2.0_interface-1536x691.webp',
    slug: 'juwa-2-0-download-guide'
  },
  'juwa-2-0-complete-guide': {
    title: 'Complete Guide to JUWA2.0 Casino: Download, Play, and Claim Bonuses',
    description: 'Comprehensive guide to JUWA2.0 Casino. Learn how to download, play games, claim bonuses, and maximize your gaming experience. Get step-by-step instructions for Android and iOS installation, bonus claiming process, and tips for responsible gaming.',
    keywords: 'juwa2.0 casino, juwa 2.0 casino guide, juwa 2.0 download guide, juwa 2.0 bonuses, juwa 2.0 how to play, juwa 2.0 casino review, juwa 2.0 mobile casino, juwa 2.0 gaming platform',
    category: 'Getting Started',
    date: 'October 2025',
    image: 'https://juwa2casino.com/pictures/icons/Juwa2.0_interface-1536x691.webp',
    slug: 'juwa-2-0-complete-guide'
  },
  'juwa-2-0-apk-android-guide': {
    title: 'Juwa 2.0 Download APK Free For Android - Complete Gaming Platform Guide',
    description: 'Complete guide to downloading Juwa 2.0 APK for Android. Learn about the gaming platform, features, account registration, deposits, withdrawals, and how to earn real dollars. Get step-by-step Android installation instructions.',
    keywords: 'juwa 2.0 apk download, juwa 2.0 download apk android, juwa 2.0 apk free download, juwa 2.0 android guide, juwa 2.0 apk latest version, juwa777 2.0 download for android apk latest version, juwa 2.0 game apk, juwa 2.0 android installation',
    category: 'Android Guide',
    date: 'October 2025',
    image: 'https://juwa2casino.com/pictures/icons/Juwa2.0_interface-1536x691.webp',
    slug: 'juwa-2-0-apk-android-guide'
  }
}

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
            "datePublished": "2025-10-01",
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
          const articleSchemaScript = `    <script type="application/ld+json">
    ${JSON.stringify(articleSchema, null, 2)}
    </script>
    `
          
          // Insert Article schema before the first structured data script (after the sitemap link)
          blogHtml = blogHtml.replace(
            /    <!-- Structured Data \(JSON-LD\) for Better SEO -->/,
            `    <!-- Structured Data (JSON-LD) for Better SEO -->${articleSchemaScript}`
          )
          
          // Write the blog post HTML file
          const blogHtmlPath = join(blogDir, `${slug}.html`)
          writeFileSync(blogHtmlPath, blogHtml, 'utf-8')
          console.log(`✅ Generated static HTML for blog post: /blog/${slug}.html`)
        })
        
        console.log(`✅ Generated ${Object.keys(blogPostsMetadata).length} blog post HTML files`)
      } catch (error) {
        console.error('❌ Failed to generate blog post HTML files:', error)
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
