import React from 'react';
import { ArrowRight } from 'lucide-react';

const topics = [
  { title: 'Discover the games', text: 'Compare the cover art and browse titles by category, from colorful reels to underwater arcade games.', link: '/games', action: 'Browse games', art: 'Games/Deep Sea Predator.png' },
  { title: 'Set up your phone', text: 'Find the guide for your device, learn where Android downloads go, and get help reaching the sign-in screen.', link: '/blog/juwa-2-0-download-guide', action: 'Read the setup guide', art: 'icons/juwa2.webp' },
  { title: 'Find an answer', text: 'Start with the common questions about your account or get in touch with the support team.', link: '/contact/faq', action: 'Visit the FAQ', art: 'icons/Juwa2.0_interface-1536x691.webp' },
];

export default function About() {
  return <div className="page-width interior">
    <div className="about-lead"><div><h1 className="page-title">About Juwa2Casino</h1><p className="page-intro">A guide to the Juwa 2.0 game lobby and Juwa777 support. Explore the game artwork, learn how to get started on mobile, and contact Juwa 2.0 support for your account.</p></div>
      <div className="about-art"><img src="/pictures/icons/juwa2 (1).webp" alt="Juwa game cabinets in the mobile lobby" /></div>
    </div>
    <h2 className="subheading">Explore Juwa 2.0</h2>
    <div className="about-grid">{topics.map(topic => <a key={topic.link} href={topic.link} className="about-card">
      <div className="about-card-art"><img loading="lazy" src={'/pictures/' + topic.art} alt="" /></div>
      <div className="about-card-copy"><h3>{topic.title}</h3><p>{topic.text}</p><span className="secondary-btn card-action">{topic.action} <ArrowRight size={16} /></span></div>
    </a>)}</div>
  </div>;
}
