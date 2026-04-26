document.querySelectorAll('.hpc-accordeon__trigger').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.hidden = expanded;
  });
});
