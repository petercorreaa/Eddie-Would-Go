/* Eddie Would Go — mobile nav hamburger.
   Every page already hides .nav-links at 768px and down; this just adds a
   toggle for it, reusing the trailing spacer div in <nav> the same way
   i18n.js reuses it for the language switch (load this script after
   i18n.js so the spacer's children end up in a sane visual order). */
(function () {
  'use strict';

  function init() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    var links = nav.querySelector('.nav-links');
    if (!links) return;

    var css = document.createElement('style');
    css.textContent =
      '.nav-hamburger{display:none}' +
      '@media(max-width:768px){' +
      '.nav-hamburger{display:flex;flex-direction:column;justify-content:center;gap:5px;' +
      'width:26px;height:22px;background:none;border:0;padding:0;cursor:pointer;flex-shrink:0}' +
      '.nav-hamburger span{display:block;width:100%;height:2px;background:var(--black,#000);' +
      'transition:transform .3s ease,opacity .3s ease}' +
      '.nav-hamburger.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}' +
      '.nav-hamburger.is-open span:nth-child(2){opacity:0}' +
      '.nav-hamburger.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}' +
      '.nav-links.mobile-open{display:flex !important;position:fixed;top:64px;left:0;right:0;' +
      'flex-direction:column;gap:0;margin:0;background:var(--white,#fff);' +
      'border-bottom:1px solid var(--black,#000);padding:4px 16px 12px;z-index:150;' +
      'max-height:calc(100vh - 64px);overflow:auto}' +
      '.nav-links.mobile-open li{list-style:none;border-top:1px solid var(--gray-200,#e0e0e0)}' +
      '.nav-links.mobile-open li:first-child{border-top:0}' +
      '.nav-links.mobile-open a{display:block;padding:16px 0}' +
      '}';
    document.head.appendChild(css);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'Abrir menú');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';

    // nav's last child is always the plain spacer div reserved for the lang
    // toggle; drop the hamburger in front of it so both sit in one group.
    var last = nav.lastElementChild;
    if (last && last.tagName === 'DIV') {
      last.style.display = 'flex';
      last.style.alignItems = 'center';
      last.style.justifyContent = 'flex-end';
      last.style.gap = '14px';
      last.style.width = 'auto';
      last.insertBefore(btn, last.firstChild);
    } else {
      nav.appendChild(btn);
    }

    function close() {
      links.classList.remove('mobile-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      var open = links.classList.toggle('mobile-open');
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('mobile-open') && !links.contains(e.target) && !btn.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) { if (e.matches) close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
