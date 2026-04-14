(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll
  const revealItems = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // Gallery filters + a11y states
  const filterButtons = document.querySelectorAll('.filter');
  const tiles = document.querySelectorAll('.tile');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const current = button.dataset.filter;

      filterButtons.forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      tiles.forEach((tile) => {
        const visible = current === 'all' || tile.dataset.category === current;
        tile.classList.toggle('is-hidden', !visible);
      });
    });
  });

  // Mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();