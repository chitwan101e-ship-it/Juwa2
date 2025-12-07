import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Wallet,
  Smartphone,
  Shield,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import { initPerformanceOptimizations } from "./utils/performance";

// GitHub Release URL for large video files
// After uploading videos to GitHub Releases, they'll be available at this URL pattern
const VIDEO_BASE_URL = "https://github.com/chitwan101e-ship-it/Juwa2/releases/download/v1.0.0";

// All available games - verified to exist in public/pictures/Games/
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

// 888.com-inspired look & feel: deep charcoal background, neon accents, clean cards, bold promos

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const categories = [
  { icon: <img src="./pictures/icons/slots.png" alt="Slots" className="w-32 h-32" />, title: "Slots", desc: "100+ titles across classic, video, & megaways." },
  { icon: <img src="./pictures/icons/highroller.png" alt="High Roller" className="w-32 h-32" />, title: "High Roller", desc: "Bigger stakes, bigger thrills—VIP-ready." },
  { icon: <img src="./pictures/icons/crash.png" alt="Crash & Instant" className="w-32 h-32" />, title: "Crash & Instant", desc: "Fast rounds, instant results, all skill vibes." },
  { icon: <img src="./pictures/icons/fish.png" alt="Fish & Arcade" className="w-32 h-32" />, title: "Fish & Arcade", desc: "Skill shots, boss fights, and coin storms." },
];


const promos = [
  { title: "100% Welcome Bonus", sub: "Up to $500 credits", tag: "New" },
  { title: "Daily Spin Wheel", sub: "Win up to $100 bonus", tag: "Daily" },
  { title: "Cashback Fridays", sub: "Up to 10% back", tag: "Weekly" },
];


const features = [
  { icon: <Wallet className="w-6 h-6" />, title: "Fast Payouts", desc: "Lightning withdrawals to your preferred method." },
  { icon: <Shield className="w-6 h-6" />, title: "Secure & Fair", desc: "Bank‑grade encryption & certified RNG." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Play Anywhere", desc: "Optimized for iOS, Android, and desktop." },
];


const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-zinc-300 mt-2">{subtitle}</p>}
    </div>
    {children}
  </section>
);

// --- SMOKE TESTS (runtime assertions) ---
function runSmokeTests() {
  console.group("Juwa2Casino — smoke tests");
  console.assert(Array.isArray(navItems) && navItems.length >= 3, "navItems should have at least 3 items");
  console.assert(Array.isArray(categories) && categories.length === 4, "categories should have 4 items");
  console.assert(Array.isArray(promos) && promos.length >= 3, "promos should have at least 3 items");
  const tagline = "Spin, splash, and score your next big moment. No agent, no hassle—just you.";
  console.assert(tagline.includes("No agent, no hassle"), "tagline should include 'No agent, no hassle'");
  console.groupEnd();
}

export default function App() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentSlots, setCurrentSlots] = useState(0);
  const [currentHighRoller, setCurrentHighRoller] = useState(0);
  const [currentFishKeno, setCurrentFishKeno] = useState(0);
  const [trendingGames, setTrendingGames] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dynamicGameGrid, setDynamicGameGrid] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gridRotationKey, setGridRotationKey] = useState(0);
  const promoRef = useRef(null);
  const slotsRef = useRef(null);
  const highRollerRef = useRef(null);
  const fishKenoRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to get random trending games
  const getRandomTrendingGames = () => {
    const shuffled = [...allGames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // Function to get random game grid (9 games) - ensures no duplicates
  const getRandomGameGrid = () => {
    const shuffled = [...allGames].sort(() => 0.5 - Math.random());
    const selectedGames = shuffled.slice(0, 9);
    
    // Double-check we have exactly 9 unique games
    if (selectedGames.length !== 9) {
      return allGames.slice(0, 9);
    }
    return selectedGames;
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

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev + 1) % 3);
  };

  const prevPromo = () => {
    setCurrentPromo((prev) => (prev - 1 + 3) % 3);
  };

  const nextSlots = () => {
    if (slotsRef.current) {
      slotsRef.current.scrollLeft += 208; // Scroll by one game width
    }
  };

  const prevSlots = () => {
    if (slotsRef.current) {
      slotsRef.current.scrollLeft -= 208; // Scroll by one game width
    }
  };

  const nextHighRoller = () => {
    if (highRollerRef.current) {
      highRollerRef.current.scrollLeft += 208; // Scroll by one game width
    }
  };

  const prevHighRoller = () => {
    if (highRollerRef.current) {
      highRollerRef.current.scrollLeft -= 208; // Scroll by one game width
    }
  };

  const nextFishKeno = () => {
    if (fishKenoRef.current) {
      fishKenoRef.current.scrollLeft += 208; // Scroll by one game width
    }
  };

  const prevFishKeno = () => {
    if (fishKenoRef.current) {
      fishKenoRef.current.scrollLeft -= 208; // Scroll by one game width
    }
  };

  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    runSmokeTests();
  }, []);

  // Initialize trending games and set up hourly rotation
  useEffect(() => {
    // Set initial trending games
    setTrendingGames(getRandomTrendingGames());
    
    // Set up hourly rotation (3600000 ms = 1 hour)
    const interval = setInterval(() => {
      setTrendingGames(getRandomTrendingGames());
      setLastUpdate(new Date());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  // Initialize dynamic game grid and set up 15-second rotation
  useEffect(() => {
    // Set initial game grid
    const initialGrid = getRandomGameGrid();
    setDynamicGameGrid(initialGrid);
    // Set up 15-second rotation (15000 ms = 15 seconds)
    const gridInterval = setInterval(() => {
      const newGrid = getRandomGameGrid();
      setDynamicGameGrid(newGrid);
      setGridRotationKey(prev => prev + 1); // Force re-render
    }, 15000);

    return () => clearInterval(gridInterval);
  }, []);


  // Show Home page by default
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Floating Messenger Button - Always Visible */}
      <a 
        href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 cursor-pointer animate-pulse hover:animate-none"
        aria-label="Message us on Messenger"
      >
        <img src="./pictures/icons/Messenger_Icon_Primary_Blue.svg" alt="Messenger" className="w-10 h-10" />
      </a>
      
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 md:hidden" 
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <a href="#" className="flex items-center gap-2">
                <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-14 h-14" />
              <span className="font-bold text-lg">
                Juwa2<span className="text-emerald-400">Casino</span>
              </span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavigation({ href: '#top' })} 
              className="text-emerald-400 font-bold text-sm"
            >
              Home
            </button>
            <button 
              onClick={() => window.navigate('/about')} 
              className="text-zinc-300 hover:text-white text-sm"
            >
              About
            </button>
            <button 
              onClick={() => window.navigate('/blog')} 
              className="text-zinc-300 hover:text-white text-sm"
            >
              Blog
            </button>
            <button 
              onClick={() => window.navigate('/contact')} 
              className="text-zinc-300 hover:text-white text-sm"
            >
              Contact Us
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => window.navigate('/contact/faq')} className="hidden md:inline-flex px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-sm">FAQ</button>
            <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl">
              <img src="./pictures/icons/Messenger_Icon_Primary_Blue.svg" alt="Messenger" className="w-5 h-5" />
              <span>Message Us</span>
            </a>
            <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm">Sign up</a>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-zinc-800">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => { handleNavigation({ href: '#top' }); setIsMobileMenuOpen(false); }}
                className="block w-full text-left text-emerald-400 font-bold py-2"
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

      {/* Hero with video background */}
      <div className="relative overflow-hidden border-b border-zinc-800">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover opacity-100"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() => {
              setVideoLoaded(false);
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
            }}
            onCanPlay={() => {
              setVideoLoaded(true);
            }}
            onWaiting={() => {
              setVideoLoaded(false);
            }}
            onError={(e) => {
              setVideoError(true);
              e.currentTarget.style.display = 'none';
            }}
          >
            <source src={`${VIDEO_BASE_URL}/banner.mp4`} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
          
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/10" />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-zinc-950/20" />
          
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/2 to-transparent animate-pulse" />
          
          {/* Loading indicator */}
          {!videoLoaded && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-emerald-400 text-sm animate-pulse">Loading Vegas video...</div>
            </div>
          )}
          
          {/* Error indicator */}
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-zinc-400 text-sm">Using fallback background</div>
            </div>
          )}
        </div>
        
        {/* Decorative background element */}
        <div className="absolute -top-28 -right-28 w-[38rem] h-[38rem] rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
              <Megaphone className="w-4 h-4" /> New: Cashback Fridays up to 10%
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-shadow-lg">
              Vegas‑grade thrills,
              <span className="text-emerald-400"> anywhere.</span>
            </h1>
            <p className="mt-3 text-zinc-300 text-lg text-shadow" data-testid="hero-tagline">
              Spin, splash, and score your next big moment. No agent, no hassle—just you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">
                Claim Welcome Bonus <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#games" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-zinc-800 hover:bg-zinc-900">
                Browse Games
              </a>
            </div>
          </motion.div>

          {/* Right side mockup */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative">
              <div className="relative rounded-3xl border border-zinc-800/30 p-1.5 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-0.5">
                  {dynamicGameGrid.length > 0 ? dynamicGameGrid.map((imageName, i) => (
                    <div key={`${imageName}-${gridRotationKey}-${i}`} className="aspect-[16/9] overflow-hidden group relative">
                      <img 
                         src={`./pictures/Games/${imageName}`}
                        alt={`Game ${i + 1}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 hidden">
                        <span className="text-[10px] text-zinc-300">Game {i + 1}</span>
                      </div>
                    </div>
                  )) : (
                    // Fallback while loading
                    Array.from({ length: 9 }, (_, i) => (
                      <div key={i} className="aspect-[16/9] overflow-hidden group relative">
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900/60">
                          <span className="text-[10px] text-zinc-300">Loading...</span>
                        </div>
                </div>
                    ))
                  )}
                  </div>
                <div className="mt-1.5 grid grid-cols-1 gap-1">
                  <div className="rounded-md border border-zinc-800 bg-zinc-900/60 p-1.5">
                    <div className="flex justify-between items-start">
                      {/* Left side - Hot Promo content */}
                      <div className="flex-1">
                    <div className="text-[10px] text-zinc-300">Hot Promo</div>
                    <div className="mt-1 text-emerald-400 font-semibold text-xs">100% up to $500</div>
                    <p className="text-[10px] text-zinc-400">+ Daily Spin Wheel</p>
                      </div>
                      
                      {/* Right side - Trending Games */}
                      <div className="ml-3 flex-1">
                        <div className="text-[9px] text-zinc-500 mb-1">
                          Trending Games:
                          <span className="text-[8px] text-zinc-600 ml-1">
                            (Updated {lastUpdate.toLocaleTimeString()})
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {trendingGames.map((game, index) => (
                            <div key={`${game}-${index}`} className="text-[9px] text-emerald-400">
                              • {game.replace('.png', '')}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Promotions */}
      <section id="promos" className="relative py-16">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-fade-in" style={{
          backgroundImage: 'url("./pictures/icons/Vs.png?v=' + Date.now() + '")',
          animationDelay: '0.5s',
          animationFillMode: 'forwards'
        }}></div>
        
        {/* Animated overlay pattern similar to banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse"></div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/3 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Promotions</span>
            </h2>
          </div>
          
          {/* Swipeable Promotions */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevPromo}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-zinc-800/90 hover:bg-zinc-700/90 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-white rotate-180" />
            </button>
            <button 
              onClick={nextPromo}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-zinc-800/90 hover:bg-zinc-700/90 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="overflow-hidden scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <div 
                ref={promoRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentPromo * 100}%)` }}
              >
                {[
                  { 
                    title: "NEW MEMBER PROMOTION", 
                    subtitle: "100% Welcome Bonus",
                    description: "Deposit on Juwa2 and get a 100% bonus on Juwa1",
                    details: "Earn up to $500 rewards play on your first day of membership!",
                    tag: "ONGOING",
                    bgColor: "from-emerald-500 to-emerald-600"
                  },
                  { 
                    title: "DAILY REWARDS", 
                    subtitle: "Daily Spin Wheel",
                    description: "Win up to $100 bonus every day",
                    details: "Spin the wheel daily and win instant bonuses and free spins.",
                    tag: "DAILY",
                    bgColor: "from-emerald-500 to-emerald-600"
                  },
                  { 
                    title: "CASHBACK FRIDAYS", 
                    subtitle: "Weekly Cashback",
                    description: "Get up to 10% back on losses",
                    details: "Every Friday, get cashback on your weekly losses up to 10%.",
                    tag: "WEEKLY",
                    bgColor: "from-emerald-500 to-emerald-600"
                  },
                ].map((p, index) => (
                  <div key={p.title} className="flex-shrink-0 w-full min-w-full snap-center rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="promo-mobile-stack flex flex-col md:flex-row h-auto md:h-96">
                      {/* Left Side - Video for Daily Spin Wheel, Branding for others */}
                      <div className="w-full md:w-1/2 h-48 md:h-auto bg-black flex flex-col items-center justify-center relative overflow-hidden">
                        {index === 1 ? (
                          // Video for Daily Spin Wheel
                          <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                          >
                            <source src={`${VIDEO_BASE_URL}/spinwheel.mp4`} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="text-center">
                            <div className="text-6xl font-bold text-white mb-2">
                              JUWA<span className="text-red-500">2</span>
                            </div>
                            <div className="text-white text-xl font-bold tracking-wide">
                              CASINO
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Right Side - Promotional Content */}
                      <div className={`w-full md:w-1/2 bg-gradient-to-br ${p.bgColor} p-8 flex flex-col justify-between relative overflow-hidden`}>
                <div>
                          <div className="text-white/80 text-sm font-bold tracking-wider uppercase mb-3">
                            {p.tag}
                          </div>
                          <h3 className="text-white text-6xl font-bold mb-4">
                            {p.subtitle}
                          </h3>
                          <p className="text-white text-base mb-3">
                            {p.description}
                          </p>
                          <p className="text-white/90 text-sm mb-6">
                            {p.details}
                          </p>
                        </div>
                        
                        <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-100 text-black text-base font-bold uppercase tracking-wide py-3 px-6 rounded-xl transition-colors duration-300 w-fit inline-block">
                          JOIN THE FUN
                        </a>
                </div>
              </div>
            </div>
          ))}
        </div>
            </div>
                </div>
                
          {/* Swipe Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentPromo ? 'bg-emerald-400' : 'bg-zinc-600'
                }`}
              ></div>
            ))}
                </div>
              </div>
      </section>

      {/* Explore Games */}
      <section id="games" className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Explore Games</h2>
            <p className="text-zinc-300 mt-2">Pick a category to dive right in.</p>
        </div>
                
          {/* Slots Category */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Slots</h3>
            <div className="relative">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlots}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
              </button>
              <button 
                onClick={nextSlots}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              <div 
                ref={slotsRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth" 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none'
                }}
              >
                {[
                  { name: "7 BURNING HOT", image: "7 Burning HOT.png" },
                  { name: "7 CRYSTAL CLOVERS", image: "7 Crystal Clovers.png" },
                  { name: "777 JACKPOT INFERNO", image: "777 Jackpot Inferno.png" },
                  { name: "777 LUCKY", image: "777 Lucky.png" },
                  { name: "45 PRESIDENT", image: "45 President.png" },
                  { name: "BONUS HOT 7'S", image: "Bonus Hot 7's.png" },
                  { name: "CASH ZONE", image: "Cash Zone.png" },
                  { name: "CHERRY VALENTINE", image: "Cherry Valentine.png" },
                  { name: "DIAMOND RICHES", image: "Diamond Riches.png" },
                  { name: "EPIC SUMMER", image: "Epic Summer.png" },
                  { name: "FORTUNE LION", image: "Fortune Lion.png" },
                  { name: "FRUIT MARY", image: "Fruit Mary.png" },
                  { name: "GLITZ", image: "Glitz.png" },
                  { name: "KING KONG'S RAMPAGE", image: "King Kong's Rampage.png" },
                  { name: "LOTERIA DON", image: "Loteria Don.png" },
                  { name: "MEGA MONEY MACHINE", image: "Mega Money Machine.png" },
                  { name: "MOOLAH BINGO", image: "Moolah Bingo.png" },
                  { name: "OH MY GIRLS", image: "Oh my Girls.png" },
                  { name: "PERFECT PURPLE JACKPOTS", image: "Perfect Purple Jackpots.png" },
                  { name: "RAINBOW RICHES", image: "Rainbow Riches.png" },
                  { name: "SPIN GOLDEN WHEEL", image: "Spin Golden Wheel.png" },
                  { name: "SUPER STARS", image: "Super Stars.png" },
                  { name: "WILD WEST", image: "Wild West.png" }
                ].map((game, index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                    <img 
                      src={`/pictures/Games/${game.image}`}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = `<span class="text-white text-sm font-bold">${game.name}</span>`;
                      }}
                      onLoad={(e) => {
                      }}
                    />
            </div>
          ))}
        </div>
                </div>
              </div>

          {/* High Roller Category */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">High Roller</h3>
            <div className="relative">
              {/* Navigation Arrows */}
              <button 
                onClick={prevHighRoller}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
              </button>
              <button 
                onClick={nextHighRoller}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              <div 
                ref={highRollerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth" 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none'
                }}
              >
                {[
                  { name: "HUGE CASH", image: "Huge Cash.png" },
                  { name: "MEGABALL DELUXE", image: "Megaball Deluxe.png" },
                  { name: "MEGS 10X PAY", image: "Megs 10x Pay.png" },
                  { name: "WILD ROYALE GOLD", image: "Wild Royale Gold.png" },
                  { name: "LIFE OF LUXURY", image: "Life of Luxury.png" },
                  { name: "EPIC VAULT", image: "Epic Vault.png" },
                  { name: "SIMPLE TRIPLE", image: "Simple Triple.png" },
                  { name: "CASH COW", image: "Cash Cow.png" },
                  { name: "BUFFALO KENO", image: "Buffalo Keno.png" },
                  { name: "BLACK & WHITE DOUBLE", image: "Black & White Double.png" },
                  { name: "HEX GEMS", image: "Hex Gems.png" }
                ].map((game, index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                    <img 
                      src={`/pictures/Games/${game.image}`}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = `<span class="text-white text-sm font-bold">${game.name}</span>`;
                      }}
                      onLoad={(e) => {
                      }}
                    />
            </div>
          ))}
        </div>
            </div>
        </div>

          {/* Fish & Keno Category */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Fish & Keno</h3>
            <div className="relative">
              {/* Navigation Arrows */}
              <button 
                onClick={prevFishKeno}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
              </button>
              <button 
                onClick={nextFishKeno}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              <div 
                ref={fishKenoRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth" 
                style={{
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none'
                }}
              >
                {[
                  { name: "BIG BASS BONZANA", image: "Big Bass Bonzana.png" },
                  { name: "CASH COW", image: "Cash Cow.png" },
                  { name: "DEEP SEA PREDATOR", image: "Deep Sea Predator.png" },
                  { name: "DEEP SEA", image: "Deep Sea.png" },
                  { name: "DRAGON TREASURE", image: "Dragon Treasure.png" },
                  { name: "FARM LIFE", image: "Farm Life.png" },
                  { name: "HAPPY FISHING", image: "Happy Fishing.png" },
                  { name: "BUFFALO KENO", image: "Buffalo Keno.png" },
                  { name: "HEXA KENO", image: "Hexa Keno.png" },
                  { name: "SUPERBALL KENO", image: "Superball Keno.png" }
                ].map((game, index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                    <img 
                      src={`/pictures/Games/${game.image}`}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.innerHTML = `<span class="text-white text-sm font-bold">${game.name}</span>`;
                      }}
                      onLoad={(e) => {
                      }}
                    />
            </div>
          ))}
        </div>
            </div>
            </div>
          </div>
      </section>

      {/* Community CTA and Play on the Go - Mobile Optimized */}
      <section className="bg-black py-16" style={{'--cache-bust': Date.now()}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div key={`mobile-layout-${Date.now()}`} className="mobile-stack flex flex-col md:grid md:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Join the JUWA2 Casino fam! */}
            <div className="w-full md:w-auto space-y-6 order-1">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Join the JUWA2 Casino fam!
                </h2>
                <p className="text-lg text-white leading-relaxed">
                  Ready to be part of the JUWA2 crew? Mingle with like-minded players and enjoy exclusive offers and competitions with our friendly community of JUWA2 champs.
                </p>
              </div>
              
              {/* Community Stats Box */}
              <div className="flex justify-center md:justify-start">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 shadow-xl max-w-sm w-full">
                  <div className="text-center">
                    <div className="text-gray-600 text-sm font-medium mb-1">OVER</div>
                    <div className="text-gray-800 text-4xl md:text-5xl font-bold mb-1">1,000,000</div>
                    <div className="text-gray-600 text-sm font-medium mb-4">Fans on Facebook</div>
                    <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="w-full bg-white hover:bg-gray-50 text-black font-bold uppercase tracking-wide px-6 py-3 rounded-xl transition-all duration-300 border border-gray-300 text-sm shadow-md hover:shadow-lg block text-center">
                      JOIN OUR COMMUNITY
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=pchM95SHscZP5Dqz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HHSeBWNmn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  <img src="./pictures/icons/Messenger_Icon_Primary_Blue.svg" alt="Messenger" className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
            </div>
          </div>

            {/* Right Side - Play on the Go */}
            <div className="w-full md:w-auto flex justify-center md:justify-start order-2 -mt-8 md:-mt-12">
              <img 
                src="./pictures/icons/playonthego1.png" 
                alt="Play on the Go" 
                className="w-full max-w-md md:max-w-md object-contain"
              />
            </div>
            </div>
          </div>
      </section>

      {/* Ready to Play CTA */}
      <Section id="cta" title="" subtitle="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            {/* Video Background */}
            <video
              key={`footer-video-${Date.now()}`}
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
}

