/* actu-slider.js — Slider actualités HandiPro31
   Responsabilité unique : gérer le slider d'articles de la page d'accueil.
   Dépendances : aucune (JS vanilla).
*/

(function () {
  'use strict';

  const SLIDER_SELECTOR = '.hp-actu-slider';
  const TRACK_SELECTOR  = '.hp-actu-track';
  const CARD_SELECTOR   = '.hp-actu-card';
  const BTN_PREV        = '[data-actu-prev]';
  const BTN_NEXT        = '[data-actu-next]';
  const DOTS_LIST       = '[data-actu-dots]';

  function initSlider(slider) {
    const track = slider.querySelector(TRACK_SELECTOR);
    const cards = Array.from(slider.querySelectorAll(CARD_SELECTOR));
    const btnPrev = slider.querySelector(BTN_PREV);
    const btnNext = slider.querySelector(BTN_NEXT);
    const dotsList = slider.querySelector(DOTS_LIST);

    if (!track || cards.length === 0) return;

    /* Si un seul article : masquer les contrôles */
    if (cards.length === 1) {
      if (btnPrev) btnPrev.hidden = true;
      if (btnNext) btnNext.hidden = true;
      if (dotsList) dotsList.hidden = true;
      return;
    }

    let current = 0;

    /* Création des dots */
    if (dotsList) {
      dotsList.innerHTML = '';
      cards.forEach(function (_, i) {
        const li = document.createElement('li');
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.setAttribute('aria-label', 'Article ' + (i + 1));
        if (i === 0) li.classList.add('active');
        li.addEventListener('click', function () { goTo(i); });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
        });
        dotsList.appendChild(li);
      });
    }

    function updateDots() {
      if (!dotsList) return;
      Array.from(dotsList.children).forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
        dot.setAttribute('aria-pressed', i === current ? 'true' : 'false');
      });
    }

    function goTo(index) {
      current = (index + cards.length) % cards.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      updateDots();
      /* Annonce lecteur d'écran */
      cards[current].setAttribute('aria-hidden', 'false');
      cards.forEach(function (c, i) {
        if (i !== current) c.setAttribute('aria-hidden', 'true');
      });
    }

    /* Init aria */
    cards.forEach(function (c, i) {
      c.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
    });

    if (btnPrev) {
      btnPrev.addEventListener('click', function () { goTo(current - 1); });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () { goTo(current + 1); });
    }

    /* Navigation clavier sur le slider (← →) */
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    /* Swipe tactile */
    let startX = null;
    slider.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      startX = null;
    }, { passive: true });
  }

  /* Initialisation au chargement */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(SLIDER_SELECTOR).forEach(initSlider);
  });

}());
