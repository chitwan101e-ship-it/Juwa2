import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import About from './About'
import Contact from './Contact'
import Blog from './Blog'
import BlogPost from './BlogPost'
import FAQ from './FAQ'
import FloatingMessenger from './FloatingMessenger'
import './index.css'

// Router component with proper state management
function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Navigation function to handle client-side routing
  const navigate = useCallback((path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  }, []);

  // Make navigate function globally available
  useEffect(() => {
    window.navigate = navigate;
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top when navigating to a new page
  useEffect(() => {
    const pathname = currentPath.split('#')[0];
    const hasAnchor = currentPath.includes('#');
    
    // If there's no anchor (just a page navigation), scroll to top
    if (!hasAnchor) {
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  // Handle anchor links by extracting the pathname
  const pathname = currentPath.split('#')[0];

  // Check if it's a blog post route
  const isBlogPost = pathname.startsWith('/blog/') && pathname !== '/blog';
  const blogSlug = isBlogPost ? pathname.replace('/blog/', '') : null;

  return (
    <>
      {pathname === '/about' && <About />}
      {pathname === '/contact' && <Contact />}
      {isBlogPost && <BlogPost slug={blogSlug} />}
      {pathname === '/blog' && <Blog />}
      {pathname === '/contact/faq' && <FAQ />}
      {pathname !== '/about' && pathname !== '/contact' && pathname !== '/blog' && !isBlogPost && pathname !== '/contact/faq' && <App />}
      <FloatingMessenger />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
