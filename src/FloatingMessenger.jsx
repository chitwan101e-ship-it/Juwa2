import React from 'react';

export default function FloatingMessenger() {
  const handleMessengerClick = () => {
    // Open Facebook Messenger - links to Juwa Jackpot Quest page
    window.open('https://www.facebook.com/people/Juwa-Jackpot-quest/61584448090525/?mibextid=wwXIfr&rdid=LxxlfG7JeVDYrcCU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1G81hrse4X%2F%3Fmibextid%3DwwXIfr', '_blank', 'noopener,noreferrer');
  };

  const handleTelegramClick = () => {
    // Open Telegram - @juwa2go handle
    window.open('https://t.me/juwa2go', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Messenger Icon Button */}
      <div 
        className="relative cursor-pointer group"
        onClick={handleMessengerClick}
      >
        {/* Notification Badge (optional) */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white text-xs font-bold">1</span>
        </div>
        
        {/* Messenger Icon Button */}
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 p-2">
          <img 
            src="/pictures/icons/Messenger_Icon_Primary_Blue.svg" 
            alt="Messenger" 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Failed to load Messenger icon:', e.target.src);
            }}
          />
        </div>
      </div>

      {/* Telegram Icon Button */}
      <div 
        className="relative cursor-pointer group"
        onClick={handleTelegramClick}
      >
        {/* Telegram Icon Button */}
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 p-2">
          <img 
            src="/pictures/icons/telegram-svgrepo-com.svg" 
            alt="Telegram" 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Failed to load Telegram icon:', e.target.src);
            }}
          />
        </div>
      </div>
    </div>
  );
}

