import React from 'react';
import { ArrowRight } from 'lucide-react';
import GameSpotlight from './GameSpotlight';
import { GameShelf } from './Games';
import { gameGroups } from './gameCatalog';
import HomeBanner from './HomeBanner';
import { facebook } from './SiteLayout';

export default function App() {
  return <>
    <HomeBanner />
    <GameSpotlight />
    <section id="games" className="games-section"><div className="page-width">
      <div className="section-heading"><h2>Explore games</h2><a className="text-link" href="/games">View all games <ArrowRight size={17} /></a></div>
      {Object.keys(gameGroups).map(group => <GameShelf key={group} category={group} />)}
    </div></section>
    <section className="support-band" aria-labelledby="support-heading">
      <div className="page-width">
        <div className="section-heading">
          <h2 id="support-heading">Juwa 2.0 support and Juwa777 support</h2>
          <a className="text-link" href="/contact/faq">Support FAQ <ArrowRight size={17} /></a>
        </div>
        <p>Looking for Juwa 2.0 support or Juwa777 support? The help pages cover login help, download questions, and account issues. Email Juwa customer support if you still need Juwa 777 help.</p>
        <ul className="support-points">
          <li><strong>Juwa 2.0 support</strong><span>Login, download, and account questions.</span></li>
          <li><strong>Juwa777 support</strong><span>The same help desk for Juwa 777 players.</span></li>
          <li><strong>Customer support email</strong><span>support@juwa2casino.com</span></li>
        </ul>
        <div className="button-row">
          <a className="primary-btn" href="/contact">Contact Juwa support</a>
          <a className="secondary-btn" href="/contact/faq">Read the support FAQ</a>
        </div>
      </div>
    </section>
      <section className="bg-black py-16" aria-labelledby="community-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left Side - Join the JUWA2 Casino fam! */}
            <div className="w-full md:w-auto space-y-6 order-1">
              <div>
                <h2 id="community-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
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
                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="community-btn">
                      JOIN OUR COMMUNITY
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start gap-4">
                <a aria-label="Instagram" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a aria-label="Juwa Jackpot Quest on Facebook" href={facebook} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a aria-label="X" href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
            </div>
          </div>

            {/* Right Side - Play on the Go */}
            <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:-mt-12">
              <img
                src="/pictures/icons/playonthego1.png"
                alt="Juwa 2.0 Mobile Gaming - Play on the Go Android iOS"
                className="w-full max-w-md md:max-w-md object-contain"
                loading="lazy"
              />
            </div>
            </div>
          </div>
      </section>
  </>;
}
