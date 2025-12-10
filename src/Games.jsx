import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

// All game images
const allGames = [
  "45 President.png", "7 Burning HOT.png", "7 Crystal Clovers.png", "777 Jackpot Inferno.png",
  "777 Lucky.png", "Big Bass Bonzana.png", "Black & White Double.png", "Bonus Hot 7's.png",
  "Buffalo Keno.png", "Cash Cow.png", "Cash Zone.png", "Cherry Valentine.png",
  "Deep Sea Predator.png", "Deep Sea.png", "Diamond Riches.png", "Dragon Treasure.png",
  "Epic Summer.png", "Epic Vault.png", "Farm Life.png", "Fortune Lion.png",
  "Fruit Mary.png", "Glitz.png", "Happy Fishing.png", "Hex Gems.png",
  "Hexa Keno.png", "Huge Cash.png", "King Kong's Rampage.png", "Life of Luxury.png",
  "Loteria Don.png", "Mega Money Machine.png", "Megaball Deluxe.png", "Megs 10x Pay.png",
  "Moolah Bingo.png", "Oh my Girls.png", "Perfect Purple Jackpots.png", "Rainbow Riches.png",
  "Simple Triple.png", "Spin Golden Wheel.png", "Super Stars.png", "Superball Keno.png",
  "Wild Royale Gold.png", "Wild West.png"
];

const Games = ({ onBackToHome }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (item) => {
    if (item.href) {
      if (item.href.startsWith('/')) {
        // External route - use client-side navigation
        window.navigate(item.href);
      } else {
        // Scroll to section if it's an anchor link
        if (item.href.startsWith("#")) {
          // Special case for Home link - always scroll to top
          if (item.label === "Home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          
          const element = document.querySelector(item.href);
          if (element) {
            // Check if we're already at this section
            const currentHash = window.location.hash;
            if (currentHash === item.href) {
              // If we're already at this section, scroll to top of page instead
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              // Scroll to the section
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 md:hidden" 
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-14 h-14" />
              <span className="text-white font-bold text-xl">Juwa2<span className="text-emerald-400">Casino</span></span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(n => (
                <button
                  key={n.label}
                  onClick={() => handleNavigation(n)} 
                  className="text-zinc-300 hover:text-white text-sm"
                >
                  {n.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <button onClick={() => window.navigate('/contact/faq')} className="hidden md:inline-flex px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-sm">FAQ</button>
              <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm">Sign up</button>
            </div>
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
                className="block w-full text-left text-zinc-300 hover:text-white py-2"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Games
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Browse our complete collection of casino games. Choose from {allGames.length}+ exciting titles.
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 mb-12">
          {allGames.map((gameName, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                <div className="aspect-[4/5] relative">
                  <img
                    src={`./pictures/Games/${gameName}`}
                    alt={`${gameName.replace('.png', '')} - Juwa 2.0 Casino Game Play Online`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Handle image load error silently
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 hidden">
                    <span className="text-xs text-zinc-300 text-center px-2">{gameName.replace('.png', '')}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                    {gameName.replace('.png', '')}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-emerald-400 font-medium">Play Now</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Play Game
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Games Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
            <div className="text-3xl font-bold text-emerald-400 mb-2">{allGames.length}+</div>
            <div className="text-zinc-300">Total Games</div>
          </div>
          <div className="text-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
            <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
            <div className="text-zinc-300">Available</div>
          </div>
          <div className="text-center p-6 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
            <div className="text-3xl font-bold text-emerald-400 mb-2">Instant</div>
            <div className="text-zinc-300">Play</div>
          </div>
        </motion.div>
      </main>

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
            <div className="font-semibold mb-2">Explore</div>
            <ul className="space-y-2 text-zinc-400">
              {navItems.map(n => (
                <li key={n.label}>
                  <button
                    onClick={() => handleNavigation(n)}
                    className="hover:text-white"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Help</div>
            <ul className="space-y-2 text-zinc-400">
              <li><a className="hover:text-white" href="#">Support 24/7</a></li>
              <li><a className="hover:text-white" href="#">Payments</a></li>
              <li><a className="hover:text-white" href="#">Fairness & RNG</a></li>
              <li><a className="hover:text-white" href="#">Terms & Privacy</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Responsible Play</div>
            <p className="text-zinc-400">This is entertainment. Play within your means. Must be of legal age in your jurisdiction.</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Juwa2Casino. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Games;
