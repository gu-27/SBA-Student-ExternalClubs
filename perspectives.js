/* Builds the Perspectives page from content/perspectives.md (the single source of
   truth). The markdown has a regular shape: three "## The X Lens" sections, each with
   five bold-led fields (opportunity, exposure, considerations, reframe, guiding
   question). This parses that shape into an accessible tab interface. If the shape
   ever changes and parsing fails, it falls back to rendering the whole document. */
(function () {
  var mount = document.getElementById('perspectives');
  var src = 'content/perspectives.md';

  var FIELD_ORDER = ['opportunity', 'exposure', 'considerations', 'reframe', 'question'];
  var FIELD_LABEL = {
    opportunity: 'Opportunity',
    exposure: 'Exposure',
    considerations: 'Considerations',
    reframe: 'Reframe',
    question: 'Guiding question'
  };

  function inline(md) { return window.marked ? marked.parseInline(md) : md; }
  function block(md) { return window.marked ? marked.parse(md) : md; }

  function classify(para) {
    var l = para.toLowerCase();
    if (l.indexOf('opportunity through this lens') > -1) return 'opportunity';
    if (l.indexOf('exposure through this lens') > -1) return 'exposure';
    if (l.indexOf('should consider') > -1) return 'considerations';
    if (l.indexOf('the reframe') > -1) return 'reframe';
    if (l.indexOf('one question to keep asking') > -1) return 'question';
    return null;
  }

  function stripLeadIn(para) {
    // Remove the opening **...** label so the body reads cleanly under our own label.
    return para.replace(/^\s*\*\*[\s\S]*?\*\*\s*/, '').trim();
  }

  function parseLens(chunk) {
    var titleMatch = chunk.match(/##\s+The\s+(.+?)\s+Lens/);
    if (!titleMatch) return null;
    var name = titleMatch[1].replace(/[’']s$/, ''); // "Administrator's" -> "Administrator"
    var descMatch = chunk.match(/\*\(([\s\S]*?)\)\*/);
    var desc = descMatch ? descMatch[1].trim() : '';

    var fields = {};
    chunk.split(/\n\s*\n/).forEach(function (para) {
      para = para.trim();
      if (para.indexOf('**') !== 0) return;
      var key = classify(para);
      if (key && !fields[key]) fields[key] = stripLeadIn(para);
    });
    return { name: name, desc: desc, fields: fields };
  }

  function buildIntro(introChunk) {
    // Keep the source's intro paragraphs, drop the heading lines and the school line.
    return introChunk.split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(function (p) {
        return p && p.indexOf('#') !== 0 && !/^\*\*School of Business/i.test(p);
      });
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function render(text) {
    var parts = text.split(/\n-{3,}\n/);
    if (parts.length < 5) throw new Error('unexpected document shape');

    var intro = buildIntro(parts[0]);
    var lenses = parts.slice(1, parts.length - 1).map(parseLens).filter(Boolean);
    var footer = parts[parts.length - 1].trim();

    if (lenses.length !== 3) throw new Error('expected 3 lenses, found ' + lenses.length);
    lenses.forEach(function (lz) {
      FIELD_ORDER.forEach(function (f) {
        if (!lz.fields[f]) throw new Error('missing field "' + f + '" in ' + lz.name + ' lens');
      });
    });

    mount.innerHTML = '';

    // Intro
    intro.forEach(function (p) { mount.appendChild(el('p', { class: 'intro' }, inline(p))); });

    // Tabs
    var tabsWrap = el('div', { class: 'tabs' });
    var list = el('div', { class: 'tablist', role: 'tablist', 'aria-label': 'Perspective lenses' });
    var panelsWrap = el('div', { class: 'panels' });

    lenses.forEach(function (lz, i) {
      var tid = 'tab-' + i, pid = 'panel-' + i;
      var tab = el('button', {
        class: 'tab', role: 'tab', id: tid, 'aria-controls': pid,
        'aria-selected': i === 0 ? 'true' : 'false', tabindex: i === 0 ? '0' : '-1', type: 'button'
      }, lz.name);
      list.appendChild(tab);

      var panel = el('section', {
        class: 'tabpanel', role: 'tabpanel', id: pid, 'aria-labelledby': tid, tabindex: '0'
      });
      if (i !== 0) panel.hidden = true;

      if (lz.desc) panel.appendChild(el('p', { class: 'lens-desc' }, lz.desc));

      FIELD_ORDER.forEach(function (f) {
        if (f === 'question') return;
        var field = el('div', { class: 'lens-field' });
        field.appendChild(el('span', { class: 'lens-label' }, FIELD_LABEL[f]));
        field.appendChild(el('div', { class: 'lens-body' }, inline(lz.fields[f])));
        panel.appendChild(field);
      });

      var q = el('div', { class: 'lens-question' });
      q.appendChild(el('span', { class: 'lens-label' }, FIELD_LABEL.question));
      q.appendChild(el('p', { class: 'lens-q-text' }, inline(lz.fields.question)));
      panel.appendChild(q);

      panelsWrap.appendChild(panel);
    });

    tabsWrap.appendChild(list);
    tabsWrap.appendChild(panelsWrap);
    mount.appendChild(tabsWrap);

    if (footer) mount.appendChild(el('p', { class: 'lens-footer' }, inline(footer)));

    wireTabs(list, panelsWrap);
  }

  function wireTabs(list, panelsWrap) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = j === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach(function (t, i) { t.addEventListener('click', function () { select(i, true); }); });

    list.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      else return;
      e.preventDefault();
      select(n, true);
    });

    // Touch swipe on the panels area (mobile).
    var x0 = null, y0 = null;
    panelsWrap.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    panelsWrap.addEventListener('touchend', function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        var cur = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
        var next = dx < 0 ? (cur + 1) % tabs.length : (cur - 1 + tabs.length) % tabs.length;
        select(next, false);
      }
      x0 = null;
    }, { passive: true });
  }

  function fail(msg, text) {
    // Graceful fallback: show the whole document rather than nothing.
    mount.innerHTML =
      '<p class="lens-fallback">Showing the full document.</p>' + block(text || '');
    if (window.console) console.warn('Perspectives tab build failed:', msg);
  }

  fetch(src)
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(function (text) {
      try { render(text); }
      catch (e) { fail(e.message, text); }
    })
    .catch(function (e) {
      mount.innerHTML =
        '<p style="color:#a71828">Could not load the perspectives (' + e.message + ').</p>' +
        '<p>If you are previewing locally, serve the folder over HTTP first, for example ' +
        '<code>python3 -m http.server 8888</code>.</p>';
    });
})();
