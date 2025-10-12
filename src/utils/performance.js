// Edge Performance Optimizations

// Lazy load images for better Edge performance
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources for Edge
export const preloadCriticalResources = () => {
  // Preload fonts
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  link.as = 'style';
  document.head.appendChild(link);

  // Preload critical images
  const criticalImages = [
    '/pictures/icons/logo2.png',
    '/pictures/icons/logo (2).png'
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Optimize animations for Edge
export const optimizeAnimations = () => {
  // Reduce motion for better Edge performance
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }

  // Use transform3d for hardware acceleration
  document.querySelectorAll('.transition-all, .transition-transform').forEach(el => {
    el.style.transform = 'translateZ(0)';
  });
};

// Initialize all optimizations
export const initPerformanceOptimizations = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeAnimations();
      lazyLoadImages();
    });
  } else {
    preloadCriticalResources();
    optimizeAnimations();
    lazyLoadImages();
  }
};

