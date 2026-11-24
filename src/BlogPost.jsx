import { FruitSymbols, KenoNumbers, SupportScreenshot } from './BlogFeatures';
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPostsMetadata } from '../blog-posts-metadata';

function LobbyGuide() {
  const covers = [
    ['Dragon Treasure', 'Look for the dragon’s claws and the orange lettering across a pile of gold.'],
    ['Deep Sea Predator', 'The metal sea creature and bright blue water distinguish this cover from Happy Fishing.'],
    ['Superball Keno', 'The white ball marked 80 sits above three colored tiles. That numbered artwork is a quick way to spot this keno title.'],
  ];
  return (
    <>
      <h2>Find a title by its cover</h2>
      <p>The lobby screenshot above shows the games lined up like arcade cabinets. On the homepage you can browse the same kinds of titles by category. If you remember the artwork better than the name, start with these three covers.</p>
      <ul className="divide-y divide-zinc-800">
        {covers.map(([name, detail]) => (
          <li key={name} className="flex gap-4 items-center py-4">
            <img src={`/pictures/Games/${name}.png`} alt="" width="96" height="72" className="w-20 sm:w-24 object-contain" loading="lazy" />
            <div><h3 className="font-bold text-white">{name}</h3><p>{detail}</p></div>
          </li>
        ))}
      </ul>
      <h2>Browse a whole category</h2>
      <p>Open <a href="/#games">Explore Games</a> on the homepage. The Slots row includes 7 Crystal Clovers and Cherry Valentine. Scroll across Fish &amp; Keno to find Deep Sea Predator and Superball Keno. On a phone, swipe the row sideways. On desktop, use its arrow buttons.</p>
    </>
  );
}

function MobileGuide() {
  return (
    <>
      <h2>Choose the instructions for your phone</h2>
      <p>Start with the operating system on your device. A Samsung Galaxy or Google Pixel uses Android. An iPhone uses iOS. If a download page offers both choices, select the one that matches your phone.</p>
      <h2>On Android</h2>
      <p>An APK is the file Android uses to install an app. Downloading the file and opening the installed app are separate steps. If the download has finished but you still see the webpage, check your browser’s downloads list for the file.</p>
      <p>The <a href="/blog/juwa-2-0-apk-android-guide">Android APK and sign-in guide</a> walks through what to look for next.</p>
      <h2>On iPhone or iPad</h2>
      <p>Use the iOS option supplied by your provider. An Android APK won’t open on an iPhone or iPad. If the page only offers an APK, ask support whether there is a supported iOS option for your device.</p>
      <h2>If setup stops midway</h2>
      <p>When you <a href="/contact">contact support</a>, include your phone model, operating system version, and the exact message on screen. Mention whether you were opening a link, installing the app, or signing in. That detail tells support which step to check.</p>
    </>
  );
}

function AndroidGuide() {
  return (
    <>
      <h2>Find the APK you downloaded</h2>
      <p>Open the downloads list in the browser you used. Find the Juwa file and check that the download has finished. You can also look in the Downloads folder in your phone’s file manager. A partial download can look like a finished file at first glance.</p>
      <h2>Open the app</h2>
      <p>Use the package supplied by your provider and follow your phone’s installation prompts. If Android shows a warning or says the package is incompatible, record the message and ask your provider to confirm the correct version for your phone.</p>
      <p>After installation, open Juwa from your apps list. If the installer opens again, you’ve tapped the downloaded file. Go back to the apps list and look for the Juwa icon.</p>
      <h2>Use your existing account</h2>
      <p>At the sign-in screen, enter the username and password for your Juwa account. Check capitalization and any extra spaces if you pasted the username. For a forgotten password, use your provider’s recovery option or <a href="/contact">contact support</a>.</p>
    </>
  );
}

const articles = {
  'why-slots-use-fruit-symbols': FruitSymbols,
  'keno-numbers-explained': KenoNumbers,
  'screenshot-juwa-support': SupportScreenshot,
  'juwa-2-0-complete-guide': LobbyGuide,
  'juwa-2-0-download-guide': MobileGuide,
  'juwa-2-0-apk-android-guide': AndroidGuide,
};

export default function BlogPost({ slug }) {
  const post = blogPostsMetadata[slug];
  const Content = articles[slug];
  return (
      <div className="bg-zinc-950 px-4 py-10 sm:px-6 md:py-14 text-white">
        <div className="max-w-3xl mx-auto">
          <a href="/blog" className="secondary-btn"><ArrowLeft size={16} /> All player guides</a>
          {post && Content ? (
            <article>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-300">{post.category}</p>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
              <p className="mt-4 text-lg text-zinc-300">{post.description}</p>
              <div className="mt-7 bg-zinc-900 rounded-2xl p-5 flex justify-center">
                <img src={post.cover} alt={post.alt} className="w-full max-w-lg h-auto object-contain" />
              </div>
              <div className="guide-copy"><Content /></div>
              <nav aria-label="Related guides" className="mt-10 border-t border-zinc-700 pt-6">
                <h2 className="font-bold text-xl mb-3">More player guides</h2>
                {Object.values(blogPostsMetadata).filter(item => item.slug !== slug).map(item => (
                  <a key={item.slug} href={`/blog/${item.slug}`} className="text-link related-link">{item.title} <ArrowRight size={16} /></a>
                ))}
              </nav>
            </article>
          ) : <h1 className="mt-8 text-3xl font-bold">Guide unavailable</h1>}
        </div>
      </div>
  );
}
