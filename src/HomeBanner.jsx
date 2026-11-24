import React, { useEffect, useState } from 'react';
import { Megaphone, ChevronRight, MessageCircle } from 'lucide-react';
import { allGames } from './gameCatalog';
import { advancePlayDirectIndex, agentSite, playDirectLinks, readPlayDirectIndex } from './SiteLayout';

const VIDEO_BASE_URL = "https://github.com/chitwan101e-ship-it/Juwa2/releases/download/v1.0.0";
const firstGrid = ['Life of Luxury', '45 President', 'Cherry Valentine', 'Deep Sea Predator', '7 Crystal Clovers', 'Fortune Lion', 'Buffalo Keno', 'Rainbow Riches', '777 Jackpot Inferno'];

function sample(count) {
  const pool = [...allGames];
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export default function HomeBanner() {
  const [games, setGames] = useState(firstGrid);
  const [trendingGames, setTrendingGames] = useState(['777 Lucky', 'Fruit Mary', 'Glitz', 'Rainbow Riches']);
  const [lastUpdate, setLastUpdate] = useState(() => new Date());
  const [playIndex, setPlayIndex] = useState(readPlayDirectIndex);
  useEffect(() => {
    const rotation = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? null : setInterval(() => setGames(sample(9)), 15000);
    const refresh = setInterval(() => { setTrendingGames(sample(4)); setLastUpdate(new Date()); }, 3600000);
    return () => { clearInterval(rotation); clearInterval(refresh); };
  }, []);
  return (
    <>
      {/* Hero with video background */}
      <div id="top" className="relative overflow-hidden border-b border-zinc-800">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover opacity-100"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={`${VIDEO_BASE_URL}/banner.mp4`} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
          </video>
          
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-emerald-950/80" />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-zinc-950/20" />
          
          {/* Animated overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/2 to-transparent animate-pulse" />
          

        </div>
        
        {/* Decorative background element */}
        <div className="absolute -top-28 -right-28 w-[38rem] h-[38rem] rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative page-width py-12 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-300 bg-emerald-500/10">
              <Megaphone className="w-4 h-4" /> New: Cashback Fridays up to 10%
            </div>
            <h1 className="mt-4 text-[clamp(2.6rem,5.1vw,4.65rem)] font-extrabold leading-[1.06] tracking-tight">
              Juwa 2.0 Download Link
              <span className="block text-emerald-400">&amp; Juwa777 APK</span>
            </h1>
            <p className="mt-3 text-zinc-300 text-lg text-shadow" data-testid="hero-tagline">
              Get the latest Juwa 2.0 download link and Juwa777 APK download free for Android & iOS. DL Juwa 777 and play 100+ slots, fish games, and keno with real money payouts.
            </p>
            <div className="button-row hero-actions mt-6">
              <a href={playDirectLinks[playIndex]} target="_blank" rel="noopener noreferrer" className="primary-btn" onClick={() => setPlayIndex(advancePlayDirectIndex(playIndex))}>
                Play Directly <ChevronRight className="w-4 h-4" />
              </a>
              <a href={agentSite} target="_blank" rel="noopener noreferrer" className="agent-btn">
                <MessageCircle size={17} aria-hidden="true" /> Play with Agent
              </a>
            </div>
          </div>

          {/* Right side mockup */}
          <div className="min-w-0">
            <div className="relative">
              <div className="relative rounded-3xl border border-zinc-800/30 p-1.5 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-0.5">
                  {games.map(name => (
                    <div key={name} className="aspect-video overflow-hidden">
                      <img src={`/pictures/Games/${encodeURIComponent(name)}.png`} alt={name} className="w-full h-full object-contain" />
                    </div>
                  ))}
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
                        <div className="text-[11px] text-zinc-400 mb-1">
                          Trending Games:
                          <span className="text-[10px] text-zinc-400 ml-1">
                            (Updated {lastUpdate.toLocaleTimeString()})
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {trendingGames.map((game, index) => (
                            <div key={`${game}-${index}`} className="text-[11px] text-emerald-400">
                              • {game}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
}
