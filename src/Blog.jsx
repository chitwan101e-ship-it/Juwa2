import React from 'react';
import { ArrowRight } from 'lucide-react';
import { blogPostsMetadata } from '../blog-posts-metadata';

const [featuredGuide, ...otherGuides] = Object.values(blogPostsMetadata);

export default function Blog() {
  return (
      <div className="bg-zinc-950 text-white">
        <div className="page-width interior">
          <h1 className="page-title">Juwa 2.0 player guides</h1>
          <p className="mt-4 mb-8 max-w-2xl text-zinc-300 text-lg">Explore the stories behind the game covers, learn how keno works, or find Juwa 2.0 support and Juwa777 help for Android and iPhone setup.</p>
          <article>
            <a href={`/blog/${featuredGuide.slug}`} className="group grid md:grid-cols-2 rounded-3xl overflow-hidden border border-emerald-900 bg-zinc-900 hover:border-emerald-400 focus-visible:outline-emerald-300">
              <div className="flex items-center justify-center p-6 sm:p-10 md:order-last" style={{ background: 'radial-gradient(ellipse at center, #265950, #102a28 64%, #101b1c)' }}>
                <img src={featuredGuide.cover} alt={featuredGuide.alt} className="w-full max-w-lg h-auto" width="640" height="304" />
              </div>
              <div className="p-6 md:p-10 self-center">
                <p className="text-xs uppercase tracking-widest font-bold text-emerald-300">{featuredGuide.category}</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight leading-tight">{featuredGuide.title}</h2>
                <p className="mt-4 max-w-md text-zinc-300 leading-relaxed">{featuredGuide.description}</p>
                <span className="secondary-btn card-action mt-6">Read the lobby guide <ArrowRight size={17} /></span>
              </div>
            </a>
          </article>
          <h2 className="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight">Game stories and device guides</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {[...otherGuides].sort((a, b) => (b.published || "").localeCompare(a.published || "")).map(guide => (
              <article key={guide.slug}>
                <a href={`/blog/${guide.slug}`} className="group h-full grid sm:grid-cols-[9rem_1fr] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-emerald-400 focus-visible:outline-emerald-300">
                  <div className="flex items-center justify-center bg-black p-3">
                    <img src={guide.cover} alt={guide.alt} className="w-full h-28 sm:h-auto object-contain" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-emerald-300">{guide.category}</p>
                    <h3 className="mt-2 text-xl font-bold leading-snug group-hover:underline">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">{guide.description}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

  );
}
