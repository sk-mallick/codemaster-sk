// CodeMaster SK — Main Interactive Controller
(function() {
  // ---------- MOTION PREFERENCE ----------
  const prefersReducedMotionGlobal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateNavHeight() {
    const nav = document.querySelector('.nav');
    if (nav) {
      document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
    }
  }

  // ---------- ICONS (Lucide) ----------
  function refreshIcons() {
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  // ---------- MOBILE MENU ----------
  const burgerBtn = document.getElementById('burgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');
  
  function setMobileMenu(open) {
    if (!mobilePanel) return;
    mobilePanel.classList.toggle('open', !!open);
    mobilePanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('menu-open', !!open);
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const links = mobilePanel.querySelectorAll('a');
      if (links.length > 0) links[0].focus();
    }
  }
  window.setMobileMenu = setMobileMenu;

  if (burgerBtn) {
    burgerBtn.addEventListener('click', function() {
      setMobileMenu(!mobilePanel.classList.contains('open'));
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobilePanel && mobilePanel.classList.contains('open')) {
      setMobileMenu(false);
      if (burgerBtn) burgerBtn.focus();
    }
  });
  if (mobilePanel) {
    mobilePanel.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        const links = Array.prototype.slice.call(mobilePanel.querySelectorAll('a'));
        if (links.length > 0) {
          const first = links[0];
          const last = links[links.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      }
    });
  }

  // ---------- TESTIMONIAL SLIDER ----------
  (function() {
    const wrap = document.querySelector('.testi-track-wrap');
    const track = document.getElementById('testiTrack');
    const dotsEl = document.getElementById('testiDots');
    if (!wrap || !track || !dotsEl) return;
    const slides = Array.prototype.slice.call(track.children);
    let idx = 0, autoplayTimer = null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    slides.forEach(function(slide, i) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.setAttribute('aria-controls', 'testi-slide-' + (i + 1));
      b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      b.addEventListener('click', function() { goTo(i); restartAutoplay(); });
      dotsEl.appendChild(b);
    });
    const dots = Array.prototype.slice.call(dotsEl.children);

    function needsSlider() { return track.scrollWidth > wrap.clientWidth + 4; }

    function update() {
      if (!needsSlider()) {
        track.style.transform = 'translateX(0)';
        dotsEl.style.display = 'none';
        slides.forEach(function(s) { s.removeAttribute('aria-hidden'); });
        return;
      }
      dotsEl.style.display = '';
      const slideW = slides[0].getBoundingClientRect().width;
      track.style.transform = 'translateX(-' + (idx * slideW) + 'px)';
      dots.forEach(function(d, i) {
        const isActive = i === idx;
        d.classList.toggle('active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      slides.forEach(function(s, i) {
        if (i === idx) {
          s.removeAttribute('aria-hidden');
        } else {
          s.setAttribute('aria-hidden', 'true');
        }
      });
    }
    function goTo(i) { idx = (i + slides.length) % slides.length; update(); }
    function next() { goTo(idx + 1); }
    function startAutoplay() {
      if (prefersReduced || !needsSlider() || autoplayTimer) return;
      autoplayTimer = setInterval(next, 5000);
    }
    function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    wrap.addEventListener('mouseenter', stopAutoplay);
    wrap.addEventListener('mouseleave', startAutoplay);
    wrap.addEventListener('focusin', stopAutoplay);
    wrap.addEventListener('focusout', startAutoplay);

    // touch swipe
    let startX = 0, deltaX = 0, dragging = false;
    wrap.addEventListener('touchstart', function(e) {
      dragging = true; startX = e.touches[0].clientX; deltaX = 0; stopAutoplay();
    }, { passive: true });
    wrap.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    wrap.addEventListener('touchend', function() {
      if (!dragging) return;
      dragging = false;
      if (deltaX > 40) goTo(idx - 1);
      else if (deltaX < -40) goTo(idx + 1);
      startAutoplay();
    });

    const sliderContainer = document.getElementById('testiSlider');
    if (sliderContainer) {
      sliderContainer.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          goTo(idx + 1);
          restartAutoplay();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          goTo(idx - 1);
          restartAutoplay();
        }
      });
    }

    window.addEventListener('resize', update);
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });
    update();
    startAutoplay();
  })();

  // ---------- CASE STUDY RENDERER ----------
  const techIcon = {
    'Next.js':'triangle','React':'atom','Tailwind':'wind','Java Servlets':'coffee','PHP':'code-2','MySQL':'database',
    'Firebase':'flame','Cloudflare':'cloud','Figma':'figma','GitHub':'github','JavaScript':'braces','HTML/CSS/JS':'globe',
    'Node.js':'hexagon','Python':'terminal','Google Apps Script':'file-code','Android':'smartphone','Netlify':'diamond','Vercel':'triangle','TypeScript':'braces'
  };

  const processSteps = [
    { n: '01', t: 'Research' }, { n: '02', t: 'Wireframe' }, { n: '03', t: 'UI Design' }, { n: '04', t: 'Frontend' },
    { n: '05', t: 'Backend' }, { n: '06', t: 'Testing' }, { n: '07', t: 'Deployment' }
  ];

  function buildProjectGrid() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;
    window.projects.forEach(function(p, idx) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'project-card reveal';
      card.setAttribute('aria-label', 'Open case study: ' + p.title);
      card.innerHTML =
        '<div class="pc-visual">' + window.escapeHtml(p.type) + '</div>' +
        '<div class="pc-body">' +
          '<span class="pc-tag mono">// ' + window.escapeHtml(p.tag) + '</span>' +
          '<h4>' + window.escapeHtml(p.title) + '</h4>' +
          '<p>' + window.escapeHtml(p.subtitle) + '</p>' +
          '<div class="pc-cta"><span>View case study</span><span class="arrow"><i data-lucide="arrow-right"></i></span></div>' +
        '</div>';
      card.addEventListener('click', function() { window.openCase(idx); });
      projectGrid.appendChild(card);
    });
    refreshIcons();
  }

  let currentDevice = 'desktop';

  function renderCaseIframe(idx) {
    const p = window.projects[idx];
    if (!p) return;
    const liveUrl = window.safeExternalUrl(p.live);
    const iframe = document.getElementById('csIframe');
    const overlay = document.getElementById('iframeOverlay');
    const directLink = document.getElementById('csLiveBtnDirect');
    const overlayMessage = document.getElementById('iframeOverlayMessage');
    const overlayActions = document.getElementById('iframeConsentActions');
    const previewOverlay = document.getElementById('lpOverlay');
    const frame = document.getElementById('livePreviewFrame');

    if (frame) {
      frame.classList.remove('tablet', 'mobile', 'interactive', 'no-preview');
      if (!liveUrl) frame.classList.add('no-preview');
    }
    document.querySelectorAll('.device-switch button').forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-device') === 'desktop');
    });
    if (directLink) {
      directLink.href = liveUrl || '#';
      directLink.classList.toggle('is-disabled', !liveUrl);
      directLink.setAttribute('aria-disabled', liveUrl ? 'false' : 'true');
      if (liveUrl) directLink.removeAttribute('tabindex'); else directLink.setAttribute('tabindex', '-1');
    }

    function loadIframe() {
      if (overlay) overlay.style.display = 'none';
      if (iframe) {
        iframe.style.display = 'block';
        if (iframe.src !== liveUrl) iframe.src = liveUrl;
      }
      if (previewOverlay) previewOverlay.style.display = 'flex';
    }

    if (liveUrl) {
      loadIframe();
    } else {
      if (overlayMessage) overlayMessage.textContent = 'A live preview is not available for this project yet.';
      if (overlayActions) overlayActions.style.display = 'none';
      if (overlay) overlay.style.display = 'flex';
      if (iframe) {
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
      }
      if (previewOverlay) previewOverlay.style.display = 'none';
    }

    const liveUrlLabel = document.getElementById('csLiveUrlLabel');
    if (liveUrlLabel) liveUrlLabel.textContent = liveUrl || 'Live URL coming soon';
  }
  window.renderCaseIframe = renderCaseIframe;

  function renderCase(idx) {
    const p = window.projects[idx];
    if (!p) return;
    const liveUrl = window.safeExternalUrl(p.live);
    const githubUrl = window.safeExternalUrl(p.github);
    document.getElementById('csEyebrow').textContent = '// ' + p.tag;
    document.getElementById('csTitle').innerHTML = window.escapeHtml(p.title) + '<br><span class="grad-text">' + window.escapeHtml(p.subtitle) + '</span>';
    document.getElementById('csMetaRow').innerHTML =
      '<span>' + window.escapeHtml(p.industry) + '</span><span>' + window.escapeHtml(p.year) + '</span><span>' + window.escapeHtml(p.type) + '</span><span>' + window.escapeHtml(p.status) + '</span>';

    const liveBtn = document.getElementById('csLiveBtn');
    if (liveUrl) {
      liveBtn.href = liveUrl;
      liveBtn.textContent = 'Live Website';
      liveBtn.classList.remove('is-disabled');
      liveBtn.removeAttribute('aria-disabled');
      liveBtn.removeAttribute('tabindex');
    } else {
      liveBtn.href = '#';
      liveBtn.textContent = 'Live site coming soon';
      liveBtn.classList.add('is-disabled');
      liveBtn.setAttribute('aria-disabled', 'true');
      liveBtn.setAttribute('tabindex', '-1');
    }
    const githubBtn = document.getElementById('csGithubBtn');
    githubBtn.href = githubUrl || '#';
    githubBtn.classList.toggle('is-disabled', !githubUrl);
    if (githubUrl) { githubBtn.removeAttribute('aria-disabled'); githubBtn.removeAttribute('tabindex'); }
    else { githubBtn.setAttribute('aria-disabled', 'true'); githubBtn.setAttribute('tabindex', '-1'); }

    renderCaseIframe(idx);
    window.currentActiveProjectIdx = idx;

    // overview table data
    document.getElementById('csOverviewGrid').innerHTML = [
      ['Client', p.client], ['Industry', p.industry], ['Duration', p.duration], ['Role', p.role],
      ['Team', p.team], ['Status', p.status], ['Live URL', liveUrl || 'Pending'], ['Technology', p.tech.join(', ')]
    ].map(function(row) {
      return '<div class="cs-overview-item"><span class="oi-k mono">// ' + window.escapeHtml(row[0]) + '</span><span class="oi-v">' + window.escapeHtml(row[1]) + '</span></div>';
    }).join('');

    document.getElementById('csProblem').textContent = p.problem;
    document.getElementById('csSolutionIntro').textContent = p.solutionIntro;
    document.getElementById('csFeatureGrid').innerHTML = p.features.map(function(f) { return '<div class="cs-feature-chip">' + window.escapeHtml(f) + '</div>'; }).join('');
    document.getElementById('csTechGrid').innerHTML = p.tech.map(function(t) {
      return '<div class="cs-tech-chip"><i data-lucide="' + window.escapeHtml(techIcon[t] || 'code') + '"></i><span>' + window.escapeHtml(t) + '</span></div>';
    }).join('');

    document.getElementById('csProcessTrack').innerHTML = processSteps.map(function(s) {
      return '<div class="proc-step"><div class="pnum">' + window.escapeHtml(s.n) + '</div><h4>' + window.escapeHtml(s.t) + '</h4></div>';
    }).join('');

    document.getElementById('csChallengeChain').innerHTML = p.challenges.map(function(c, i) {
      return '<div class="chain-node">' + window.escapeHtml(c) + '</div>' + (i < p.challenges.length - 1 ? '<span class="chain-arrow">→</span>' : '');
    }).join('');

    document.getElementById('csResultsGrid').innerHTML = p.results.map(function(r) {
      const target = Math.max(0, Number(r.n) || 0);
      return '<div class="cs-result-card"><span class="cr-num counter" data-target="' + target + '">0</span><span class="cr-lbl">' + window.escapeHtml(r.l) + '</span></div>';
    }).join('');
    observeCounters(document.getElementById('csResultsGrid'));

    document.getElementById('csGalleryGrid').innerHTML = p.gallery.map(function(g) {
      return '<button type="button" class="cs-gallery-item" data-label="' + window.escapeHtml(g) + '" aria-label="Open gallery preview: ' + window.escapeHtml(g) + '">' + window.escapeHtml(g) + '</button>';
    }).join('');
    document.querySelectorAll('.cs-gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        openLightbox(item.getAttribute('data-label'), item);
      });
    });

    document.getElementById('csReviewCard').innerHTML =
      '<div class="stars"><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i><i data-lucide="star"></i></div><p class="quote" style="margin-top:12px;font-style:italic;">&quot;' + window.escapeHtml(p.review.quote) + '&quot;</p>' +
      '<div class="who"><div class="avatar"></div><div><div class="nm" style="font-weight:600;font-size:.9rem;">' + window.escapeHtml(p.review.name) + '</div><div class="rl" style="font-size:.78rem;color:var(--text-faint);">' + window.escapeHtml(p.review.role) + '</div></div></div>';

    const prevIdx = (idx - 1 + window.projects.length) % window.projects.length;
    const nextIdx = (idx + 1) % window.projects.length;
    document.getElementById('csPrevTitle').textContent = window.projects[prevIdx].title;
    document.getElementById('csNextTitle').textContent = window.projects[nextIdx].title;
    document.getElementById('csPrevCard').onclick = function() { window.openCase(prevIdx); };
    document.getElementById('csNextCard').onclick = function() { window.openCase(nextIdx); };
    refreshIcons();
  }

  window.openCase = function(idx, opts) {
    opts = opts || {};
    if (!Number.isInteger(idx) || !window.projects[idx]) {
      window.navigate('notfound', null, opts);
      return false;
    }
    renderCase(idx);
    const p = window.projects[idx];
    const slug = window.slugify(p.title);
    document.title = p.title + ' — Case Study — CodeMaster SK';
    if (!opts.skipPush) window.navigate('case', slug, opts);
    return true;
  };

  window.openCaseBySlug = function(slug, opts) {
    for (let i = 0; i < window.projects.length; i++) {
      if (window.slugify(window.projects[i].title) === slug) { return window.openCase(i, opts); }
    }
    return false;
  };

  // ---------- INITIAL ROUTE RESOLUTION ----------
  function resolveInitialRoute() {
    const route = window.resolveRouteFromPath(window.currentPath());
    let initialState = { route: 'home', slug: null };
    if (route.name === 'case' && route.slug) {
      if (window.openCaseBySlug(route.slug, { skipPush: true })) {
        initialState = { route: 'case', slug: route.slug };
      } else {
        window.navigate('home', null, { skipPush: true });
      }
    } else if (route.name === 'notfound') {
      if (location.hash && location.hash.indexOf('#/') === 0) {
        window.navigate('notfound', null, { skipPush: true });
        initialState = { route: 'notfound', slug: null };
      } else {
        window.navigate('home', null, { skipPush: true });
      }
    } else {
      window.navigate(route.name, null, { skipPush: true });
      initialState = { route: route.name, slug: null };
    }
    window.safe(function() { history.replaceState(initialState, '', window.routeUrl(initialState.route, initialState.slug)); });
  }

  // device switcher preview frames
  document.querySelectorAll('.device-switch button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.device-switch button').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const device = btn.getAttribute('data-device');
      const frame = document.getElementById('livePreviewFrame');
      if (frame) {
        currentDevice = device;
        frame.classList.remove('tablet', 'mobile', 'interactive');
        if (device !== 'desktop') frame.classList.add(device);
      }
    });
  });

  // interactive preview frame overlays
  const previewFrame = document.getElementById('livePreviewFrame');
  const lpOverlay = document.getElementById('lpOverlay');
  const lpExitBtn = document.getElementById('lpExitBtn');
  if (previewFrame && lpOverlay) {
    lpOverlay.addEventListener('click', function(e) {
      e.stopPropagation();
      previewFrame.classList.add('interactive');
    });
    previewFrame.addEventListener('mouseleave', function() {
      previewFrame.classList.remove('interactive');
    });
  }
  if (previewFrame && lpExitBtn) {
    lpExitBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      previewFrame.classList.remove('interactive');
    });
  }

  // lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lbClose');
  let lastLightboxTrigger = null;
  function openLightbox(label, trigger) {
    lastLightboxTrigger = trigger || document.activeElement;
    document.getElementById('lbLabel').textContent = label || 'Gallery preview';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    if (lightboxClose) lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') lastLightboxTrigger.focus();
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'Tab') {
      const focusables = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    }
  });

  // ---------- TERMINAL TYPING (WITH SYNTAX HIGHLIGHT REFACTOR) ----------
  const lines = [
    { text: "const codeMasterSK = new DigitalStudio();", cls: "" },
    { text: 'codeMasterSK.services = ["Web Dev","UI/UX","AI Solutions","Automation"];', cls: "" },
    { text: 'codeMasterSK.mission = "Build. Design. Grow.";', cls: "" },
    { text: "codeMasterSK.launch();", cls: "" },
    { text: "✓ Deployed. Business growth: enabled.", cls: "ok" }
  ];
  
  function highlightJS(text) {
    const strings = [];
    let prep = text.replace(/(["'])(.*?)\1/g, function(match) {
      strings.push(match);
      return '__STR_' + (strings.length - 1) + '__';
    });

    prep = window.escapeHtml(prep);
    prep = prep.replace(/\b(const|new|return)\b/g, '<span class="kw">$1</span>');
    prep = prep.replace(/\b(\w+)(?=\()/g, '<span class="fn">$1</span>');

    return prep.replace(/__STR_(\d+)__/g, function(match, idx) {
      const original = strings[parseInt(idx, 10)];
      return '<span class="str">' + window.escapeHtml(original) + '</span>';
    });
  }

  const body = document.getElementById('terminalBody');
  let li = 0, ci = 0;
  
  function renderTerminalImmediately() {
    if (!body) return;
    body.innerHTML = lines.map(function(line) {
      return '<div class="ln' + (line.cls === 'ok' ? ' ok' : '') + '">' +
        (line.cls === 'ok' ? '' : '<span class="mono" style="color:var(--terminal-prompt);">&gt; </span>') +
        highlightJS(line.text) + '</div>';
    }).join('') + '<span class="caret"></span>';
  }
  
  function typeNext() {
    if (!body) return;
    if (li >= lines.length) {
      const caretEl = body.querySelector('.caret');
      if (!caretEl) {
        const c = document.createElement('span'); c.className = 'caret'; body.appendChild(c);
      }
      return;
    }
    if (ci === 0) {
      const div = document.createElement('div');
      div.className = 'ln' + (lines[li].cls === 'ok' ? ' ok' : '');
      div.innerHTML = (lines[li].cls === 'ok' ? '' : '<span class="mono" style="color:var(--terminal-prompt);">&gt; </span>');
      body.appendChild(div);
    }
    const current = body.lastElementChild;
    const full = lines[li].text;
    if (ci <= full.length) {
      current.innerHTML = (lines[li].cls === 'ok' ? '' : '<span class="mono" style="color:var(--terminal-prompt);">&gt; </span>') + highlightJS(full.slice(0, ci)) + '<span class="caret"></span>';
      ci++;
      setTimeout(typeNext, 18 + Math.random() * 22);
    } else {
      current.innerHTML = (lines[li].cls === 'ok' ? '' : '<span class="mono" style="color:var(--terminal-prompt);">&gt; </span>') + highlightJS(full);
      li++; ci = 0;
      setTimeout(typeNext, 260);
    }
  }
  if (prefersReducedMotionGlobal) renderTerminalImmediately();
  else setTimeout(typeNext, 500);

  // ---------- FAQ ACCORDION (PERFORMANCE REFACTOR) ----------
  document.querySelectorAll('.faq-item').forEach(function(item) {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function() {
      const wasOpen = item.classList.contains('open');
      
      // Close all items first (accessible singular accordion mode)
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('open');
        const b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------- CONTACT FORM ----------
  const form = document.getElementById('contactForm');
  const cfSubmit = document.getElementById('cfSubmit');
  const formNote = document.getElementById('formNote');
  const defaultNoteText = formNote ? formNote.textContent : '';

  function postForm(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function(res) {
      if (res.ok) return res.text();
      return res.text().then(function(message) {
        throw new Error(message || 'The form service returned an error.');
      });
    });
  }

  function formPayload(formEl) {
    const payload = {};
    new FormData(formEl).forEach(function(value, key) {
      if (typeof value === 'string') payload[key] = value.trim();
    });
    return payload;
  }

  function setFieldError(fieldId, hasError) {
    const wrap = document.getElementById(fieldId);
    if (!wrap) return;
    wrap.classList.toggle('has-err', hasError);
    const input = wrap.querySelector('input,textarea');
    if (input) {
      input.classList.toggle('err', hasError);
      input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    }
  }

  if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Honeypot check
    const honeypot = document.getElementById('cf-company');
    if (honeypot && honeypot.value) {
      form.reset();
      formNote.textContent = defaultNoteText;
      formNote.classList.remove('is-error');
      formNote.classList.add('show');
      return;
    }

    const nameEl = document.getElementById('cf-name');
    const emailEl = document.getElementById('cf-email');
    const msgEl = document.getElementById('cf-msg');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    const nameOk = nameEl.value.trim().length > 0;
    const msgOk = msgEl.value.trim().length > 0;

    setFieldError('cf-name-field', !nameOk);
    setFieldError('cf-email-field', !emailOk);
    setFieldError('cf-msg-field', !msgOk);

    if (!nameOk || !emailOk || !msgOk) {
      formNote.textContent = 'Please fix the highlighted fields above.';
      formNote.classList.add('show', 'is-error');
      const firstInvalid = form.querySelector('.has-err input, .has-err textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formNote.classList.remove('show', 'is-error');
    cfSubmit.classList.add('is-loading');
    cfSubmit.disabled = true;

    const endpointParts = form.getAttribute('data-endpoint').split('@');
    const submitUrl = 'https://formsubmit.co/ajax/' + endpointParts[0] + '@' + endpointParts[1];
    postForm(submitUrl, formPayload(form))
      .then(function() {
        cfSubmit.classList.remove('is-loading');
        cfSubmit.disabled = false;
        formNote.textContent = defaultNoteText;
        formNote.classList.remove('is-error');
        formNote.classList.add('show');
        form.reset();
      })
      .catch(function() {
        cfSubmit.classList.remove('is-loading');
        cfSubmit.disabled = false;
        formNote.textContent = "Oops! Something went wrong. Please try again or email hello@codemastersk.dev directly.";
        formNote.classList.add('show', 'is-error');
      });
  });

  [['cf-name', 'cf-name-field'], ['cf-email', 'cf-email-field'], ['cf-msg', 'cf-msg-field']].forEach(function(field) {
    const input = document.getElementById(field[0]);
    if (input) input.addEventListener('input', function() {
      const value = input.value.trim();
      let isOk = false;
      if (field[0] === 'cf-email') {
        isOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else {
        isOk = value.length > 0;
      }
      if (isOk) setFieldError(field[1], false);
    });
  });

  // ---------- FOOTER YEAR ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- SCROLL PROGRESS & VISUAL HANDLING ----------
  const backToTop = document.getElementById('backToTop');
  let cachedScrollLimit = 1;

  function updateScrollLimit() {
    const h = document.documentElement;
    cachedScrollLimit = (h.scrollHeight - h.clientHeight) || 1;
  }

  function updateScrollVisuals() {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    if (backToTop) {
      backToTop.classList.toggle('show', currentScrollY > 480);
    }
  }

  let scrollTicking = false;
  function handleScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        updateScrollVisuals();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', updateScrollLimit);
  window.addEventListener('load', function() {
    updateScrollLimit();
    updateScrollVisuals();
  });
  document.addEventListener('DOMContentLoaded', function() {
    updateScrollLimit();
    updateScrollVisuals();
  });

  window.updateProgress = function() {
    updateScrollLimit();
    updateScrollVisuals();
  };
  updateScrollLimit();
  updateScrollVisuals();

  // ---------- ANIMATED NUMBER COUNTERS ----------
  const counterIO = typeof window.IntersectionObserver === 'function' ? new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.setAttribute('data-counter-started', 'true');
      counterIO.unobserve(el);
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1200;
      let startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) { requestAnimationFrame(step); }
        else { el.textContent = target; el.setAttribute('data-counter-complete', 'true'); }
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 }) : null;

  function finishCounter(el) {
    el.textContent = parseInt(el.getAttribute('data-target'), 10) || 0;
    el.setAttribute('data-counter-complete', 'true');
  }
  
  function observeCounters(root) {
    const scope = root || document;
    scope.querySelectorAll('.counter').forEach(function(el) {
      if (el.getAttribute('data-counter-observed') === 'true') return;
      if (!counterIO) {
        finishCounter(el);
        return;
      }
      el.setAttribute('data-counter-observed', 'true');
      counterIO.observe(el);
      window.setTimeout(function() {
        if (el.isConnected && el.getAttribute('data-counter-started') !== 'true') {
          counterIO.unobserve(el);
          finishCounter(el);
        }
      }, 1500);
    });
  }
  observeCounters();
  window.observeCounters = observeCounters;

  // ---------- SCROLL REVEAL ----------
  const io = typeof window.IntersectionObserver === 'function' ? new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 }) : null;

  function revealCheck() {
    document.querySelectorAll('.page.active .reveal').forEach(function(el) {
      if (io) io.observe(el); else el.classList.add('in');
    });
  }
  window.revealCheck = revealCheck;

  // ---------- CARD TILT & ACCESSIBLE FOCUS TILT ----------
  if (!prefersReducedMotionGlobal) {
    document.querySelectorAll('.service-card, .case-card, .price-card, .why-card').forEach(function(card) {
      card.style.transition = 'transform 0.4s ease';
      let r = null;
      let initialScrollY = 0;
      let initialScrollX = 0;
      card.addEventListener('mouseenter', function() {
        r = card.getBoundingClientRect();
        initialScrollY = window.scrollY;
        initialScrollX = window.scrollX;
      });
      card.addEventListener('mousemove', function(e) {
        if (!r) return;
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        const scrollDiffY = currentScrollY - initialScrollY;
        const scrollDiffX = currentScrollX - initialScrollX;
        const cardLeft = r.left - scrollDiffX;
        const cardTop = r.top - scrollDiffY;
        const x = (e.clientX - cardLeft) / r.width - 0.5;
        const y = (e.clientY - cardTop) / r.height - 0.5;
        card.style.transition = 'none';
        card.style.transform = 'perspective(600px) rotateX(' + (y * -4) + 'deg) rotateY(' + (x * 4) + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', function() {
        r = null;
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = '';
      });
      
      // Bubbled focus scale transitions for key navigation accessibility
      card.addEventListener('focusin', function() {
        card.style.transform = 'translateY(-4px) scale(1.01)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        card.style.boxShadow = 'var(--card-shadow-hover)';
      });
      card.addEventListener('focusout', function() {
        card.style.transform = '';
        card.style.borderColor = '';
        card.style.boxShadow = '';
      });
    });
  }

  // ---------- BUTTON RIPPLE ----------
  document.querySelectorAll('.btn').forEach(function(btn) {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
      const r = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = (e.clientX - r.left) + 'px';
      ripple.style.top = (e.clientY - r.top) + 'px';
      ripple.style.width = ripple.style.height = '10px';
      ripple.style.background = 'rgba(255,255,255,.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%,-50%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transition = 'width .5s ease, height .5s ease, opacity .5s ease';
      btn.appendChild(ripple);
      requestAnimationFrame(function() {
        ripple.style.width = ripple.style.height = '260px';
        ripple.style.opacity = '0';
      });
      setTimeout(function() { ripple.remove(); }, 520);
    });
  });

  // ---------- NEWSLETTER ----------
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterNote = document.getElementById('newsletterNote');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button[type="submit"]');
      if (!input || !btn) return;
      if (!input.checkValidity()) { input.reportValidity(); return; }
      const originalText = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;
      if (newsletterNote) newsletterNote.classList.remove('show', 'is-error');

      const endpointParts = newsletterForm.getAttribute('data-endpoint').split('@');
      const submitUrl = 'https://formsubmit.co/ajax/' + endpointParts[0] + '@' + endpointParts[1];
      postForm(submitUrl, formPayload(newsletterForm))
        .then(function() {
          btn.textContent = 'Subscribed ✓';
          input.value = '';
          if (newsletterNote) {
            newsletterNote.textContent = 'Thanks — you are subscribed.';
            newsletterNote.classList.remove('is-error');
            newsletterNote.classList.add('show');
          }
        })
        .catch(function() {
          btn.textContent = 'Try again';
          if (newsletterNote) {
            newsletterNote.textContent = 'Could not subscribe right now. Please try again shortly.';
            newsletterNote.classList.add('show', 'is-error');
          }
        })
        .then(function() {
          setTimeout(function() {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2500);
        });
    });
  }

  // ---------- LOADING SCREEN ----------
  const loader = document.getElementById('pageLoader');
  function hideLoader() { if (loader) loader.classList.add('hidden'); }
  if (document.readyState === 'complete') hideLoader();
  else window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 1800); // safety net

  // ---------- BACK TO TOP ----------
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      if (window.lenisInstance) { window.lenisInstance.scrollTo(0, { duration: 1 }); }
      else { window.scrollTo({ top: 0, behavior: prefersReducedMotionGlobal ? 'auto' : 'smooth' }); }
    });
  }

  // ---------- SMOOTH SCROLL (Lenis) + GSAP REVEAL ----------
  function initEnhancedMotion() {
    if (prefersReducedMotionGlobal) return;
    if (window.Lenis) {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      window.lenisInstance = lenis;
      
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        window.lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function(time) { window.lenisInstance.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      }
    }
  }

  // Hydrate Obfuscated links
  document.addEventListener('DOMContentLoaded', function() {
    updateNavHeight();
    buildProjectGrid();
    resolveInitialRoute();
    
    // Obfuscated WhatsApp link hydration
    document.querySelectorAll('[data-wa]').forEach(function(el) {
      const val = el.getAttribute('data-wa');
      if (val) {
        try {
          const decoded = atob(val);
          el.setAttribute('href', 'https://wa.me/' + decoded);
        } catch (e) {}
      }
    });

    // Obfuscated Email link hydration
    document.querySelectorAll('[data-email]').forEach(function(el) {
      const val = el.getAttribute('data-email');
      if (val) {
        el.setAttribute('href', 'mailto:' + val);
      }
    });
    document.querySelectorAll('[data-email-txt]').forEach(function(el) {
      const val = el.getAttribute('data-email-txt');
      if (val) {
        el.textContent = val;
      }
    });
  });

  window.addEventListener('resize', updateNavHeight);
  window.addEventListener('load', updateNavHeight);
  document.addEventListener('DOMContentLoaded', refreshIcons);
  window.addEventListener('load', refreshIcons);
  window.addEventListener('load', function() { window.safe(initEnhancedMotion); });
})();
