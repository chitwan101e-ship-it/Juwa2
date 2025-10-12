import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-zinc-300 mt-2">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const About = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const steps = [
    { step: 1, title: "Sign Up", desc: "Set up your account with a quick installation.", image: "signup.png" },
    { step: 2, title: "Claim Bonus", desc: "100% welcome + daily rewards.", image: "claimbonus.png?v=2" },
    { step: 3, title: "Play & Earn", desc: "Collect coins, level up, unlock perks.", image: "play&earn.png" },
    { step: 4, title: "Withdraw", desc: "Fast cash‑outs to your wallet.", image: "withdraw.png?v=2" },
  ];

  const features = [
    { image: "/pictures/icons/fastpayouts.png", title: "Fast Payouts", desc: "Lightning withdrawals to your preferred method." },
    { image: "/pictures/icons/securefair.png", title: "Secure & Fair", desc: "Bank-grade encryption & certified RNG." },
    { image: "/pictures/icons/playanywhere.png", title: "Play Anywhere", desc: "Optimized for iOS, Android, and desktop." },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
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
            <button onClick={() => window.navigate('/about')} className="text-emerald-400 font-bold text-sm">About</button>
            <button onClick={() => window.navigate('/blog')} className="text-zinc-300 hover:text-white text-sm">Blog</button>
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
                className="block w-full text-left text-emerald-400 font-bold py-2"
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

      {/* How It Works Section */}
      <section id="how-it-works" className="pt-16 pb-4 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-96 h-96" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Juwa2 – Play Smarter, Play Freely
            </h1>
            <div className="max-w-5xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                Juwa2 is the upgraded version of the original Juwa game series — built for instant, secure, and agent-free gaming. Enjoy fish shooter, slots, keno, and reels with seamless in-app payments — no agents, no hassle, just you. Experience Vegas-style excitement with instant deposits, fast cash outs, exclusive bonuses, and 24/7 support — all in one trusted social casino platform.
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6">
              How It Works
            </h2>
            <p className="text-zinc-400 text-base">
              Create account · Get bonus · Play games · Redeem winnings
            </p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 mt-12">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center group">
                <div className={`w-40 h-40 mb-4 flex items-center justify-center rounded-2xl transition-colors duration-300 ${
                  s.step === 1 ? 'bg-blue-500/20 group-hover:bg-blue-500/30' :
                  s.step === 2 ? 'bg-cyan-500/20 group-hover:bg-cyan-500/30' :
                  s.step === 3 ? 'bg-teal-500/20 group-hover:bg-teal-500/30' :
                  'bg-emerald-500/20 group-hover:bg-emerald-500/30'
                }`}>
                  <img 
                    src={`./pictures/icons/${s.image}`} 
                    alt={s.title}
                    className="w-full h-full object-contain"
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
                  <div className={`w-full h-full flex items-center justify-center rounded-2xl hidden ${
                    s.step === 1 ? 'bg-blue-500/20' :
                    s.step === 2 ? 'bg-cyan-500/20' :
                    s.step === 3 ? 'bg-teal-500/20' :
                    'bg-emerald-500/20'
                  }`}>
                    <span className={`text-4xl font-bold ${
                      s.step === 1 ? 'text-blue-400' :
                      s.step === 2 ? 'text-cyan-400' :
                      s.step === 3 ? 'text-teal-400' :
                      'text-emerald-400'
                    }`}>Step {s.step}</span>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold text-lg">Step {s.step}</div>
                <div className="mt-2 text-xl font-semibold">{s.title}</div>
                <p className="text-sm text-zinc-400 mt-3 max-w-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile Swipeable View */}
          <div className="md:hidden">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentStep * 100}%)` }}
                >
                  {steps.map((s) => (
                    <div key={s.step} className="w-full flex-shrink-0 flex flex-col items-center text-center px-4">
                  <div className={`w-32 h-32 mb-4 flex items-center justify-center rounded-2xl ${
                    s.step === 1 ? 'bg-blue-500/20' :
                    s.step === 2 ? 'bg-cyan-500/20' :
                    s.step === 3 ? 'bg-teal-500/20' :
                    'bg-emerald-500/20'
                  }`}>
                    <img 
                      src={`./pictures/icons/${s.image}`} 
                      alt={s.title}
                      className="w-full h-full object-contain"
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
                    <div className={`w-full h-full flex items-center justify-center rounded-2xl hidden ${
                      s.step === 1 ? 'bg-blue-500/20' :
                      s.step === 2 ? 'bg-cyan-500/20' :
                      s.step === 3 ? 'bg-teal-500/20' :
                      'bg-emerald-500/20'
                    }`}>
                      <span className={`text-3xl font-bold ${
                        s.step === 1 ? 'text-blue-400' :
                        s.step === 2 ? 'text-cyan-400' :
                        s.step === 3 ? 'text-teal-400' :
                        'text-emerald-400'
                      }`}>Step {s.step}</span>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-base">Step {s.step}</div>
                  <div className="mt-2 text-lg font-semibold">{s.title}</div>
                      <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevStep}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextStep}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800/80 hover:bg-zinc-700/80 rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Swipe Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step - 1)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    step - 1 === currentStep ? 'bg-emerald-400' : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                ></button>
              ))}
            </div>
            
            {/* Navigation Hint */}
            <div className="text-center mt-2">
              <p className="text-xs text-zinc-500">← Use arrows or tap dots to navigate →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why JUWA2 Casino Section */}
      <section className="py-8 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-2 md:mb-4">
              Why JUWA2 Casino?
            </h2>
          </div>

          {/* Mobile Static Grid */}
          <div className="md:hidden">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-black rounded-2xl p-8 text-center">
                  <div className="w-80 h-80 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-72 h-72 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-black rounded-2xl p-8 text-center hover:border-emerald-500/50 transition-colors duration-300">
                <div className="w-96 h-96 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-80 h-80 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Single Subheading for Desktop */}
          <div className="hidden md:block text-center mt-6">
            <p className="text-sm text-zinc-500">Built for speed, fairness, and fun</p>
          </div>
        </div>
      </section>

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
              <source src="./videos/footer3.mp4" type="video/mp4" />
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
              <li><button onClick={() => window.navigate('/about')} className="text-white">About</button></li>
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
};

export default About;
