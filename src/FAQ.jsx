import React, { useState } from 'react';
import { Menu, Plus, Minus } from 'lucide-react';

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-zinc-300 mt-2">{subtitle}</p>}
    </div>
    {children}
  </section>
);

export default function FAQ() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openItems, setOpenItems] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFAQItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What is Juwa2?",
      answer: "Juwa2 is a next-generation social casino-style gaming platform for Android and iOS users. It offers a variety of exciting interactive games that blend fun, skill, and chance — all with full transparency and player control."
    },
    {
      question: "What makes Juwa2 different from other platforms?",
      answer: "Unlike other sweepstakes platforms, Juwa2 is 100% self-managed — meaning:\n✅ No agents or middlemen\n✅ Direct registration and login through the official website or app\n✅ Complete control over your account, payments, and withdrawals"
    },
    {
      question: "How many games are available in Juwa2?",
      answer: "Juwa2 includes over 100+ exciting titles, featuring:\n🎰 Slot games with diverse themes and jackpots\n🐟 Fish shooting and arcade games\n🎲 Keno and instant win games\nThis variety ensures there's always something for every type of player."
    },
    {
      question: "Is Juwa2 free to use?",
      answer: "Yes! Juwa2 is free to download and play. Some in-game items or credits may require purchase to unlock premium features or bonuses."
    },
    {
      question: "Is Juwa2 safe and scam-free?",
      answer: "Absolutely. Juwa2 uses secure encryption and verified payment channels to protect every transaction.\n\n• No third-party agent involvement\n• No hidden fees\n• All deposits and withdrawals are handled directly through the app"
    },
    {
      question: "How do I create an account?",
      answer: "1. Visit the official Juwa2 website or open the app.\n2. Click Register and fill in your basic details.\n3. Verify your email or phone number.\n4. Log in and start playing — no agent or referral code required."
    },
    {
      question: "How do I deposit or withdraw funds?",
      answer: "Deposits and withdrawals are completely self-service within your Juwa2 account:\n\n1. Open the Wallet section in the app.\n2. Choose your preferred payment method.\n3. Follow the secure step-by-step process.\n\n💳 All payments are processed instantly — no waiting for an agent."
    },
    {
      question: "What bonuses and rewards can I get?",
      answer: "Juwa2 offers daily bonuses and loyalty rewards, including:\n🎡 Spin-to-Win rewards\n💸 Cashback offers\n🎁 Surprise bonus credits\n\nThese rewards keep gameplay exciting while giving players more chances to win."
    },
    {
      question: "Can I play Juwa2 on iOS?",
      answer: "Yes! iOS users can install Juwa2 through the official iOS installation guide available on the website, with easy step-by-step instructions."
    },
    {
      question: "How do I get help if I have an issue?",
      answer: "For any technical or account questions, use the Contact Us or Support Chat option inside the app or on the official Juwa2 site.\n\nOur support team responds promptly — without any agents or third-party interference."
    },
    {
      question: "Are there any risks in playing Juwa2?",
      answer: "As with all games of chance, play responsibly. Juwa2 promotes fair play and secure entertainment — not gambling.\n\nAlways play within your limits and follow your local gaming laws."
    }
  ];

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
              <img src="/pictures/icons/logo2.png?v=2" alt="Juwa2Casino" className="w-14 h-14" />
              <span className="font-bold text-lg text-white">
                Juwa2<span className="text-emerald-400">Casino</span>
              </span>
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => window.navigate('/')} className="text-zinc-300 hover:text-white text-sm">Home</button>
            <button onClick={() => window.navigate('/about')} className="text-zinc-300 hover:text-white text-sm">About</button>
            <button onClick={() => window.navigate('/blog')} className="text-zinc-300 hover:text-white text-sm">Blog</button>
            <button onClick={() => window.navigate('/contact')} className="text-emerald-400 font-bold text-sm">Contact Us</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => window.navigate('/contact/faq')} className="hidden md:inline-flex px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-sm text-white">FAQ</button>
            <a href="https://www.facebook.com/people/Clash-Casino-Games/61579792407380/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm">Sign up</a>
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
                className="block w-full text-left text-emerald-400 font-bold py-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-black pt-8 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="text-sm">
              <button 
                onClick={() => window.navigate('/contact')} 
                className="text-zinc-400 hover:text-white"
              >
                Contact
              </button>
              <span className="text-zinc-400 mx-2">&gt;</span>
              <span className="text-white">FAQ</span>
            </nav>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <img src="/pictures/icons/logo2.png?v=2" alt="Juwa2Casino" className="w-48 h-48" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-zinc-800 pb-4">
                <button
                  onClick={() => toggleFAQItem(index)}
                  className="w-full py-4 flex items-center justify-between text-left hover:opacity-80 transition-opacity duration-300"
                >
                  <span className="text-white font-medium text-lg pr-4">
                    {index + 1}. {item.question}
                  </span>
                  {openItems[index] ? (
                    <Minus className="w-5 h-5 text-white flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-white flex-shrink-0" />
                  )}
                </button>
                {openItems[index] && (
                  <div className="pb-4">
                    <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Ready to Play CTA */}
      <section id="cta" className="pt-4 pb-4">
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
              <source src="./videos/footer3.mp4" type="video/mp4" />
            </video>
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/70 rounded-3xl"></div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="rg" className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <img src="/pictures/icons/logo2.png?v=2" alt="Juwa2Casino" className="w-12 h-12" />
              <span className="font-bold text-white">Juwa2<span className="text-emerald-400">Casino</span></span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2 text-emerald-400">Explore</div>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => window.navigate('/')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => window.navigate('/about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => window.navigate('/blog')} className="hover:text-white">Blog</button></li>
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
