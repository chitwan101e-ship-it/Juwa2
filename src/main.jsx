import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Games from './Games';
import About from './About';
import Contact from './Contact';
import Blog from './Blog';
import BlogPost from './BlogPost';
import FAQ from './FAQ';
import FloatingMessenger from './FloatingMessenger';
import SiteLayout from './SiteLayout';
import { applySeo } from './seo';
import './index.css';
import './site.css';

const pages = { '/': App, '/games': Games, '/about': About, '/contact': Contact, '/contact/faq': FAQ, '/blog': Blog };

function Router() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  const Page = pages[path];
  useEffect(() => {
    applySeo(path);
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [path]);
  return <SiteLayout path={path}>
    {Page ? <Page /> : path.startsWith('/blog/') ? <BlogPost slug={path.slice(6)} /> :
      <div className="page-width interior"><h1 className="page-title">Page unavailable</h1><p className="page-intro"><a className="text-link" href="/">Return to the homepage</a></p></div>}
    <FloatingMessenger />
  </SiteLayout>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><Router /></React.StrictMode>);
