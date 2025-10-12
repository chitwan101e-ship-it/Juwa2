import React, { useState } from 'react';
import { Menu } from 'lucide-react';

// GitHub Release URL for large video files
const VIDEO_BASE_URL = "https://github.com/chitwan101e-ship-it/Juwa2/releases/download/v1.0.0";

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-zinc-300 mt-2">{subtitle}</p>}
    </div>
    {children}
  </section>
);

export default function Blog() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 md:hidden" 
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
                    <button onClick={() => window.navigate('/')} className="flex items-center gap-2">
                <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-14 h-14" />
              <span className="font-bold text-lg text-white">
                Juwa2<span className="text-emerald-400">Casino</span>
              </span>
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => window.navigate('/')} className="text-zinc-300 hover:text-white text-sm">Home</button>
            <button onClick={() => window.navigate('/about')} className="text-zinc-300 hover:text-white text-sm">About</button>
            <button onClick={() => window.navigate('/blog')} className="text-emerald-400 font-bold text-sm">Blog</button>
            <button onClick={() => window.navigate('/contact')} className="text-zinc-300 hover:text-white text-sm">Contact Us</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => window.navigate('/contact/faq')} className="hidden md:inline-flex px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-sm text-white">FAQ</button>
            <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm">Sign up</button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-zinc-800">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => { window.navigate('/'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-zinc-300 hover:text-white py-2"
              >
                Home
              </button>
              <button 
                onClick={() => { window.navigate('/about'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-zinc-300 hover:text-white py-2"
              >
                About
              </button>
              <button 
                onClick={() => { window.navigate('/blog'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-emerald-400 font-bold py-2"
              >
                Blog
              </button>
              <button 
                onClick={() => { window.navigate('/contact'); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-zinc-300 hover:text-white py-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* COMING SOON Banner */}
          <div className="bg-black text-zinc-400 text-center py-8 mb-12">
            <h2 className="text-2xl font-semibold">COMING SOON</h2>
          </div>

          {/* Latest from the Blog */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Latest from the Blog</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Blog Post 1 */}
              <article className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <div className="h-48 bg-zinc-800"></div>
                <div className="p-6">
                  <div className="text-emerald-400 text-sm font-medium mb-2">Casino Tips</div>
                  <h3 className="text-white font-bold text-lg mb-3">Choosing high-volatility slots</h3>
                  <p className="text-zinc-400 text-sm mb-4">Quick tips and strategies to improve your experience and understand the odds.</p>
                  <a href="#" className="text-blue-400 text-sm hover:text-blue-300">Read more →</a>
                </div>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <div className="h-48 bg-zinc-800"></div>
                <div className="p-6">
                  <div className="text-emerald-400 text-sm font-medium mb-2">Casino Tips</div>
                  <h3 className="text-white font-bold text-lg mb-3">Beginner's guide to fish games</h3>
                  <p className="text-zinc-400 text-sm mb-4">Quick tips and strategies to improve your experience and understand the odds.</p>
                  <a href="#" className="text-blue-400 text-sm hover:text-blue-300">Read more →</a>
                </div>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                <div className="h-48 bg-zinc-800"></div>
                <div className="p-6">
                  <div className="text-emerald-400 text-sm font-medium mb-2">Casino Tips</div>
                  <h3 className="text-white font-bold text-lg mb-3">How sweepstakes casinos work</h3>
                  <p className="text-zinc-400 text-sm mb-4">Quick tips and strategies to improve your experience and understand the odds.</p>
                  <a href="#" className="text-blue-400 text-sm hover:text-blue-300">Read more →</a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      {/* Ready to Play CTA */}
      <Section id="cta" title="" subtitle="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            {/* Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={`${VIDEO_BASE_URL}/footer3.mp4`} type="video/mp4" />
            </video>
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/70 rounded-3xl"></div>
            
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer id="rg" className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-12 h-12" />
              <span className="font-bold text-white">Juwa2<span className="text-emerald-400">Casino</span></span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2 text-emerald-400">Explore</div>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => window.navigate('/')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => window.navigate('/about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => window.navigate('/blog')} className="text-white">Blog</button></li>
              <li><button onClick={() => window.navigate('/contact')} className="hover:text-white">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-emerald-400">Help</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a className="hover:text-white" href="#">Support 24/7</a></li>
              <li><a className="hover:text-white" href="#">Payments</a></li>
              <li><a className="hover:text-white" href="#">Fairness & RNG</a></li>
              <li><a className="hover:text-white" href="#">Terms & Privacy</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-emerald-400">Responsible Play</div>
            <p className="text-zinc-400">This is entertainment. Play within your means. Must be of legal age in your jurisdiction.</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Juwa2Casino. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
