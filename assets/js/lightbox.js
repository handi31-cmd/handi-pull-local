/* --- V1 : fermeture lightbox au clavier --- */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') document.getElementById('crehi-lightbox').classList.remove('is-open');
});

/* --- V2 : lightbox dynamique — 2 cartes côte à côte --- */
function crehiLightboxOpen(src, alt) {
  var lb = document.getElementById('crehi-lightbox');
  var img = lb.querySelector('.hp-lightbox__img');
  img.src = src;
  img.alt = alt;
  lb.classList.add('is-open');
}