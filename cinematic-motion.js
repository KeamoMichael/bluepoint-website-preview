(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const hero = document.querySelector('.hero-two');
  if (hero) {
    hero.classList.add('hero-arriving');
    const settle = () => hero.classList.add('hero-arrived');
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => requestAnimationFrame(() => requestAnimationFrame(settle)));
    window.addEventListener('pageshow', event => {
      if (event.persisted) hero.classList.add('hero-arrived');
    });
  }
  const sections = [
    ['#services', '.section-head > *, .service'],
    ['#approach', ':scope > div:first-child > *, .steps > *'],
    ['#about', '.about-heading > *, .about-copy > *'],
    ['.contact', ':scope > *']
  ];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.motion-reveal').forEach(element => element.classList.add('is-revealed'));
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
  sections.forEach(([selector, children]) => {
    const section = document.querySelector(selector);
    if (!section) return;
    section.querySelectorAll(children).forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${(selector === ".hero-two" ? 300 : 100) + Math.min(index, 4) * 190}ms`);
      element.classList.add('motion-reveal');
    });
    observer.observe(section);
  });
  reduced.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.motion-reveal').forEach(element => element.classList.add('is-revealed'));
  });
})();
