document.addEventListener('DOMContentLoaded', function () {
    const dropdownButtons = document.querySelectorAll('.dropdown-toggle');

    function isDesktop() {
        return window.innerWidth >= 768;
    }

    // Appliquer dropdown SEULEMENT en version desktop
    if (isDesktop()) {
        dropdownButtons.forEach(button => {
            const menuId = button.getAttribute('aria-controls');
            const menu = document.getElementById(menuId);
            if (!menu) return;

            const links = menu.querySelectorAll('a');

            function closeAllMenus() {
                dropdownButtons.forEach(btn => {
                    const otherMenu = document.getElementById(btn.getAttribute('aria-controls'));
                    if (otherMenu) {
                        otherMenu.setAttribute('hidden', '');
                        btn.setAttribute('aria-expanded', 'false');
                        btn.classList.remove('is-active');
                    }
                });
            }

            function toggleMenu(open) {
                if (open) {
                    closeAllMenus();
                    menu.removeAttribute('hidden');
                    button.setAttribute('aria-expanded', 'true');
                    button.classList.add('is-active');
                } else {
                    menu.setAttribute('hidden', '');
                    button.setAttribute('aria-expanded', 'false');
                    button.classList.remove('is-active');
                }
            }

            // Survol souris
            button.addEventListener('mouseenter', () => toggleMenu(true));
            menu.addEventListener('mouseleave', () => toggleMenu(false));
            button.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (!menu.matches(':hover') && !button.matches(':hover')) {
                        toggleMenu(false);
                    }
                }, 150);
            });

            // Clavier
            button.addEventListener('focus', () => toggleMenu(true));
            links.forEach((link, index) => {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        links[(index + 1) % links.length].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        links[(index - 1 + links.length) % links.length].focus();
                    } else if (e.key === 'Escape') {
                        toggleMenu(false);
                        button.focus();
                    }
                });
                link.addEventListener('click', () => toggleMenu(false));
            });

            // Fermeture au clic hors menu
            document.addEventListener('click', (e) => {
                if (!button.contains(e.target) && !menu.contains(e.target)) {
                    toggleMenu(false);
                }
            });
        });
    }
});
