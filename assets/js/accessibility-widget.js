(function () {
  'use strict';

  var STORAGE_KEY = 'a11y-prefs';
  var BASE_FONT   = 16;
  var STEP        = 2;
  var MIN_FONT    = 12;
  var MAX_FONT    = 36;

  /* ── CSS injecté ─────────────────────────────────────────────────── */
  var CSS = [
    /* Bouton déclencheur */
    '#a11y-trigger{',
      'position:fixed;bottom:1.5rem;right:1.5rem;z-index:99999;',
      'width:52px;height:52px;border-radius:50%;',
      'background:#4BA78C;border:none;cursor:pointer;',
      'display:flex;align-items:center;justify-content:center;',
      'box-shadow:0 4px 14px rgba(0,0,0,.25);',
      'transition:background .2s,transform .2s;',
    '}',
    '#a11y-trigger:hover,#a11y-trigger:focus-visible{background:#3A8A72;transform:scale(1.08);}',
    '#a11y-trigger:focus-visible{outline:3px solid #fff;outline-offset:2px;}',
    '#a11y-trigger svg{width:28px;height:28px;fill:#fff;pointer-events:none;}',

    /* Panel */
    '#a11y-panel{',
      'position:fixed;bottom:5.5rem;right:1.5rem;z-index:99998;',
      'width:288px;background:#fff;',
      'border-radius:14px;padding:1.25rem 1rem 1rem;',
      'box-shadow:0 8px 32px rgba(0,0,0,.18);',
      'border:1px solid #e0e0e0;',
      'font-family:Inter,system-ui,sans-serif;font-size:14px;color:#2D2D2D;',
      'opacity:0;transform:translateY(12px) scale(.97);pointer-events:none;',
      'transition:opacity .2s,transform .2s;',
      'max-height:calc(100vh - 8rem);overflow-y:auto;',
    '}',
    '#a11y-panel.a11y-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}',

    '#a11y-panel h2{',
      'margin:0 0 .85rem;font-size:13px;font-weight:700;',
      'color:#4BA78C;letter-spacing:.05em;text-transform:uppercase;',
      'border-bottom:2px solid #E8F7F3;padding-bottom:.5rem;text-align:center;',
    '}',

    '.a11y-row{',
      'display:flex;align-items:center;justify-content:space-between;',
      'padding:.5rem .25rem;border-bottom:1px solid #f0f0f0;gap:.5rem;',
    '}',
    '.a11y-row:last-of-type{border-bottom:none;}',

    '.a11y-label{',
      'flex:1;font-size:13px;color:#2D2D2D;line-height:1.4;',
      'display:flex;align-items:center;gap:.5rem;',
    '}',
    '.a11y-label-icon{font-size:16px;min-width:22px;text-align:center;}',

    /* Groupe A- A+ */
    '.a11y-btn-group{display:flex;align-items:center;gap:.3rem;}',
    '.a11y-btn{',
      'padding:.28rem .55rem;border:1.5px solid #4BA78C;border-radius:6px;',
      'background:#E8F7F3;color:#4BA78C;font-weight:700;font-size:13px;',
      'cursor:pointer;transition:background .15s,color .15s;line-height:1;',
    '}',
    '.a11y-btn:hover,.a11y-btn:focus-visible{background:#4BA78C;color:#fff;}',
    '.a11y-btn:focus-visible{outline:2px solid #4BA78C;outline-offset:2px;}',
    '#a11y-font-display{min-width:34px;text-align:center;font-size:12px;font-weight:700;color:#4BA78C;}',

    /* Toggles */
    '.a11y-toggle{position:relative;width:42px;height:24px;flex-shrink:0;}',
    '.a11y-toggle input{opacity:0;position:absolute;inset:0;width:100%;height:100%;margin:0;cursor:pointer;z-index:1;}',
    '.a11y-toggle-track{',
      'position:absolute;inset:0;border-radius:12px;',
      'background:#ccc;cursor:pointer;transition:background .2s;',
    '}',
    '.a11y-toggle-track::after{',
      'content:"";position:absolute;top:3px;left:3px;',
      'width:18px;height:18px;border-radius:50%;background:#fff;',
      'transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);',
    '}',
    '.a11y-toggle input:checked + .a11y-toggle-track{background:#4BA78C;}',
    '.a11y-toggle input:checked + .a11y-toggle-track::after{transform:translateX(18px);}',
    '.a11y-toggle input:focus-visible + .a11y-toggle-track{outline:2px solid #4BA78C;outline-offset:2px;}',

    /* Reset */
    '.a11y-reset{',
      'margin-top:.75rem;width:100%;padding:.45rem;',
      'background:#ff5722;border:none;border-radius:8px;',
      'font-size:13px;color:#fff;cursor:pointer;',
      'transition:background .15s;display:flex;align-items:center;',
      'justify-content:center;gap:.4rem;',
    '}',
    '.a11y-reset:hover,.a11y-reset:focus-visible{background:#e64a19;}',
    '.a11y-reset:focus-visible{outline:2px solid #e64a19;outline-offset:2px;}',

    /* ── Contrasté élevé ──────────────────────────────────────────── */
    'body.high-contrast,body.high-contrast *{background:#000!important;color:#ff0!important;border-color:#ff0!important;}',
    'body.high-contrast h1,body.high-contrast h2,body.high-contrast h3,',
    'body.high-contrast h4,body.high-contrast h5,body.high-contrast h6{color:#ff0!important;}',
    'body.high-contrast a,body.high-contrast a *{color:#0ff!important;text-decoration:underline!important;}',
    'body.high-contrast input,body.high-contrast textarea,body.high-contrast select,',
    'body.high-contrast button:not(#a11y-trigger):not(.a11y-btn):not(.a11y-reset){',
      'background:#000!important;color:#ff0!important;border:1px solid #ff0!important;',
    '}',
    'body.high-contrast img{filter:contrast(1.2) brightness(.9);}',
    'body.high-contrast #a11y-trigger{background:#4BA78C!important;}',
    'body.high-contrast #a11y-panel{background:#111!important;border-color:#333!important;}',
    'body.high-contrast #a11y-panel h2{color:#4BA78C!important;}',
    'body.high-contrast .a11y-label{color:#fff!important;}',
    'body.high-contrast .a11y-btn{background:#000!important;color:#4BA78C!important;border-color:#4BA78C!important;}',
    'body.high-contrast .a11y-btn:hover{background:#4BA78C!important;color:#000!important;}',
    'body.high-contrast .a11y-toggle-track{background:#444!important;}',
    'body.high-contrast .a11y-toggle input:checked + .a11y-toggle-track{background:#4BA78C!important;}',
    'body.high-contrast .a11y-reset{background:#ff5722!important;color:#fff!important;}',

    /* ── Liens soulignés ─────────────────────────────────────────── */
    'body.a11y-underline a{text-decoration:underline!important;text-decoration-thickness:2px!important;}',

    /* ── Espacement lettres ──────────────────────────────────────── */
    'body.a11y-spacing *{letter-spacing:.08em!important;}',

    /* ── Gros curseur ────────────────────────────────────────────── */
    'body.a11y-cursor,body.a11y-cursor *{',
      'cursor:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="27"><polygon points="2,2 22,13 13,13 12,25 2,2" fill="black" stroke="white" stroke-width="2"/></svg>\') 4 0,auto!important;',
    '}',

    /* ── Texte justifié ──────────────────────────────────────────── */
    'body.a11y-justify p{text-align:justify!important;}',

    /* ── Mode lecture ────────────────────────────────────────────── */
    'body.a11y-reading{background:#f5f2e8!important;color:#1a1a1a!important;}',
    'body.a11y-reading img:not(#a11y-trigger img),',
    'body.a11y-reading video,',
    'body.a11y-reading iframe,',
    'body.a11y-reading .hp-sidebar,body.a11y-reading .ce-sidebar,',
    'body.a11y-reading aside,',
    'body.a11y-reading .hp-partenaires,',
    'body.a11y-reading footer,body.a11y-reading .footer-site{',
      'display:none!important;',
    '}',

    /* ── Responsive ──────────────────────────────────────────────── */
    '@media(max-width:768px){',
      '#a11y-panel{width:260px;padding:1rem .85rem .85rem;}',
      '.a11y-label{font-size:12px;}',
    '}',
  ].join('');

  /* ── SVG personne bras écartés ────────────────────────────────────── */
  var ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"'
    + ' style="fill:#fff;display:block;width:28px;height:28px;flex-shrink:0"'
    + ' aria-hidden="true" focusable="false">'
    + '<path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .75 6 .91V21h2v-5h2v5h2V8.91c2-.16 4.14-.41 6-.91l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>'
    + '</svg>';

  /* ── Prefs ───────────────────────────────────────────────────────── */
  function loadPrefs() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }

  /* ── Appliquer les prefs ─────────────────────────────────────────── */
  function applyPrefs(p) {
    document.documentElement.style.fontSize = (p.fontSize || BASE_FONT) + 'px';
    document.body.classList.toggle('high-contrast',  !!p.contrast);
    document.body.classList.toggle('a11y-underline', !!p.underline);
    document.body.classList.toggle('a11y-spacing',   !!p.spacing);
    document.body.classList.toggle('a11y-cursor',    !!p.cursor);
    document.body.classList.toggle('a11y-justify',   !!p.justify);
    document.body.classList.toggle('a11y-reading',   !!p.reading);
  }

  /* ── Init ────────────────────────────────────────────────────────── */
  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var prefs = loadPrefs();
    applyPrefs(prefs);

    /* Bouton déclencheur */
    var trigger = document.createElement('button');
    trigger.id = 'a11y-trigger';
    trigger.setAttribute('aria-label', 'Ouvrir le menu d\'accessibilité');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'a11y-panel');
    trigger.innerHTML = ICON_SVG;

    /* Panel */
    var panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Options d\'accessibilité');
    panel.setAttribute('aria-modal', 'false');

    var fontSize = prefs.fontSize || BASE_FONT;

    function chk(val) { return val ? ' checked' : ''; }

    panel.innerHTML = [
      '<h2>Accessibilité</h2>',

      /* Taille police */
      '<div class="a11y-row">',
        '<span class="a11y-label" id="a11y-label-font">',
          '<span class="a11y-label-icon">🔠</span>Taille du texte',
        '</span>',
        '<div class="a11y-btn-group" role="group" aria-labelledby="a11y-label-font">',
          '<button class="a11y-btn" id="a11y-font-down" aria-label="Réduire le texte">A–</button>',
          '<span id="a11y-font-display" aria-live="polite">' + fontSize + 'px</span>',
          '<button class="a11y-btn" id="a11y-font-up" aria-label="Agrandir le texte">A+</button>',
        '</div>',
      '</div>',

      /* Contraste */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-contrast">',
          '<span class="a11y-label-icon">🌓</span>Contraste élevé',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-contrast"' + chk(prefs.contrast) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      /* Souligner liens */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-underline">',
          '<span class="a11y-label-icon">🔗</span>Souligner les liens',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-underline"' + chk(prefs.underline) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      /* Espacement */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-spacing">',
          '<span class="a11y-label-icon">↔</span>Espacement des lettres',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-spacing"' + chk(prefs.spacing) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      /* Gros curseur */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-cursor">',
          '<span class="a11y-label-icon">🖱️</span>Gros curseur',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-cursor"' + chk(prefs.cursor) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      /* Texte justifié */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-justify">',
          '<span class="a11y-label-icon">📐</span>Texte justifié',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-justify"' + chk(prefs.justify) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      /* Mode lecture */
      '<div class="a11y-row">',
        '<label class="a11y-label" for="a11y-reading">',
          '<span class="a11y-label-icon">📖</span>Mode lecture',
        '</label>',
        '<span class="a11y-toggle"><input type="checkbox" id="a11y-reading"' + chk(prefs.reading) + '>',
        '<span class="a11y-toggle-track"></span></span>',
      '</div>',

      '<button class="a11y-reset" id="a11y-reset" aria-label="Réinitialiser tous les paramètres">',
        '<span>🔄</span> Réinitialiser',
      '</button>',
    ].join('');

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    /* ── Ouvrir / fermer ──────────────────────────────────────────── */
    var isOpen = false;
    function openPanel() {
      isOpen = true;
      panel.classList.add('a11y-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.querySelector('#a11y-font-up').focus();
    }
    function closePanel() {
      isOpen = false;
      panel.classList.remove('a11y-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function () { isOpen ? closePanel() : openPanel(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) { closePanel(); trigger.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (isOpen && !panel.contains(e.target) && e.target !== trigger) closePanel();
    });

    /* ── Taille police ────────────────────────────────────────────── */
    var display = panel.querySelector('#a11y-font-display');

    panel.querySelector('#a11y-font-up').addEventListener('click', function () {
      var p = loadPrefs();
      p.fontSize = Math.min((p.fontSize || BASE_FONT) + STEP, MAX_FONT);
      savePrefs(p); applyPrefs(p);
      display.textContent = p.fontSize + 'px';
    });
    panel.querySelector('#a11y-font-down').addEventListener('click', function () {
      var p = loadPrefs();
      p.fontSize = Math.max((p.fontSize || BASE_FONT) - STEP, MIN_FONT);
      savePrefs(p); applyPrefs(p);
      display.textContent = p.fontSize + 'px';
    });

    /* ── Toggles ──────────────────────────────────────────────────── */
    ['contrast', 'underline', 'spacing', 'cursor', 'justify', 'reading'].forEach(function (key) {
      panel.querySelector('#a11y-' + key).addEventListener('change', function (e) {
        var p = loadPrefs();
        p[key] = e.target.checked;
        savePrefs(p); applyPrefs(p);
        if (key === 'reading' && e.target.checked) closePanel();
      });
    });

    /* ── Reset ────────────────────────────────────────────────────── */
    panel.querySelector('#a11y-reset').addEventListener('click', function () {
      var defaults = {
        fontSize: BASE_FONT,
        contrast: false, underline: false, spacing: false,
        cursor: false, justify: false, reading: false
      };
      savePrefs(defaults); applyPrefs(defaults);
      display.textContent = BASE_FONT + 'px';
      ['contrast','underline','spacing','cursor','justify','reading'].forEach(function (key) {
        panel.querySelector('#a11y-' + key).checked = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
