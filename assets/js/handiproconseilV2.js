document.querySelectorAll('.hpc-accordeon__trigger').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.hidden = expanded;
  });
});

(function () {
  var formations = document.querySelectorAll('.hpc-formation');
  formations.forEach(function (det) {
    det.addEventListener('toggle', function () {
      if (det.open) {
        formations.forEach(function (other) {
          if (other !== det) other.open = false;
        });
      }
    });
  });
})();

