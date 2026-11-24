import React from 'react';
import { agentSite, telegram } from './SiteLayout';

export default function FloatingMessenger() {
  return <aside className="chat-widget" aria-label="Message support">
    <a className="chat-message" href={agentSite} target="_blank" rel="noopener noreferrer" aria-label="Message">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2c-5.2 0-9.4 3.5-9.4 7.8 0 2.5 1.4 4.7 3.6 6.1-.2 1.1-.7 2.4-1.6 3.3 1.8-.1 3.4-.9 4.4-1.6.9.3 1.9.4 3 .4 5.2 0 9.4-3.5 9.4-7.8S17.2 3.2 12 3.2z" /></svg>
      <span className="chat-badge" aria-hidden="true">1</span>
    </a>
    <a className="chat-telegram" href={telegram} target="_blank" rel="noopener noreferrer" aria-label="Message on Telegram">
      <img src="/pictures/icons/telegram-svgrepo-com.svg" alt="" />
    </a>
  </aside>;
}
