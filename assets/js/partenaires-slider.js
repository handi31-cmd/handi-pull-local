/* partenaires-slider.js — Partenaires HandiPro31
   Responsabilité unique : gérer prefers-reduced-motion pour la bande partenaires.
   Si l'utilisateur a réduit les animations : stoppe le défilement CSS,
   affiche la grille statique et masque les doublons aria-hidden.
*/

(function () {
  'use strict';

  const TRACK_WRAPPER = '.hp-partenaires__track-wrapper';
  const TRACK        = '.hp-partenaires__track';
  const GRID_STATIC  = '.hp-partenaires__grid-static';

  function init() {
    const wrapper = document.querySelector(TRACK_WRAPPER);
    if (!wrapper) return;

    const track      = wrapper.querySelector(TRACK);
    const gridStatic = wrapper.parentElement
      ? wrapper.parentElement.querySelector(GRID_STATIC)
      : null;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function applyMotionPreference(mq) {
      if (mq.matches) {
        /* Stopper l'animation CSS */
        if (track) {
          track.style.animation = 'none';
          /* Masquer les doublons (aria-hidden="true") */
          Array.from(track.querySelectorAll('[aria-hidden="true"]')).forEach(function (el) {
            el.hidden = true;
          });
        }
        /* Afficher grille statique */
        if (gridStatic) {
          gridStatic.style.display = 'grid';
          wrapper.hidden = true;
        }
      } else {
        if (track) {
          track.style.animation = '';
          Array.from(track.querySelectorAll('[aria-hidden="true"]')).forEach(function (el) {
            el.hidden = false;
          });
        }
        if (gridStatic) {
          gridStatic.style.display = 'none';
          wrapper.hidden = false;
        }
      }
    }

    applyMotionPreference(mediaQuery);
    mediaQuery.addEventListener('change', applyMotionPreference);

    /* Pause au focus clavier sur un logo du track */
    if (track) {
      track.addEventListener('focusin', function () {
        track.style.animationPlayState = 'paused';
      });
      track.addEventListener('focusout', function () {
        track.style.animationPlayState = '';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

}());
