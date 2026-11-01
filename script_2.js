(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const projectTrack = document.getElementById('projectGrid');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
  // The CDN script is deferred in <head>; this guarantees icons are drawn after it executes.
  window.addEventListener('load', refreshIcons, { once: true });
  if (document.readyState === 'complete') refreshIcons();

  document.getElementById('year').textContent = new Date().getFullYear();

  function closeMenu({ returnFocus = false } = {}) {
    const wasOpen = navLinks.classList.contains('open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    refreshIcons();
    if (returnFocus && wasOpen) menuToggle.focus();
  }
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.innerHTML = open
      ? '<i data-lucide="x" aria-hidden="true"></i>'
      : '<i data-lucide="menu" aria-hidden="true"></i>';
    refreshIcons();
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu({ returnFocus: true });
  });

  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 480);
  }, { passive: true });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
  }

  const prevButton = document.getElementById('projectsPrev');
  const nextButton = document.getElementById('projectsNext');
  const statusLabel = document.getElementById('projectsStatus');

  /* Scroll-driven carousel: the section is pinned while vertical page scroll
     moves the cards sideways. The page only continues down after the last card. */
  const pinWrap = document.getElementById('workPinWrap');
  const pin = document.getElementById('workPin');
  const navWrap = document.querySelector('.nav-wrap');
  projectTrack.querySelectorAll('.project-card').forEach(card => card.classList.add('in-view'));
  statusLabel.textContent = 'Scroll to explore projects';

  let maxShift = 0;
  let stickTop = 0;
  let frame = 0;
  let lastW = 0;
  let lastH = 0;

  const mobileRail = window.matchMedia('(max-width: 760px), (hover: none) and (pointer: coarse)');
  function measure() {
    if (mobileRail.matches) {
      lastW = window.innerWidth; lastH = window.innerHeight;
      pinWrap.style.height = ''; pin.style.height = ''; pin.style.minHeight = ''; pin.style.top = '';
      maxShift = 0; prevButton.disabled = false; nextButton.disabled = false; return;
    }
    const navH = navWrap ? navWrap.offsetHeight : 0;
    const viewH = window.innerHeight;
    lastW = window.innerWidth;
    lastH = viewH;
    // Pin sizes itself to its content (never smaller than the free viewport),
    // so cards can never spill into the section below.
    pin.style.height = 'auto';
    pin.style.minHeight = (viewH - navH) + 'px';
    const pinH = pin.offsetHeight;
    // If the content is taller than the screen, pin it so its bottom edge stays visible.
    stickTop = pinH <= viewH - navH ? navH : viewH - pinH;
    pin.style.top = stickTop + 'px';
    projectTrack.scrollLeft = 0;
    maxShift = Math.max(0, projectTrack.scrollWidth - projectTrack.clientWidth);
    pinWrap.style.height = (pinH + maxShift) + 'px';
    update();
  }
  function update() {
    frame = 0;
    if (maxShift <= 0) return;
    const scrolled = stickTop - pinWrap.getBoundingClientRect().top;
    const progress = Math.min(1, Math.max(0, scrolled / maxShift));
    projectTrack.scrollLeft = progress * maxShift;
    prevButton.disabled = progress <= 0.001;
    nextButton.disabled = progress >= 0.999;
  }
  function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }

  function pageYForShift(shift) {
    const wrapTop = pinWrap.getBoundingClientRect().top + window.scrollY;
    return wrapTop - stickTop + Math.min(maxShift, Math.max(0, shift));
  }
  function moveByCard(direction) {
    if (mobileRail.matches) {
      const c = projectTrack.querySelector('.project-card');
      const g = parseFloat(getComputedStyle(projectTrack).columnGap) || 0;
      projectTrack.scrollBy({ left: direction * ((c ? c.getBoundingClientRect().width : 320) + g), behavior: 'smooth' });
      return;
    }
    const firstCard = projectTrack.querySelector('.project-card');
    const gap = parseFloat(getComputedStyle(projectTrack).columnGap) || 0;
    const step = (firstCard ? firstCard.getBoundingClientRect().width : 320) + gap;
    const snapped = Math.round(projectTrack.scrollLeft / step) * step;
    window.scrollTo({ top: pageYForShift(snapped + direction * step), behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  prevButton.addEventListener('click', () => moveByCard(-1));
  nextButton.addEventListener('click', () => moveByCard(1));
  projectTrack.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveByCard(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); moveByCard(-1); }
  });
  // Keyboard users tabbing to a card link bring that card into view.
  projectTrack.addEventListener('focusin', event => {
    const card = event.target.closest && event.target.closest('.project-card');
    if (!card || mobileRail.matches) return;
    const left = card.getBoundingClientRect().left - projectTrack.getBoundingClientRect().left + projectTrack.scrollLeft;
    window.scrollTo({ top: pageYForShift(left), behavior: 'auto' });
  });

  window.addEventListener('scroll', requestUpdate, { passive: true });
  // Ignore small height-only changes (mobile address bar) to avoid jitter while scrolling.
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastW || Math.abs(window.innerHeight - lastH) > 150) measure();
  }, { passive: true });
  window.addEventListener('load', measure, { once: true });
  if (mobileRail.addEventListener) mobileRail.addEventListener('change', () => measure());
  // Re-measure when content size changes (fonts, icons, title-fit script).
  if ('ResizeObserver' in window) {
    let lastPinContent = 0;
    new ResizeObserver(() => {
      const h = pin.firstElementChild ? pin.firstElementChild.offsetHeight : 0;
      if (Math.abs(h - lastPinContent) > 1) { lastPinContent = h; measure(); }
    }).observe(pin.firstElementChild);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();

  document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const note = document.getElementById('formNote');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const destination = 'subhammallick454@gmail.com';
    const service = form.elements.service.value;
    const subject = encodeURIComponent('Portfolio enquiry — ' + service);
    const body = encodeURIComponent(`Hi Subham,\n\n${form.elements.message.value.trim()}\n\nName: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nService: ${service}`);
    note.textContent = 'Your email draft is being prepared. Check your email app and press Send to deliver the enquiry.';
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  });

  // Draw library icons as soon as the CDN is ready; footer icons are inline SVGs
  // so they never flash blank while the library downloads.
  const lucideScript = document.querySelector('script[src*="lucide"]');
  if (lucideScript) lucideScript.addEventListener('load', refreshIcons, { once: true });
  refreshIcons();

  const splash = document.getElementById('introSplash');
  let introDone = false;
  const finishIntro = () => {
    if (!splash || introDone) return;
    introDone = true;
    splash.classList.add('is-done');
    document.documentElement.classList.add('intro-done');
    document.body.classList.remove('is-loading');
    window.setTimeout(() => splash.remove(), 1100);
  };
  if (reducedMotion) {
    finishIntro();
  } else {
    // Let the animation play fully (min 1.8s), wait for the page to load, never exceed 3.2s.
    const startedAt = performance.now();
    const MIN_SHOW = 1800;
    const whenReady = () => window.setTimeout(finishIntro, Math.max(0, MIN_SHOW - (performance.now() - startedAt)));
    if (document.readyState === 'complete') whenReady();
    else window.addEventListener('load', whenReady, { once: true });
    window.setTimeout(finishIntro, 3200);
  }
})();