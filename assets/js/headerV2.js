 (function() {
      // 1. TOGGLE MENU MOBILE (burger)
      const burger = document.querySelector('.hp-header__burger');
      const mobileMenu = document.getElementById('hp-mobile-menu');
      if (burger && mobileMenu) {
        const toggleMenu = () => {
          const isExpanded = burger.getAttribute('aria-expanded') === 'true';
          burger.setAttribute('aria-expanded', !isExpanded);
          mobileMenu.classList.toggle('is-open');
          // gérer le scroll du body pour éviter le défilement arrière (optionnel)
          if (!isExpanded) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        };
        burger.addEventListener('click', toggleMenu);
        
        // Fermer le menu si on clique sur un lien (optionnel mais bonne pratique)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) {
              burger.setAttribute('aria-expanded', 'false');
              mobileMenu.classList.remove('is-open');
              document.body.style.overflow = '';
            }
          });
        });
        
        // Fermer menu si resize au delà de 1023px (éviter les états bloqués)
        window.addEventListener('resize', function() {
          if (window.innerWidth > 1023 && mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        });
      }

      // 2. BOUTON RETOUR HAUT (scroll & visibilité)
      const btnTop = document.getElementById('btn-top');
      if (btnTop) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            btnTop.classList.add('visible');
          } else {
            btnTop.classList.remove('visible');
          }
        });
        btnTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      // 3. Gestion du focus et fermeture du menu avec Echap
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
          burger.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('is-open');
          document.body.style.overflow = '';
          burger.focus();
        }
      });
      
      // 4. Correction supplémentaire : éviter que le menu secondaire déborde visuellement sur tablette très étroite
      // (déjà géré en CSS, mais on ajoute un petit watch pour forcer le repositionnement si besoin)
      const pillUl = document.querySelector('.hp-header__pill ul');
      if (pillUl && window.innerWidth <= 1023) {
        // s'assurer que le contenu est bien scrollable horizontalement sans casser le centrage
        const parentPill = document.querySelector('.hp-header__pill');
        if (parentPill) {
          parentPill.style.overflowX = 'auto';
        }
      }
      
      // 5. Petite vérification : éviter que le sticky header cache du contenu lors de l'ancre
      const mainContent = document.getElementById('main-content');
      if (mainContent && window.location.hash === '#main-content') {
        const headerHeight = document.querySelector('.hp-header')?.offsetHeight || 80;
        const secondaryHeight = document.querySelector('.hp-header__secondary')?.offsetHeight || 50;
        window.scrollTo(0, mainContent.offsetTop - (headerHeight + secondaryHeight + 10));
      }
    })();
 