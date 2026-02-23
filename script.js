/* ═══════════════════════════════════════════
   LIMINAL SPACES — INTERACTIONS
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion or no IO support, show everything immediately
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* --- Gallery Category Filtering --- */
  const filterButtons = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterButtons.forEach((b) => b.classList.remove('gallery__filter--active'));
      btn.classList.add('gallery__filter--active');

      // Filter items
      galleryItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  /* --- Hero Parallax (mouse-driven depth) --- */
  const heroImg = document.querySelector('.hero__img');
  const hero = document.querySelector('.hero');

  if (heroImg && hero && !prefersReducedMotion) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `scale(1.05) translate(${x * -12}px, ${y * -12}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroImg.style.transform = '';
    });
  }

  /* --- Smooth Scroll for Internal Links --- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Experience Section: Ambient Background Shift --- */
  const experienceSection = document.querySelector('.experience');
  const ambientEl = document.querySelector('.experience__ambient');

  if (experienceSection && ambientEl && !prefersReducedMotion) {
    const ambientObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ambientEl.style.animationPlayState = 'running';
          } else {
            ambientEl.style.animationPlayState = 'paused';
          }
        });
      },
      { threshold: 0.1 }
    );

    ambientObserver.observe(experienceSection);
  }
})();
