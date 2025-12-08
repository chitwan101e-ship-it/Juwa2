import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import About from './About'
import Contact from './Contact'
import Blog from './Blog'
import FAQ from './FAQ'
import FloatingMessenger from './FloatingMessenger'
import './index.css'

// Navigation function to handle client-side routing
function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

// Make navigate function globally available
window.navigate = navigate;

// Router component with proper state management
function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  return (
    <>
      {pathname === '/about' && <About />}
      {pathname === '/contact' && <Contact />}
      {pathname === '/blog' && <Blog />}
      {pathname === '/contact/faq' && <FAQ />}
      {pathname !== '/about' && pathname !== '/contact' && pathname !== '/blog' && pathname !== '/contact/faq' && <App />}
      <FloatingMessenger />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
