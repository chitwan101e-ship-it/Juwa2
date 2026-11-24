import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { faqTopics } from './faqTopics';

export default function FAQ() {
  return <div className="page-width interior">
    <h1 className="page-title">Juwa 2.0 support FAQ</h1>
    <p className="page-intro">Answers for Juwa 2.0 support and Juwa777 support, including login help, phone setup, and how to reach Juwa customer support.</p>
    <div className="faq-grid"><nav className="topic-nav" aria-label="FAQ topics">{faqTopics.map((topic, index) => <a key={topic.title} href={'#topic-' + (index + 1)}>{topic.title} <ArrowRight size={15} /></a>)}</nav>
      <div>{faqTopics.map((topic, index) => <section className="faq-section" key={topic.title} id={'topic-' + (index + 1)}>
        <h2>{topic.title}</h2>
        {topic.items.map(([question, answer, link, action]) => <details key={question}><summary>{question}<Plus size={18} /></summary><div className="faq-answer"><p>{answer}</p>{link && <a className="text-link" href={link}>{action} <ArrowRight size={15} /></a>}</div></details>)}
      </section>)}<a className="secondary-btn" href="/contact">Contact Juwa 2.0 support <ArrowRight size={16} /></a></div>
    </div>
  </div>;
}
