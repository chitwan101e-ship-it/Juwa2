import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export const facebook = 'https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/';
export const telegram = 'https://t.me/juwa2go';
export const agentSite = 'https://juwaloot.com';
export const registration = 'https://app.slsweep.com/register?p=0088CA';
export const clashCasino = 'https://clashcasino.us/';
export const playDirectLinks = [registration, clashCasino];

const playDirectKey = 'juwa-play-direct';

export function readPlayDirectIndex() {
  try {
    const stored = Number(localStorage.getItem(playDirectKey) || 0);
    return Number.isFinite(stored) ? stored % playDirectLinks.length : 0;
  } catch {
    return 0;
  }
}

export function advancePlayDirectIndex(current) {
  const next = (current + 1) % playDirectLinks.length;
  try { localStorage.setItem(playDirectKey, String(next)); } catch { /* keep the on-screen link if storage is blocked */ }
  return next;
}

const navigation = [
  ['Home', '/'], ['Games', '/games'], ['About', '/about'],
  ['Blog', '/blog'], ['Contact', '/contact'], ['Support', '/contact/faq'],
];

function Brand() {
  return <a className="brand" href="/" aria-label="Juwa2Casino home"><img src="/pictures/icons/logo2.png" alt="" width="44" height="44" /><span>Juwa2<strong>Casino</strong></span></a>;
}

export default function SiteLayout({ path, children }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    function keydown(event) {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    }
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [open]);

  const active = path.startsWith('/blog/') ? '/blog' : path;
  return (
    <div className="site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <Brand />
          <nav id="site-navigation" aria-label="Main navigation" className={'site-nav' + (open ? ' is-open' : '')}>
            {navigation.map(([label, url]) => <a key={url} aria-current={active === url ? (path === url ? 'page' : 'location') : undefined} href={url}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="join-link" href={facebook} target="_blank" rel="noopener noreferrer">Sign up <ArrowUpRight size={15} /></a>
            <button ref={toggle} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex="-1">{children}</main>
      <footer id="rg" className="site-footer">
        <div className="page-width footer-inner">
          <div><Brand /><p className="footer-note">For adults 18+. Play for entertainment and within your limits.</p></div>
          <nav aria-label="Footer navigation">{navigation.map(([label, url]) => <a key={url} href={url}>{label}</a>)}</nav>
          <p className="copyright">© {new Date().getFullYear()} Juwa2Casino</p>
        </div>
      </footer>
    </div>
  );
}
