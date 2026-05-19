(function () {
  'use strict';

  var CSS = [
    '#lbx-overlay{',
      'position:fixed;inset:0;z-index:999999;',
      'background:rgba(0,0,0,.82);',
      'display:flex;align-items:center;justify-content:center;',
      'opacity:0;pointer-events:none;transition:opacity .2s;',
    '}',
    '#lbx-overlay.lbx-open{opacity:1;pointer-events:auto;}',
    '#lbx-img{',
      'max-width:88vw;max-height:80vh;',
      'object-fit:contain;border-radius:8px;',
      'background:#fff;padding:1.5rem;',
      'box-shadow:0 8px 40px rgba(0,0,0,.4);',
      'transform:scale(.92);transition:transform .2s;',
    '}',
    '#lbx-overlay.lbx-open #lbx-img{transform:scale(1);}',
    '#lbx-close{',
      'position:absolute;top:1.25rem;right:1.5rem;',
      'background:none;border:2px solid #fff;color:#fff;',
      'border-radius:50%;width:2.5rem;height:2.5rem;',
      'font-size:1.25rem;cursor:pointer;line-height:1;',
      'display:flex;align-items:center;justify-content:center;',
      'transition:background .15s;',
    '}',
    '#lbx-close:hover,#lbx-close:focus-visible{background:rgba(255,255,255,.2);}',
    '#lbx-close:focus-visible{outline:2px solid #fff;outline-offset:2px;}',
    '.crehi-partenaire img:focus-visible{outline:2px solid #4BA78C;outline-offset:3px;border-radius:4px;}',
  ].join('');

  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'lbx-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Agrandissement du logo');

    var img = document.createElement('img');
    img.id = 'lbx-img';
    img.alt = '';

    var btn = document.createElement('button');
    btn.id = 'lbx-close';
    btn.setAttribute('aria-label', 'Fermer');
    btn.innerHTML = '&times;';

    overlay.appendChild(img);
    overlay.appendChild(btn);
    document.body.appendChild(overlay);

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      overlay.classList.add('lbx-open');
      btn.focus();
    }
    function close() {
      overlay.classList.remove('lbx-open');
      if (lastFocus) lastFocus.focus();
    }

    var lastFocus = null;

    document.querySelectorAll('.crehi-partenaire img').forEach(function (el) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Agrandir : ' + (el.alt || 'logo partenaire'));
      el.addEventListener('click', function () {
        lastFocus = el;
        open(el.src, el.alt);
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lastFocus = el; open(el.src, el.alt); }
      });
    });

    btn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('lbx-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
