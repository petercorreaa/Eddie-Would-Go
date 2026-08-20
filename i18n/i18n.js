/* Eddie Would Go — runtime ES/EN language toggle.
   Spanish lives in the HTML; English arrives as /i18n/en/<slug>.json.
   Keys are the whitespace-normalised innerHTML of each leaf block, so the
   markup itself never needs translation ids. */
(function () {
  'use strict';

  var STORE_KEY = 'ewg-lang';
  var DEFAULT_LANG = 'es';
  var BLOCK_SEL = 'p,h1,h2,h3,h4,h5,h6,li,blockquote,div,section,article,aside,' +
                  'header,footer,nav,main,ul,ol,figure,figcaption,td,th,tr,table,' +
                  'thead,tbody,form,hr';
  var MEDIA_SEL = 'img,iframe,svg,script,style,video,audio,canvas,picture,source';
  var MEDIA_TAGS = { img:1, iframe:1, svg:1, script:1, style:1, video:1, audio:1,
                     canvas:1, picture:1, source:1, br:1 };
  var ATTRS = ['alt', 'title', 'placeholder', 'aria-label'];

  // must stay byte-identical in behaviour to norm() in tools/extract.py
  function norm(s) {
    return String(s)
      .replace(/&nbsp;/g, ' ')
      .replace(/ /g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key);
          localStorage.setItem(key, val); } catch (e) { return null; }
  }

  function slug() {
    var p = location.pathname.replace(/\/+$/, '');
    if (p === '' || /\/index\.html$/i.test(p)) return 'index';
    var m = p.match(/([^\/]+)\.html$/i);
    return m ? m[1] : 'index';
  }

  /* ---- undo log so we can flip back to Spanish without a reload ---- */
  var log = [];
  function setHTML(el, html) { log.push([el, 'h', el.innerHTML]); el.innerHTML = html; }
  function setText(node, txt) { log.push([node, 't', node.nodeValue]); node.nodeValue = txt; }
  function setAttr(el, name, val) {
    log.push([el, 'a', el.getAttribute(name), name]);
    el.setAttribute(name, val);
  }
  function undo() {
    for (var i = log.length - 1; i >= 0; i--) {
      var r = log[i];
      if (r[1] === 'h') r[0].innerHTML = r[2];
      else if (r[1] === 't') r[0].nodeValue = r[2];
      else if (r[1] === 'x') document.title = r[2];
      else r[0].setAttribute(r[3], r[2]);
    }
    log = [];
  }

  /* ---- the walk: mirrored exactly by tools/extract.py ---- */
  function isLeaf(el) {
    return !el.querySelector(BLOCK_SEL) && !el.querySelector(MEDIA_SEL);
  }

  var misses = [];

  function walk(el, dict) {
    var i, child, kids = el.children;
    for (i = 0; i < kids.length; i++) {
      child = kids[i];
      if (MEDIA_TAGS[child.tagName.toLowerCase()]) continue;
      if (child.classList && child.classList.contains('lang-toggle')) continue;
      if (isLeaf(child)) {
        var key = norm(child.innerHTML);
        if (key && dict[key] != null) setHTML(child, dict[key]);
        else if (key && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]/.test(key)) misses.push(key);
        continue;
      }
      walk(child, dict);
    }
    // loose text sitting directly beside media/blocks (e.g. label next to an svg)
    var nodes = el.childNodes;
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.nodeType === 3) {
        var t = norm(n.nodeValue);
        if (t && dict[t] != null) {
          setText(n, n.nodeValue.match(/^\s*/)[0] + dict[t] + n.nodeValue.match(/\s*$/)[0]);
        }
      }
    }
  }

  function applyAttrs(dict) {
    var els = document.querySelectorAll('[' + ATTRS.join('],[') + ']');
    for (var i = 0; i < els.length; i++) {
      for (var a = 0; a < ATTRS.length; a++) {
        var v = els[i].getAttribute(ATTRS[a]);
        if (v && dict[norm(v)] != null) setAttr(els[i], ATTRS[a], dict[norm(v)]);
      }
    }
  }

  /* ---- language switching ---- */
  var cache = {};
  var current = DEFAULT_LANG;

  function fetchDict(lang) {
    if (cache[lang]) return Promise.resolve(cache[lang]);
    var base = '/i18n/' + lang + '/';
    return Promise.all([
      fetch(base + '_common.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch(base + slug() + '.json').then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]).then(function (parts) {
      var merged = { u: {}, a: {}, title: null };
      parts.forEach(function (p) {
        Object.assign(merged.u, p.u || {});
        Object.assign(merged.a, p.a || {});
        if (p.title) merged.title = p.title;
      });
      cache[lang] = merged;
      return merged;
    });
  }

  function reveal() { document.documentElement.classList.remove('i18n-loading'); }

  /* ?i18ndebug=1 parks every unmatched key in the DOM so `extract.py` drift is
     visible to a headless dump, not just the console. */
  function reportMisses() {
    if (misses.length) console.warn('[i18n] ' + misses.length + ' untranslated key(s)', misses);
    if (!/[?&]i18ndebug/.test(location.search)) return;
    var box = document.getElementById('i18n-misses') || document.createElement('script');
    box.id = 'i18n-misses';
    box.type = 'application/json';
    box.textContent = JSON.stringify(misses, null, 1);
    document.body.appendChild(box);
  }

  function setLang(lang, persist) {
    if (persist !== false) store(STORE_KEY, lang);
    if (lang === current && log.length === 0 && lang === DEFAULT_LANG) { paintToggle(lang); reveal(); return Promise.resolve(); }

    if (lang === DEFAULT_LANG) {
      undo();
      current = DEFAULT_LANG;
      document.documentElement.setAttribute('lang', 'es');
      paintToggle(lang);
      reveal();
      return Promise.resolve();
    }

    return fetchDict(lang).then(function (d) {
      undo();
      misses = [];
      walk(document.body, d.u);
      reportMisses();
      applyAttrs(d.a);
      if (d.title) { log.push([document, 'x', document.title]); document.title = d.title; }
      document.documentElement.setAttribute('lang', lang);
      current = lang;
      paintToggle(lang);
      reveal();
    }).catch(function (e) {
      console.warn('[i18n] falling back to Spanish:', e);
      reveal();
    });
  }

  /* ---- toggle UI ---- */
  var toggleEl = null;

  function paintToggle(lang) {
    if (!toggleEl) return;
    var btns = toggleEl.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === lang;
      btns[i].classList.toggle('is-active', on);
      // classList.toggle(..., false) leaves a stray class="" behind
      if (!btns[i].className) btns[i].removeAttribute('class');
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function buildToggle() {
    var nav = document.querySelector('nav');
    if (!nav) return;

    var css = document.createElement('style');
    css.textContent =
      '.lang-toggle{display:inline-flex;align-items:center;border:1px solid var(--black,#000);' +
      'border-radius:999px;overflow:hidden;flex-shrink:0;background:var(--white,#fff);height:28px}' +
      '.lang-toggle button{font-family:inherit;font-size:0.68rem;font-weight:500;letter-spacing:0.1em;' +
      'text-transform:uppercase;padding:0 10px;height:100%;border:0;background:transparent;color:var(--black,#000);' +
      'cursor:pointer;transition:background .25s ease,color .25s ease;line-height:1}' +
      '.lang-toggle button.is-active{background:var(--black,#000);color:var(--white,#fff)}' +
      '.lang-toggle button:not(.is-active):hover{background:var(--gray-200,#e0e0e0)}' +
      '@media(max-width:768px){.lang-toggle{height:26px}.lang-toggle button{font-size:0.6rem;padding:0 8px}}';
    document.head.appendChild(css);

    toggleEl = document.createElement('div');
    toggleEl.className = 'lang-toggle';
    toggleEl.setAttribute('role', 'group');
    toggleEl.setAttribute('aria-label', 'Language / Idioma');
    toggleEl.innerHTML =
      '<button type="button" data-lang="es" title="Español">ES</button>' +
      '<button type="button" data-lang="en" title="English">EN</button>';

    toggleEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) setLang(b.getAttribute('data-lang'));
    });

    // every nav ends with an empty spacer div kept for symmetry — reuse it
    var spacer = null, kids = nav.children;
    for (var i = kids.length - 1; i >= 0; i--) {
      if (kids[i].tagName === 'DIV' && !kids[i].children.length && !norm(kids[i].textContent)) {
        spacer = kids[i]; break;
      }
    }
    if (spacer) {
      spacer.style.width = 'auto';
      spacer.style.display = 'flex';
      spacer.style.justifyContent = 'flex-end';
      spacer.style.minWidth = '80px';
      spacer.appendChild(toggleEl);
    } else {
      nav.appendChild(toggleEl);
    }
  }

  function init() {
    buildToggle();
    // ?lang=en wins over the stored preference, so an English link can be shared
    var forced = null;
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'es') forced = q;
    } catch (e) {}
    if (forced) setLang(forced, true);
    else setLang(store(STORE_KEY) || DEFAULT_LANG, false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // safety net: never leave the page hidden
  setTimeout(reveal, 4000);

  window.EWGi18n = { set: setLang, get: function () { return current; } };
})();
