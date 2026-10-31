/* =============================================================================
   script.js — Hotel QR Digital Menu
   Reads HOTEL_INFO, MENU_CATEGORIES and MENU_ITEMS from menu-data.js and builds
   the whole page. No libraries, no build step.

   Sections
     1. Setup & helpers
     2. Hotel info (header, footer, SEO, WhatsApp)
     3. Opening hours / "Open now"
     4. Menu state, filtering & search
     5. Rendering
     6. Events (search, chips, back-to-top)
     7. Start-up
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     1. SETUP & HELPERS
     ------------------------------------------------------------------------ */

  // Stop with a readable message if the data file failed to load.
  if (typeof HOTEL_INFO === 'undefined' || typeof MENU_CATEGORIES === 'undefined' || typeof MENU_ITEMS === 'undefined') {
    const root = document.getElementById('menu-root');
    if (root) {
      root.innerHTML = '<p class="empty"><strong>The menu could not be loaded.</strong>Please refresh the page or ask our staff for a printed menu.</p>';
    }
    console.error('menu-data.js is missing or has a syntax error. Open the browser console for details.');
    return;
  }

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Small icon set (24×24 outline icons). Used for any element with data-icon="name". */
  const ICONS = {
    search:  '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>',
    close:   '<path d="M6 6l12 12M18 6L6 18"/>',
    phone:   '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    pin:     '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    map:     '<path d="M9 20l-6-2V5l6 2 6-2 6 2v13l-6-2-6 2zM9 7v13M15 5v13"/>',
    arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    chat:    '<path d="M12 3C6.9 3 3 6.6 3 11c0 2 .8 3.8 2.2 5.2L4 21l4.2-1.6c1.1.4 2.4.6 3.8.6 5.1 0 9-3.6 9-8s-3.9-8-9-8z"/>'
  };

  /** Create an <svg> icon element wrapped in <span class="icon">. */
  function makeIcon(name) {
    const span = document.createElement('span');
    span.className = 'icon';
    setIcon(span, name);
    return span;
  }
  function setIcon(target, name) {
    const strokeless = name === 'chat';      // the chat bubble is a filled shape
    target.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
      (strokeless
        ? 'fill="currentColor">'
        : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">') +
      (ICONS[name] || '') + '</svg>';
  }

  /**
   * Tiny DOM builder:  el('a', { class: 'btn', href: '#' }, 'Text', childNode)
   * Using textContent (never innerHTML) keeps menu text safe.
   */
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value === null || value === undefined || value === false) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value === true ? '' : value);
    });
    children.flat().forEach((child) => {
      if (child !== null && child !== undefined && child !== false) node.append(child);
    });
    return node;
  }

  /** Format a number as Indian Rupees: 150 -> "₹150". */
  const rupeeFormat = (() => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0
      });
    } catch (e) { return null; }
  })();
  const formatPrice = (n) => (rupeeFormat ? rupeeFormat.format(n) : '₹' + n);

  /** Lower-case, strip accents and punctuation (keeps all languages' letters). */
  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /** Extra-forgiving form: repeated letters collapse ("panneer" and "paneer" both become "paner"). */
  const loosen = (text) => normalize(text).replace(/(\p{L})\1+/gu, '$1');

  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /** Return text with search words wrapped in <mark>. Returns an array of strings/nodes. */
  function highlight(text, tokens) {
    if (!tokens.length) return [text];
    const pattern = new RegExp('(' + tokens.slice().sort((a, b) => b.length - a.length).map(escapeRegExp).join('|') + ')', 'gi');
    return text.split(pattern).map((part, i) => (i % 2 === 1 ? el('mark', { class: 'hit', text: part }) : part));
  }

  /* ---------------------------------------------------------------------------
     2. HOTEL INFO
     ------------------------------------------------------------------------ */
  const info = HOTEL_INFO;

  const digitsOnly = (s) => String(s || '').replace(/\D/g, '');
  const telHref = (s) => 'tel:' + String(s || '').replace(/[^\d+]/g, '');

  /** wa.me needs country code + number, digits only. A bare 10-digit number is treated as Indian (+91). */
  function whatsappHref() {
    let digits = digitsOnly(info.whatsapp);
    if (!digits) return '';
    if (digits.length === 10) digits = '91' + digits;
    const text = info.whatsappMessage ? '?text=' + encodeURIComponent(info.whatsappMessage) : '';
    return 'https://wa.me/' + digits + text;
  }

  function mapsHref() {
    if (info.mapsUrl) return info.mapsUrl;
    if (info.address) return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(info.address);
    return '';
  }

  /** Fill header, footer, floating WhatsApp button. */
  function renderHotelInfo() {
    const name = info.name || 'Our Restaurant';

    $('#hotel-name').textContent = name;
    $('#hotel-tagline').textContent = info.tagline || '';
    $('#hotel-tagline').hidden = !info.tagline;

    const logo = $('#hotel-logo');
    if (info.logo) {
      logo.src = info.logo;
      logo.alt = name + ' logo';
      logo.addEventListener('error', () => { logo.closest('.hero__logo').hidden = true; });
    } else {
      logo.closest('.hero__logo').hidden = true;
    }

    // Header buttons: Call · WhatsApp · Directions (each appears only if its data exists)
    const actions = $('#hero-actions');
    actions.replaceChildren();
    if (info.phone) {
      actions.append(el('a', { class: 'btn btn--primary', href: telHref(info.phone) }, makeIcon('phone'), 'Call us'));
    }
    const wa = whatsappHref();
    if (wa) {
      actions.append(el('a', { class: 'btn', href: wa, target: '_blank', rel: 'noopener' }, makeIcon('chat'), 'WhatsApp'));
    }
    const maps = mapsHref();
    if (maps) {
      actions.append(el('a', { class: 'btn', href: maps, target: '_blank', rel: 'noopener' }, makeIcon('map'), 'Directions'));
    }
    actions.hidden = !actions.children.length;

    // Floating WhatsApp button
    const fab = $('#wa-fab');
    if (wa) { fab.href = wa; fab.hidden = false; } else { fab.hidden = true; }

    // Footer: hours, contact, location
    const hoursBox = $('#info-hours');
    const hoursLine = hoursText();
    hoursBox.replaceChildren(hoursLine ? el('p', { text: hoursLine }) : el('p', { text: 'Please ask our staff.' }));
    if (info.hours && info.hours.closedDays && info.hours.closedDays.length) {
      const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      hoursBox.append(el('p', { text: 'Closed on ' + info.hours.closedDays.map((d) => names[d]).filter(Boolean).join(', ') + '.' }));
    }

    const contactBox = $('#info-contact');
    contactBox.replaceChildren();
    if (info.phone) {
      contactBox.append(el('p', {}, el('a', { href: telHref(info.phone), text: info.phone })));
    }
    if (wa) {
      contactBox.append(el('p', {}, el('a', { href: wa, target: '_blank', rel: 'noopener', text: 'Message on WhatsApp' })));
    }
    if (!contactBox.children.length) contactBox.append(el('p', { text: 'Please ask our staff.' }));

    const locationBox = $('#info-location');
    locationBox.replaceChildren();
    if (info.address) locationBox.append(el('p', { text: info.address }));
    if (maps) {
      locationBox.append(el('a', { class: 'visit__link', href: maps, target: '_blank', rel: 'noopener' }, makeIcon('map'), 'Open in Google Maps'));
    }
    if (!locationBox.children.length) locationBox.append(el('p', { text: 'Please ask our staff.' }));

    $('#footer-note').textContent = info.footerNote || '';
    $('#footer-copy').textContent = '© ' + new Date().getFullYear() + ' ' + name;

    // "Table 5" tag when the QR code links to  …/?table=5
    const table = new URLSearchParams(location.search).get('table');
    if (table && /^[\w -]{1,10}$/.test(table)) {
      const tag = $('#table-tag');
      tag.textContent = 'Table ' + table.trim();
      tag.hidden = false;
    }

    // Hydrate static [data-icon] placeholders in index.html
    document.querySelectorAll('[data-icon]').forEach((node) => setIcon(node, node.dataset.icon));

    updateSeo(name, maps);
    if (/your hotel name/i.test(name)) {
      console.warn('[menu] Placeholder hotel details are still in use — edit HOTEL_INFO in menu-data.js.');
    }
  }

  /** Keep <title>, meta tags and structured data (JSON-LD) in sync with HOTEL_INFO. */
  function updateSeo(name, maps) {
    const description = 'Browse the full digital menu of ' + name + ' with prices in rupees' +
      (info.tagline ? ' — ' + info.tagline : '') + '.';
    document.title = 'Menu | ' + name;
    const setMeta = (selector, value) => { const m = $(selector); if (m) m.setAttribute('content', value); };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', 'Menu | ' + name);
    setMeta('meta[property="og:description"]', description);

    const data = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: name,
      description: info.tagline || undefined,
      url: location.origin + location.pathname,
      image: info.logo ? new URL(info.logo, location.href).href : undefined,
      telephone: info.phone || undefined,
      servesCuisine: info.cuisine && info.cuisine.length ? info.cuisine : undefined,
      address: info.address ? { '@type': 'PostalAddress', streetAddress: info.address } : undefined,
      hasMap: maps || undefined,
      openingHours: info.hours && info.hours.open ? hoursForSchema() : undefined
    };
    let script = $('#ld-json');
    if (!script) {
      script = el('script', { type: 'application/ld+json', id: 'ld-json' });
      document.head.append(script);
    }
    script.textContent = JSON.stringify(data); // undefined values are dropped automatically
  }

  /* ---------------------------------------------------------------------------
     3. OPENING HOURS / "OPEN NOW"
     ------------------------------------------------------------------------ */
  const toMinutes = (hhmm) => {
    const [h, m] = String(hhmm || '').split(':').map(Number);
    return Number.isFinite(h) ? h * 60 + (m || 0) : null;
  };

  /** "07:00" -> "7:00 AM" */
  function to12h(hhmm) {
    const mins = toMinutes(hhmm);
    if (mins === null) return '';
    const h24 = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return ((h24 + 11) % 12 + 1) + ':' + String(m).padStart(2, '0') + ' ' + (h24 < 12 ? 'AM' : 'PM');
  }

  function hoursText() {
    const h = info.hours;
    if (!h || toMinutes(h.open) === null || toMinutes(h.close) === null) return '';
    const days = h.closedDays && h.closedDays.length ? 'Open ' : 'Open daily, ';
    return days + to12h(h.open) + ' – ' + to12h(h.close);
  }

  function hoursForSchema() {
    return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      .filter((_, i) => !(info.hours.closedDays || []).includes((i + 1) % 7))
      .map((d) => d + ' ' + info.hours.open + '-' + info.hours.close);
  }

  /** Current weekday (0=Sun) and minutes since midnight in the hotel's timezone. */
  function nowInHotelTime() {
    const tz = (info.hours && info.hours.timezone) || 'Asia/Kolkata';
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      const get = (type) => parts.find((p) => p.type === type).value;
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
    } catch (e) {
      const d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  /** Update the green/red "Open now" badge in the header. */
  function updateStatus() {
    const badge = $('#hotel-status');
    const h = info.hours;
    const open = h && toMinutes(h.open);
    const close = h && toMinutes(h.close);
    if (!h || open === null || close === null || open === undefined) { badge.hidden = true; return; }

    const { day, minutes } = nowInHotelTime();
    const closedToday = (h.closedDays || []).includes(day);
    const overnight = close <= open;
    const isOpen = !closedToday && (overnight ? (minutes >= open || minutes < close) : (minutes >= open && minutes < close));

    badge.classList.toggle('is-open', isOpen);
    badge.textContent = closedToday
      ? 'Closed today'
      : isOpen ? 'Open now · until ' + to12h(h.close) : 'Closed · opens ' + to12h(h.open);
    badge.hidden = false;
  }

  /* ---------------------------------------------------------------------------
     4. MENU STATE, FILTERING & SEARCH
     ------------------------------------------------------------------------ */

  // Build the working data once: validate items and group them by category.
  const categoryIds = new Set(MENU_CATEGORIES.map((c) => c.id));
  const menu = MENU_CATEGORIES.map((c) => ({ id: c.id, name: c.name, items: [] }));
  const menuById = new Map(menu.map((c) => [c.id, c]));

  MENU_ITEMS.forEach((item) => {
    if (!item || !categoryIds.has(item.category) || !item.name || typeof item.price !== 'number') {
      console.warn('[menu] Skipped an item with a missing name/price or unknown category:', item);
      return;
    }
    const category = menuById.get(item.category);
    category.items.push({
      ...item,
      veg: item.veg !== false,                       // anything but false counts as vegetarian
      group: item.group || '',
      description: item.description || '',
      // lower-cased text we search against
      searchText: normalize([item.name, item.description, item.group, category.name].join(' ')),
      looseText: loosen([item.name, item.description, item.group, category.name].join(' '))
    });
  });
  const activeMenu = menu.filter((c) => c.items.length);       // hide empty categories
  const hasNonVeg = activeMenu.some((c) => c.items.some((i) => !i.veg));

  const state = { query: '', category: 'all', diet: 'all' };   // diet: all | veg | nonveg

  /** Apply category, diet and search filters; returns [{ category, items }]. */
  function getVisibleSections() {
    const tokens = normalize(state.query).split(' ').filter(Boolean);
    const looseTokens = loosen(state.query).split(' ').filter(Boolean);
    return activeMenu
      .filter((c) => state.category === 'all' || c.id === state.category)
      .map((c) => ({
        category: c,
        items: c.items.filter((i) =>
          (state.diet === 'all' || (state.diet === 'veg') === i.veg) &&
          tokens.every((t) => i.searchText.includes(t)) ||
           (looseTokens.length > 0 && looseTokens.every((t) => t.length >= 3 && i.looseText.includes(t))))
      }))
      .filter((s) => s.items.length);
  }

  /* ---------------------------------------------------------------------------
     5. RENDERING
     ------------------------------------------------------------------------ */
  const menuRoot = $('#menu-root');
  const resultsNote = $('#results-note');

  /** One dish: veg mark, name ........ price, optional description and photo. */
  function renderDish(item, tokens) {
    const row = el('div', { class: 'dish__row' },
      el('span', { class: 'mark ' + (item.veg ? '' : 'mark--nonveg'), role: 'img', 'aria-label': item.veg ? 'Vegetarian' : 'Non-vegetarian' }),
      el('span', { class: 'dish__name' }, highlight(item.name, tokens)),
      el('span', { class: 'dish__leader', 'aria-hidden': 'true' }),
      el('span', { class: 'dish__price' }, formatPrice(item.price))
    );
    const main = el('div', { class: 'dish__main' }, row,
      item.description ? el('p', { class: 'dish__desc' }, highlight(item.description, tokens)) : null);

    const li = el('li', { class: 'dish' });
    if (item.image) {
      const photo = el('img', {
        class: 'dish__photo', src: item.image, alt: item.name,
        width: 96, height: 96, loading: 'lazy', decoding: 'async'
      });
      // If the photo file is missing, quietly fall back to a text-only row.
      photo.addEventListener('error', () => photo.remove());
      li.append(photo);
    }
    li.append(main);
    return li;
  }

  /** One category: heading + one panel per group (sub-heading only when a category has several groups). */
  function renderSection(section, tokens) {
    const { category, items } = section;

    // Preserve the order in which groups first appear
    const groups = new Map();
    items.forEach((item) => {
      const key = item.group || '';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    const showGroupTitles = groups.size > 1;

    const heading = el('div', { class: 'menu-section__head' },
      el('h2', { class: 'menu-section__title', id: 'cat-' + category.id }, highlight(category.name, [])),
      el('span', { class: 'menu-section__count', text: items.length + (items.length === 1 ? ' dish' : ' dishes') })
    );

    const panels = [];
    groups.forEach((groupItems, groupName) => {
      panels.push(el('div', { class: 'panel' },
        showGroupTitles ? el('h3', { class: 'group-title', text: groupName }) : null,
        el('ul', { class: 'dishes' }, groupItems.map((item) => renderDish(item, tokens)))
      ));
    });

    return el('section', { class: 'menu-section', 'aria-labelledby': 'cat-' + category.id }, heading, panels);
  }

  /** Re-draw the menu for the current filters. */
  function render() {
    const tokens = normalize(state.query).split(' ').filter(Boolean);
    const sections = getVisibleSections();
    const total = sections.reduce((n, s) => n + s.items.length, 0);

    menuRoot.replaceChildren();
    if (!sections.length) {
      const empty = el('div', { class: 'empty' },
        el('strong', { text: 'No dishes found' }),
        state.query ? 'Nothing matches “' + state.query.trim() + '”. Check the spelling or try a shorter word.' : 'Nothing to show for this filter.',
        el('div', {}, el('button', { type: 'button', id: 'reset-filters', text: 'Show full menu' }))
      );
      menuRoot.append(empty);
      $('#reset-filters').addEventListener('click', resetFilters);
    } else {
      const fragment = document.createDocumentFragment();
      sections.forEach((s) => fragment.append(renderSection(s, tokens)));
      menuRoot.append(fragment);
    }

    // Announce results to screen readers (and show a short note while searching)
    resultsNote.textContent = state.query.trim()
      ? total + (total === 1 ? ' dish found' : ' dishes found') + ' for “' + state.query.trim() + '”'
      : '';

    // Short fade whenever the list changes
    menuRoot.classList.remove('is-updating');
    void menuRoot.offsetWidth;                       // restart the CSS animation
    if (!prefersReducedMotion) menuRoot.classList.add('is-updating');
  }

  /** Category chips: "All" + one per category. */
  function renderChips() {
    const nav = $('#category-nav');
    nav.replaceChildren();
    const makeChip = (id, label) => el('li', {},
      el('button', { class: 'chip', type: 'button', 'data-category': id, 'aria-pressed': String(state.category === id), text: label }));
    nav.append(makeChip('all', 'All'));
    activeMenu.forEach((c) => nav.append(makeChip(c.id, c.name)));
  }

  function syncChips() {
    document.querySelectorAll('.chip').forEach((chip) => {
      const pressed = chip.dataset.category === state.category;
      chip.setAttribute('aria-pressed', String(pressed));
      if (pressed) {
        chip.parentElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest'
        });
      }
    });
  }

  /** Veg / Non-veg toggle — only built if the menu has non-veg items. */
  function renderDietFilter() {
    const box = $('#diet-filter');
    box.hidden = !hasNonVeg;
    if (!hasNonVeg) return;
    box.replaceChildren();
    [['all', 'All'], ['veg', 'Veg'], ['nonveg', 'Non-veg']].forEach(([value, label]) => {
      box.append(el('button', { type: 'button', 'data-diet': value, 'aria-pressed': String(state.diet === value), text: label }));
    });
    box.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-diet]');
      if (!btn) return;
      state.diet = btn.dataset.diet;
      box.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      render();
    });
  }

  /** After a filter change, bring the top of the list just under the sticky toolbar. */
  function scrollToMenuTop() {
    menuRoot.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function resetFilters() {
    state.query = '';
    state.category = 'all';
    state.diet = 'all';
    searchInput.value = '';
    clearButton.hidden = true;
    document.querySelectorAll('#diet-filter button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.diet === 'all')));
    syncChips();
    render();
    scrollToMenuTop();
  }

  /* ---------------------------------------------------------------------------
     6. EVENTS
     ------------------------------------------------------------------------ */
  const searchInput = $('#search-input');
  const clearButton = $('#search-clear');

  // Search (debounced so typing stays smooth on low-end phones)
  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearButton.hidden = !searchInput.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = searchInput.value;
      // Searching always looks through the whole menu, not just one category
      if (state.query.trim() && state.category !== 'all') { state.category = 'all'; syncChips(); }
      render();
    }, 120);
  });

  // "Search" key on mobile keyboards: hide the keyboard so results are visible
  $('#search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    searchInput.blur();
    scrollToMenuTop();
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.hidden = true;
    state.query = '';
    render();
    searchInput.focus();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchInput.value) clearButton.click();
  });

  // Category chips (event delegation)
  $('#category-nav').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.category = chip.dataset.category;
    if (state.query) {                                // choosing a category ends a search
      state.query = '';
      searchInput.value = '';
      clearButton.hidden = true;
    }
    syncChips();
    render();
    scrollToMenuTop();
  });

  // Floating back-to-top button
  const topButton = $('#back-to-top');
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      topButton.classList.toggle('is-visible', window.scrollY > 600);
      scrollTicking = false;
    });
  }, { passive: true });
  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  // The sticky toolbar's height changes with the screen size: expose it to CSS
  // so that scrolled-to sections are never hidden underneath it.
  function syncToolbarHeight() {
    document.documentElement.style.setProperty('--toolbar-h', $('#toolbar').offsetHeight + 'px');
  }
  if ('ResizeObserver' in window) new ResizeObserver(syncToolbarHeight).observe($('#toolbar'));
  window.addEventListener('resize', syncToolbarHeight);

  /* ---------------------------------------------------------------------------
     7. START-UP
     ------------------------------------------------------------------------ */
  renderHotelInfo();
  updateStatus();
  setInterval(updateStatus, 60 * 1000);   // keep "Open now" fresh on long-open pages
  renderChips();
  renderDietFilter();
  render();
  syncToolbarHeight();
})();
