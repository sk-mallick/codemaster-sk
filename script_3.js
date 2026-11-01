/* Custom dropdown for #service. Native <select> stays in the DOM (hidden) so validation and the existing submit code keep working. */
(() => {
  const wrap = document.getElementById('serviceDd');
  if (!wrap) return;
  const sel = wrap.querySelector('select');
  const label = document.querySelector('label[for="service"]');
  const items = [...sel.options].filter(o => o.value !== '' || o.index > 0);
  const placeholder = sel.options[0].text;

  const btn = document.createElement('button');
  btn.type = 'button'; btn.id = 'serviceBtn';
  btn.className = 'dd-btn';
  btn.setAttribute('role', 'combobox');
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'serviceList');
  btn.innerHTML = '<span class="dd-val"></span><svg class="ic" aria-hidden="true" focusable="false"><use href="#ic-chev"/></svg>';
  const val = btn.querySelector('.dd-val'); val.textContent = placeholder;

  const list = document.createElement('ul');
  list.id = 'serviceList'; list.className = 'dd-list'; list.hidden = true;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', 'Service');
  const lis = items.map((o, i) => {
    const li = document.createElement('li');
    li.id = 'serviceOpt' + i; li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.innerHTML = '<span></span><svg class="ic" aria-hidden="true" focusable="false"><use href="#ic-check"/></svg>';
    li.firstChild.textContent = o.text;
    li.dataset.value = o.value || o.text;
    list.appendChild(li);
    return li;
  });

  wrap.classList.add('dd-ready');
  sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
  wrap.append(btn, list);
  if (label) { label.setAttribute('for', 'serviceBtn'); label.id = label.id || 'serviceLabel'; btn.setAttribute('aria-labelledby', label.id + ' serviceBtn'); }

  const err = document.createElement('p');
  err.className = 'dd-err'; err.id = 'serviceErr'; err.hidden = true; err.textContent = 'Please choose a service.';
  wrap.after(err);

  let active = -1;
  const setActive = i => {
    active = Math.max(0, Math.min(lis.length - 1, i));
    lis.forEach((li, k) => li.dataset.active = String(k === active));
    btn.setAttribute('aria-activedescendant', lis[active].id);
    lis[active].scrollIntoView({ block: 'nearest' });
  };
  const open = () => {
    if (!list.hidden) return;
    list.hidden = false; wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
    const cur = lis.findIndex(li => li.getAttribute('aria-selected') === 'true');
    setActive(cur < 0 ? 0 : cur);
  };
  const close = () => {
    if (list.hidden) return;
    list.hidden = true; wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false'); btn.removeAttribute('aria-activedescendant');
  };
  const choose = i => {
    lis.forEach((li, k) => li.setAttribute('aria-selected', String(k === i)));
    sel.value = lis[i].dataset.value;
    val.textContent = lis[i].firstChild.textContent;
    btn.classList.add('has-value');
    btn.removeAttribute('aria-invalid'); err.hidden = true;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  };

  btn.addEventListener('click', () => list.hidden ? open() : close());
  btn.addEventListener('keydown', e => {
    const isOpen = !list.hidden;
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); isOpen ? setActive(active + 1) : open(); break;
      case 'ArrowUp':   e.preventDefault(); isOpen ? setActive(active - 1) : open(); break;
      case 'Home': if (isOpen) { e.preventDefault(); setActive(0); } break;
      case 'End':  if (isOpen) { e.preventDefault(); setActive(lis.length - 1); } break;
      case 'Enter': case ' ':
        e.preventDefault(); isOpen ? choose(active) : open(); break;
      case 'Escape': if (isOpen) { e.preventDefault(); close(); } break;
      case 'Tab': close(); break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          const k = lis.findIndex(li => li.firstChild.textContent.toLowerCase().startsWith(e.key.toLowerCase()));
          if (k > -1) { isOpen ? setActive(k) : choose(k); }
        }
    }
  });
  list.addEventListener('mousedown', e => e.preventDefault());       // keep focus on the button
  list.addEventListener('click', e => { const li = e.target.closest('li'); if (li) choose(lis.indexOf(li)); });
  list.addEventListener('mousemove', e => { const li = e.target.closest('li'); if (li) setActive(lis.indexOf(li)); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) close(); });
  btn.addEventListener('blur', () => setTimeout(() => { if (!wrap.contains(document.activeElement)) close(); }, 0));

  // Required-field handling: show our own error instead of the hidden select's bubble
  sel.addEventListener('invalid', e => {
    e.preventDefault();
    btn.setAttribute('aria-invalid', 'true'); btn.setAttribute('aria-describedby', 'serviceErr');
    err.hidden = false; btn.focus();
  });
})();