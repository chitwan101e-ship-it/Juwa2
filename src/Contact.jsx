import React from 'react';
import { ArrowRight, Mail, MessageCircle, BookOpen, Send } from 'lucide-react';
import { facebook, telegram } from './SiteLayout';

export default function Contact() {
  return <div className="page-width interior">
    <h1 className="page-title">Juwa 2.0 support and Juwa777 support</h1>
    <p className="page-intro">This is the Juwa 2.0 support page for login help, download questions, and account issues. Juwa777 support uses the same form and email. Include your device and what you see on screen, and do not send your password.</p>
    <div className="contact-grid">
      <form action="https://formsubmit.co/Venneshahumb@gmail.com" method="POST" className="contact-form">
        <h2>Send a message</h2>
        <input type="hidden" name="_subject" value="New Contact Form Submission from Juwa2Casino" />
        <input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_template" value="table" />
        <label htmlFor="email">Your email</label><input type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" required />
        <label htmlFor="message">Message</label><textarea name="message" id="message" rows="5" required placeholder="What can we help you with?" />
        <button className="primary-btn" type="submit">Send message <ArrowRight size={16} /></button>
      </form>
      <section aria-labelledby="other-help"><h2 id="other-help" className="contact-aside-title">Other ways to get help</h2>
        <div className="support-links">
          <a href={facebook} target="_blank" rel="noopener noreferrer"><MessageCircle /><div><strong>Facebook</strong><span>Message Juwa Jackpot Quest for Juwa 2.0 support.</span></div><ArrowRight size={16} /></a>
          <a href={telegram} target="_blank" rel="noopener noreferrer"><Send /><div><strong>Telegram</strong><span>Message @juwa2go for Juwa777 support.</span></div><ArrowRight size={16} /></a>
          <a href="mailto:support@juwa2casino.com"><Mail /><div><strong>Juwa customer support email</strong><span>support@juwa2casino.com</span></div><ArrowRight size={16} /></a>
          <a href="/contact/faq"><BookOpen /><div><strong>Juwa 2.0 support FAQ</strong><span>Login, download, and account answers.</span></div><ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  </div>;
}
