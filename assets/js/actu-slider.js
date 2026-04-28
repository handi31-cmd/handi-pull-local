/* actu-slider.js — Slider actualités HandiPro31
   Responsabilité unique : gérer le slider d'articles de la page d'accueil.
   Dépendances : aucune (JS vanilla).
*/

(function () {

  var slider = document.querySelector('.hp-actu-slider');
  var track  = document.querySelector('.hp-actu-track');
  if (!track) return;

  var cards = Array.from(track.children).filter(function (el) {
    return el.tagName === 'ARTICLE';
  });
  if (!cards.length) return;

  var dotsContainer = slider.querySelector('[role="list"]');
  var btnPrev       = slider.querySelector('button:first-of-type');
  var btnNext       = slider.querySelector('button:last-of-type');

  var current = 0;
  var autoTimer;

  function getVisible() {
    return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 600 ? 2 : 1;
  }

  function slideCount() {
    return Math.max(1, cards.length - (getVisible() - 1));
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (var i = 0; i < slideCount(); i++) {
      var li = document.createElement('li');
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', 'Article ' + (i + 1));
      (function (idx) {
        li.addEventListener('click', function () { goTo(idx); resetAuto(); });
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(idx); resetAuto(); }
        });
      })(i);
      dotsContainer.appendChild(li);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll('li').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function updateActive() {
    var centerIdx = current + Math.floor(getVisible() / 2);
    var visible = getVisible();
    cards.forEach(function (c, i) {
      c.classList.toggle('hp-actu-card--active', i === centerIdx);
      c.setAttribute('aria-hidden', (i < current || i >= current + visible) ? 'true' : 'false');
    });
  }

  function goTo(idx) {
    var sc = slideCount();
    current = (idx + sc) % sc;
    var cardWidth = cards[0].offsetWidth;
    track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
    updateDots();
    updateActive();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAuto() { autoTimer = setInterval(next, 4000); }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  btnNext && btnNext.addEventListener('click', function () { next(); resetAuto(); });
  btnPrev && btnPrev.addEventListener('click', function () { prev(); resetAuto(); });

  slider.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  slider.addEventListener('mouseleave', startAuto);

  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); resetAuto(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); resetAuto(); }
  });

  window.addEventListener('resize', function () { buildDots(); goTo(0); });

  buildDots();
  goTo(0);
  startAuto();

})();