import React, { useState } from 'react';
import { Menu, MessageCircle, Mail, HelpCircle, ChevronRight } from 'lucide-react';

const Section = ({ id, title, children, subtitle }) => (
  <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-zinc-300 mt-2">{subtitle}</p>}
    </div>
    {children}
  </section>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Message sent successfully!');
    setFormData({ email: '', message: '' });
  };

  const handleSupportClick = (type) => {
    switch(type) {
      case 'chat':
        alert('Opening live chat...');
        break;
      case 'email':
        window.open('mailto:support@juwa2casino.com', '_blank');
        break;
      case 'faq':
        alert('Opening FAQ section...');
        break;
      default:
        break;
    }
  };

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
            <button onClick={() => window.navigate('/blog')} className="text-zinc-300 hover:text-white text-sm">Blog</button>
            <button onClick={() => window.navigate('/contact')} className="text-emerald-400 font-bold text-sm">Contact Us</button>
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
      <main className="min-h-screen bg-black pt-8 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-48 h-48" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact & Support
            </h1>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
            
            {/* Left Column - Contact Form */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-2xl h-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    rows={6}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-zinc-600 resize-none"
                    required
                  />
                </div>

                {/* Send Button */}
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 text-xs"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Support Options */}
            <div className="space-y-4 h-full flex flex-col justify-between">
              
              {/* Live Chat */}
              <div 
                onClick={() => handleSupportClick('chat')}
                className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-zinc-700 group flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors duration-300">Live chat</h3>
                </div>
                <p className="text-zinc-400 text-sm ml-11">Chat with an agent 24/7.</p>
              </div>

              {/* Email Support */}
              <div 
                onClick={() => handleSupportClick('email')}
                className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-zinc-700 group flex-1 flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors duration-300">Email support</h3>
                </div>
                <p className="text-zinc-400 text-sm ml-11">support@juwa2casino.com</p>
              </div>

              {/* FAQ */}
              <div 
                onClick={() => window.navigate('/contact/faq')}
                className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-emerald-500 group flex-1 flex flex-col justify-center hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors duration-300">
                    <HelpCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-white font-semibold text-base group-hover:text-emerald-400 transition-colors duration-300">FAQ</h3>
                  <div className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300 hidden md:block" />
                    <span className="text-red-500 text-sm font-medium md:hidden">Tap to view FAQ →</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm ml-11 group-hover:text-zinc-300 transition-colors duration-300">Payouts, verification, and responsible play.</p>
              </div>

            </div>
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
              <img src="./pictures/icons/logo2.png" alt="Juwa2Casino" className="w-12 h-12" />
              <span className="font-bold text-white">Juwa2<span className="text-emerald-400">Casino</span></span>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2 text-emerald-400">Explore</div>
            <ul className="space-y-2 text-zinc-400">
              <li><button onClick={() => window.navigate('/')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => window.navigate('/about')} className="hover:text-white">About</button></li>
              <li><button onClick={() => window.navigate('/blog')} className="hover:text-white">Blog</button></li>
              <li><button onClick={() => window.navigate('/contact')} className="text-white">Contact Us</button></li>
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
