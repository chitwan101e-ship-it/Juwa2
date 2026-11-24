import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const games = [
  { name: 'Dragon Treasure', theme: 'Fantasy', color: '#ffc26e', description: 'A dragon crouches over a hoard of gold. Look closely at the cover and you can see its claws curling around the treasure.' },
  { name: 'Deep Sea Predator', theme: 'Ocean arcade', color: '#76dff4', description: 'A steel-plated sea creature cuts across the blue water. Its red eye and jagged teeth give this underwater cover a sci-fi twist.' },
  { name: 'Superball Keno', theme: 'Number games', color: '#c6adff', description: 'A single numbered ball takes center stage above three colored tiles. Look for the purple 80 when browsing the keno titles.' },
];

export default function GameSpotlight() {
  const [selected, setSelected] = useState(0);
  const game = games[selected];
  return (
    <section id="promos" aria-labelledby="spotlight-title" className="bg-zinc-950 py-12 md:py-16 scroll-mt-16">
      <div className="page-width">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <h2 id="spotlight-title" className="text-white text-3xl md:text-5xl font-bold tracking-tight">Game spotlight</h2>
          <a href="#games" className="text-link">Browse games <ArrowDown size={16} /></a>
        </div>
        <div className="spotlight-panel rounded-3xl overflow-hidden border border-zinc-800" style={{ '--spot-color': game.color }}>
          <div className="grid md:grid-cols-2 items-center">
            <div className="spotlight-art p-6 sm:p-8">
              <img className="mx-auto w-full max-w-sm h-48 sm:h-64 object-contain" src={`/pictures/Games/${game.name}.png`} alt={`${game.name} cover`} loading="lazy" />
            </div>
            <div className="px-6 py-7 sm:px-9 md:pr-12" aria-live="polite" aria-atomic="true">
              <p className="spotlight-theme text-xs font-semibold uppercase tracking-widest">{game.theme}</p>
              <h3 className="mt-2 text-white text-3xl lg:text-5xl font-bold tracking-tight">{game.name}</h3>
              <p className="mt-4 text-zinc-300 leading-relaxed max-w-md">{game.description}</p>
              <a href="/blog/juwa-2-0-complete-guide" className="secondary-btn mt-6">Read the lobby guide <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div role="group" aria-label="Choose a spotlight game" className="grid sm:grid-cols-3 gap-px border-t border-zinc-800 bg-zinc-800">
            {games.map((item, index) => (
              <button type="button" key={item.name} aria-pressed={index === selected} onClick={() => setSelected(index)} className="spotlight-choice flex items-center gap-3 px-5 py-3 text-left font-semibold">
                <img src={`/pictures/Games/${item.name}.png`} alt="" width="50" height="38" className="w-12 h-9 object-contain" loading="lazy" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
