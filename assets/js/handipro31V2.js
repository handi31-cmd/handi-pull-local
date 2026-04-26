(function () {
  'use strict';

  /* ── Accordéon ── */
  function ouvrirAccordeon(trigger) {
    var contentId = trigger.getAttribute('aria-controls');
    var content = document.getElementById(contentId);
    trigger.setAttribute('aria-expanded', 'true');
    content.hidden = false;
  }

  function fermerAccordeon(trigger) {
    var contentId = trigger.getAttribute('aria-controls');
    var content = document.getElementById(contentId);
    trigger.setAttribute('aria-expanded', 'false');
    content.hidden = true;
  }

  // Fermer tous les accordéons des périodes (section dates clés uniquement)
  function fermerTousAccordeonsPeriodes() {
    document.querySelectorAll('#v3-accordeon .v3-item__trigger').forEach(function (trigger) {
      if (trigger.getAttribute('aria-expanded') === 'true') {
        fermerAccordeon(trigger);
      }
    });
  }

  // Accordéon des périodes (section dates clés) - mode exclusif
  document.querySelectorAll('#v3-accordeon .v3-item__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      
      if (!expanded) {
        // Fermer tous les autres accordéons de périodes avant d'ouvrir celui-ci
        fermerTousAccordeonsPeriodes();
        ouvrirAccordeon(this);
      } else {
        fermerAccordeon(this);
      }
    });
  });

  // Accordéon de la gouvernance (section nos équipes) - fonctionnement indépendant
  document.querySelectorAll('#v3-equipes .v3-item__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      
      if (!expanded) {
        ouvrirAccordeon(this);
      } else {
        fermerAccordeon(this);
      }
    });
  });

  /* ── Ajoute le titre court à côté de chaque date ── */
  document.querySelectorAll('.v3-dot').forEach(function (btn) {
    var label = document.createElement('span');
    label.className = 'v3-dot__label';
    label.textContent = btn.dataset.titre;
    btn.appendChild(label);
  });

  /* ── Sidebar : accordéon Dates clés ── */
  var datesToggle = document.querySelector('.ce-sidebar__nav-toggle');
  if (datesToggle) {
    datesToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var sub = document.getElementById(this.getAttribute('aria-controls'));
      this.setAttribute('aria-expanded', String(!expanded));
      sub.hidden = expanded;
    });
  }

  /* ── Sidebar : ouvre l'accordéon cible au clic ── */
  document.querySelectorAll('.ce-sidebar__nav a[href^="#v3-p"]').forEach(function (lien) {
    lien.addEventListener('click', function () {
      var cibleId = this.getAttribute('href').slice(1);
      var item = document.getElementById(cibleId);
      if (!item) return;
      var trigger = item.querySelector('.v3-item__trigger');
      if (trigger && trigger.getAttribute('aria-expanded') === 'false') {
        // Fermer tous les autres accordéons de périodes avant d'ouvrir celui-ci
        fermerTousAccordeonsPeriodes();
        ouvrirAccordeon(trigger);
      }
    });
  });

  /* ── Flottant dates ── */
  var flottant  = document.getElementById('v3-flottant');
  var overlay   = document.getElementById('v3-overlay');
  var fAnnee    = document.getElementById('v3-flottant-annee');
  var fTitre    = document.getElementById('v3-flottant-titre');
  var fTexte    = document.getElementById('v3-flottant-texte');
  var closeBtn  = document.getElementById('v3-flottant-close');
  var activeBtn = null;

  function ouvrirFlottant(btn) {
    if (activeBtn) activeBtn.classList.remove('v3-dot--active');
    activeBtn = btn;
    btn.classList.add('v3-dot--active');

    fAnnee.textContent = btn.dataset.annee;
    fTitre.textContent = btn.dataset.titre;
    fTexte.textContent = btn.dataset.texte;

    flottant.hidden = false;
    overlay.hidden  = false;
    closeBtn.focus();
  }

  function fermerFlottant() {
    flottant.hidden = true;
    overlay.hidden  = true;
    if (activeBtn) {
      activeBtn.classList.remove('v3-dot--active');
      activeBtn.focus();
      activeBtn = null;
    }
  }

  document.querySelectorAll('.v3-dot').forEach(function (btn) {
    btn.addEventListener('click', function () { ouvrirFlottant(this); });
  });

  closeBtn.addEventListener('click', fermerFlottant);
  overlay.addEventListener('click', fermerFlottant);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !flottant.hidden) fermerFlottant();
  });

  /* ── Onglets valeurs / principes ── */
  document.querySelectorAll('.v3-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.v3-tab').forEach(function (t) {
        t.classList.remove('v3-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.v3-tab-panel').forEach(function (p) { p.hidden = true; });
      this.classList.add('v3-tab--active');
      this.setAttribute('aria-selected', 'true');
      var panel = document.getElementById(this.getAttribute('aria-controls'));
      panel.hidden = false;
      panel.querySelectorAll('.v3-valeur-card, .v3-principe').forEach(function (el, i) {
        if (!el.classList.contains('v3-visible')) {
          el.style.animationDelay = (i * 0.08) + 's';
          el.classList.add('v3-visible');
        }
      });
    });
  });

  /* ── Animation valeurs au scroll ── */
  if ('IntersectionObserver' in window) {
    var animObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('v3-visible');
          animObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('#v3-tab-valeurs .v3-valeur-card').forEach(function (el, i) {
      el.style.animationDelay = (i * 0.1) + 's';
      animObs.observe(el);
    });
  } else {
    document.querySelectorAll('.v3-valeur-card, .v3-principe').forEach(function (el) {
      el.classList.add('v3-visible');
    });
  }

})();