// CodeMaster SK — Routing Engine & Navigation Controller
(function() {
  const pages = document.querySelectorAll('.page');
  const navLinkEls = document.querySelectorAll('[data-route]');
  const announcer = document.getElementById('routeAnnouncer');
  const validRoutes = Array.prototype.map.call(pages, function(p) { return p.id; });
  const scrollMemory = {};

  const baseDesc = document.querySelector('meta[name="description"]');
  const routeMeta = {
    home:     { path: '/',            title: 'CodeMaster SK — Build. Design. Grow.', desc: 'CodeMaster SK is a digital solutions studio building websites, custom web applications, UI/UX and AI-powered systems for startups, local businesses, schools and founders.' },
    services: { path: '/services',    title: 'Services — CodeMaster SK', desc: 'Business websites, custom web applications, UI/UX design, AI solutions and branding — the five service lines CodeMaster SK builds.' },
    portfolio:{ path: '/portfolio',   title: 'Portfolio — CodeMaster SK', desc: 'Case studies from CodeMaster SK: student portals, business websites and AI-assisted platforms built for real clients.' },
    pricing:  { path: '/pricing',     title: 'Pricing — CodeMaster SK', desc: 'Straightforward pricing tiers for starter websites, business websites and custom web applications.' },
    process:  { path: '/process',     title: 'Our Process — CodeMaster SK', desc: 'How CodeMaster SK plans, designs, builds and ships every project, from discovery to launch and support.' },
    contact:  { path: '/contact',     title: 'Contact — CodeMaster SK', desc: 'Get a free consultation with CodeMaster SK for your next website, web application or digital product.' },
    privacy:  { path: '/privacy',     title: 'Privacy Policy — CodeMaster SK', desc: 'Privacy Policy for CodeMaster SK digital solutions studio.' },
    terms:    { path: '/terms',       title: 'Terms of Service — CodeMaster SK', desc: 'Terms of Service for CodeMaster SK digital solutions studio.' },
    refunds:  { path: '/refunds',     title: 'Refund Policy — CodeMaster SK', desc: 'Refund Policy for CodeMaster SK digital solutions studio.' },
    'case':   { path: null,           title: 'Case Study — CodeMaster SK', desc: 'A CodeMaster SK case study.' },
    notfound: { path: null,           title: 'Page not found — CodeMaster SK', desc: 'The page you were looking for could not be found.' }
  };

  // Centralized Configuration for dynamic Domain settings
  window.SITE_CONFIG = {
    domain: 'sk-mallick.github.io/codemaster-sk',
    canonicalBase: 'https://sk-mallick.github.io/codemaster-sk/',
    // Google Sheets ("Excel") backend: paste your deployed Apps Script Web App
    // URL here (…/exec) to log every submission to a spreadsheet. Leave blank
    // to fall back to FormSubmit email delivery. See SHEETS_BACKEND.md.
    sheetsEndpoint: ''
  };

  function slugify(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function safe(fn) { try { fn(); } catch (err) { /* sandboxed preview fallback */ } }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function safeExternalUrl(value) {
    if (!value || value === '#') return '';
    try {
      const parsed = new URL(value, window.location.href);
      return (parsed.protocol === 'https:' || parsed.protocol === 'http:') ? parsed.href : '';
    } catch (err) { return ''; }
  }

  function routePath(name, slug) {
    if (name === 'case') return '/portfolio/' + encodeURIComponent(slug || '');
    if (name === 'home') return '/';
    return routeMeta[name] && routeMeta[name].path ? routeMeta[name].path : '/notfound';
  }

  function routeUrl(name, slug) { return '#' + routePath(name, slug); }

  function setMeta(title, desc, path) {
    safe(function() {
      document.title = title;
      if (baseDesc && desc) baseDesc.setAttribute('content', desc);
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink && window.SITE_CONFIG && path) {
        canonicalLink.setAttribute('href', window.SITE_CONFIG.canonicalBase.replace(/\/$/, '') + path);
      }
    });
  }

  // name is a route id ('home','services',... or 'case'); slug is only used for 'case'
  function pushUrl(name, slug) {
    safe(function() {
      scrollMemory[currentPath()] = window.scrollY;
      history.pushState({ route: name, slug: slug || null }, '', routeUrl(name, slug));
    });
  }

  function currentPath() {
    let p = '/';
    safe(function() {
      if (location.hash && location.hash.indexOf('#/') === 0) {
        p = location.hash.slice(1) || '/';
      } else {
        p = location.pathname || '/';
        if (/\/index\.html$/i.test(p)) p = '/';
      }
    });
    return p;
  }

  function showPage(name, opts) {
    opts = opts || {};
    if (validRoutes.indexOf(name) === -1) name = 'notfound';
    if (name !== 'case') {
      window.currentActiveProjectIdx = null;
    }
    pages.forEach(function(p) {
      p.classList.toggle('active', p.id === name);
    });
    navLinkEls.forEach(function(a) {
      const isActive = a.getAttribute('data-route') === name;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    if (window.setMobileMenu) window.setMobileMenu(false);

    // Defer scroll reset, resizing, and ScrollTrigger refresh to the next frame
    window.requestAnimationFrame(function() {
      const hasRestoreScroll = typeof opts.restoreScroll === 'number';
      if (window.lenisInstance && typeof window.lenisInstance.scrollTo === 'function') {
        if (typeof window.lenisInstance.resize === 'function') window.lenisInstance.resize();
        const targetScroll = hasRestoreScroll ? opts.restoreScroll : 0;
        window.lenisInstance.scrollTo(targetScroll, { immediate: true });
      } else {
        if (hasRestoreScroll) {
          window.scrollTo(0, opts.restoreScroll);
        } else {
          window.scrollTo(0, 0);
        }
      }

      // Refresh GSAP ScrollTriggers since DOM dimensions changed
      if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
        ScrollTrigger.refresh();
      }

      if (window.revealCheck) window.revealCheck();
      if (window.updateProgress) window.updateProgress();

      // Focus management for accessible page changes: Move focus to the active page container
      const activePage = document.querySelector('.page.active');
      if (activePage) {
        activePage.setAttribute('tabindex', '-1');
        activePage.focus({ preventScroll: true });
      }
    });

    if (announcer) {
      if (name === 'notfound') {
        announcer.textContent = 'Page not found';
      } else if (name === 'case') {
        const currentProj = window.projects[window.currentActiveProjectIdx];
        announcer.textContent = currentProj ? (currentProj.title + ' case study loaded') : 'Case study loaded';
      } else {
        announcer.textContent = name.charAt(0).toUpperCase() + name.slice(1) + ' page loaded';
      }
    }
  }

  // navigate(name, slug) is the single entry point for every internal nav action
  function navigate(name, slug, opts) {
    opts = opts || {};
    const path = routePath(name, slug);
    if (name === 'case') {
      const meta = routeMeta[name] || {};
      setMeta((meta.title || 'Case Study — CodeMaster SK'), meta.desc, path);
    } else {
      const m = routeMeta[name] || routeMeta.notfound;
      setMeta(m.title, m.desc, path);
    }
    if (!opts.skipPush) pushUrl(name, slug);
    showPage(name, opts);
  }

  function resolveRouteFromPath(path) {
    if (path === '/' || path === '') return { name: 'home' };
    const portfolioMatch = path.match(/^\/portfolio\/([^\/]+)\/?$/);
    if (portfolioMatch) return { name: 'case', slug: portfolioMatch[1] };
    const clean = path.replace(/\/$/, '');
    for (const key in routeMeta) {
      if (routeMeta[key].path && routeMeta[key].path === clean) return { name: key };
    }
    return { name: 'notfound' };
  }

  function applyHistoryRoute(route) {
    if (route.name === 'case' && route.slug && window.openCaseBySlug) {
      if (!window.openCaseBySlug(route.slug, { skipPush: true, restoreScroll: scrollMemory[currentPath()] || 0 })) {
        navigate('notfound', null, { skipPush: true, restoreScroll: scrollMemory[currentPath()] || 0 });
      }
    } else {
      navigate(route.name, null, { skipPush: true, restoreScroll: scrollMemory[currentPath()] || 0 });
    }
  }

  window.addEventListener('popstate', function(e) {
    applyHistoryRoute((e.state && e.state.route) ? e.state : resolveRouteFromPath(currentPath()));
  });

  window.addEventListener('hashchange', function() {
    const route = resolveRouteFromPath(currentPath());
    const state = history.state;
    if (state && state.route === route.name && (state.slug || null) === (route.slug || null)) return;
    applyHistoryRoute(route);
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-route]').forEach(function(a) {
      const routeName = a.getAttribute('data-route');
      if (a.tagName === 'A') {
        a.setAttribute('href', routeUrl(routeName));
      }
      a.style.cursor = 'pointer';
      a.addEventListener('click', function(e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(routeName);
      });
      a.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          navigate(routeName);
        }
      });
    });
  });

  // Expose routing helpers globally
  window.navigate = navigate;
  window.slugify = slugify;
  window.safe = safe;
  window.escapeHtml = escapeHtml;
  window.safeExternalUrl = safeExternalUrl;
  window.resolveRouteFromPath = resolveRouteFromPath;
  window.currentPath = currentPath;
  window.routeUrl = routeUrl;
  window.scrollMemory = scrollMemory;
})();
