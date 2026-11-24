import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { allGames, gameGroups } from './gameCatalog';

function GameCard({ name }) {
  return <figure className="game-card"><img src={`/pictures/Games/${encodeURIComponent(name)}.png`} alt="" width="240" height="168" loading="lazy" /><figcaption>{name}</figcaption></figure>;
}

export function GameShelf({ category }) {
  const row = useRef(null);
  function scroll(direction) {
    const rail = row.current;
    rail.scrollBy({ left: direction * (rail.clientWidth - 32), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section className="game-shelf" aria-label={category}>
    <div className="shelf-heading"><h3>{category}</h3><div className="rail-arrows">
      <button type="button" aria-label={`Previous ${category} games`} onClick={() => scroll(-1)}><ArrowLeft size={17} /></button>
      <button type="button" aria-label={`More ${category} games`} onClick={() => scroll(1)}><ArrowRight size={17} /></button>
    </div></div>
    <div className="shelf-track" ref={row}>{gameGroups[category].map(name => <GameCard key={name} name={name} />)}</div>
  </section>;
}

export default function Games() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const source = category === 'All' ? allGames : gameGroups[category];
  const games = source.filter(name => name.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="page-width interior">
    <h1 className="page-title">Game library</h1>
    <p className="page-intro">Browse {allGames.length} Juwa titles by cover, or search for a game you remember.</p>
    <div className="catalog-tools">
      <div className="filter-list" role="group" aria-label="Game categories">{['All', ...Object.keys(gameGroups)].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <label className="game-search"><Search size={17} /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search games" aria-label="Search games" /></label>
    </div>
    <p className="result-count" role="status">{games.length} {games.length === 1 ? 'game' : 'games'}</p>
    <div className="catalog-grid">{games.map(name => <GameCard key={name} name={name} />)}</div>
    {!games.length && <div className="empty-panel"><h2>No matching games</h2><p>Try a shorter name or browse all categories.</p><button type="button" className="secondary-btn" onClick={() => { setCategory('All'); setQuery(''); }}>Show all games</button></div>}
  </div>;
}
