(function () {
  var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  var now = new Date();
  var cm = now.getMonth();
  var cy = now.getFullYear();
  var nm = (cm + 1) % 12;
  var ny = cm === 11 ? cy + 1 : cy;

  document.querySelectorAll('.crehi-card').forEach(function (card) {
    var type    = card.dataset.type;
    var dataImg = (card.dataset.img || '').trim();
    var dataPdf = (card.dataset.pdf || '').trim();
    var label   = card.querySelector('.crehi-card__mois');
    var imgEl   = card.querySelector('.crehi-card__img');
    var imgLink = card.querySelector('.crehi-card__img-link');
    var dlBtn   = card.querySelector('.crehi-card__dl');
    var notReady = card.querySelector('.crehi-card__notready');

    label.textContent = (type === 'actuel' ? months[cm] + ' ' + cy : months[nm] + ' ' + ny);

    var isEmpty = !dataPdf || dataPdf === '';

    if (type === 'suivant' && isEmpty) {
      if (imgLink)  imgLink.style.display  = 'none';
      if (dlBtn)    dlBtn.style.display    = 'none';
      if (notReady) notReady.removeAttribute('hidden');
    } else {
      var base = window.location.origin + '/';
      if (imgEl && dataImg)   { imgEl.src = base + dataImg; imgLink.href = base + dataImg; }
      if (dlBtn && dataPdf)     dlBtn.href = base + dataPdf;
    }
  });
})();
