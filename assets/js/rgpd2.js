/* ============================================================
   handipro-cookies.js — Gestion préférences cookies HandiPro31
   ============================================================ */

'use strict';

(function () {

  /* ── Helpers localStorage ── */
  function getPrefs() {
    try {
      return JSON.parse(localStorage.getItem('hp31_consent') || 'null');
    } catch (e) {
      return null;
    }
  }

  function savePrefs(prefs) {
    prefs.date = new Date().toISOString();
    localStorage.setItem('hp31_consent', JSON.stringify(prefs));
  }

  /* ── Initialisation des toggles depuis les préférences sauvegardées ── */
  function initToggles() {
    var prefs = getPrefs();
    if (!prefs) return;

    var map = {
      'toggle-analytics':   'analytics',
      'toggle-functional':  'functional',
      'toggle-thirdparty':  'thirdparty'
    };

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.checked = !!prefs[map[id]];
    });
  }

  /* ── Enregistrer les préférences depuis les toggles ── */
  function saveFromToggles() {
    savePrefs({
      necessary:  true,
      analytics:  !!document.getElementById('toggle-analytics')  && document.getElementById('toggle-analytics').checked,
      functional: !!document.getElementById('toggle-functional') && document.getElementById('toggle-functional').checked,
      thirdparty: !!document.getElementById('toggle-thirdparty') && document.getElementById('toggle-thirdparty').checked
    });

    var msg = document.getElementById('prefs-msg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(function () { msg.style.display = 'none'; }, 3000);
    }
  }

  /* ── Tout accepter ── */
  function acceptAll() {
    ['toggle-analytics', 'toggle-functional', 'toggle-thirdparty'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.checked = true;
    });
    saveFromToggles();
    hideBanner();
  }

  /* ── Tout refuser ── */
  function refuseAll() {
    ['toggle-analytics', 'toggle-functional', 'toggle-thirdparty'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.checked = false;
    });
    saveFromToggles();
    hideBanner();
  }

  /* ── Bannière ── */
  function showBanner() {
    var banner = document.getElementById('hp31-cookie-banner');
    if (banner) banner.style.display = 'flex';
  }

  function hideBanner() {
    var banner = document.getElementById('hp31-cookie-banner');
    if (banner) banner.style.display = 'none';
  }

  function checkBanner() {
    if (!getPrefs()) showBanner();
  }

  /* ── Exposition globale (appelée depuis les boutons HTML onclick) ── */
  window.hp31Cookies = {
    savePrefs:    saveFromToggles,
    acceptAll:    acceptAll,
    refuseAll:    refuseAll,
    hideBanner:   hideBanner
  };

  /* ── Initialisation au chargement ── */
  document.addEventListener('DOMContentLoaded', function () {
    initToggles();
    checkBanner();
  });

})();