/* Burger-меню: toggle, aria, авто-закрытие */

(function () {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    function open() {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Закрыть меню');
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
    }

    function close() {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
    }

    function isOpen() {
        return toggle.getAttribute('aria-expanded') === 'true';
    }

    // Клик по кнопке — toggle
    toggle.addEventListener('click', function () {
        isOpen() ? close() : open();
    });

    // Esc — закрыть
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) close();
    });

    // Клик вне панели — закрыть
    document.addEventListener('click', function (e) {
        if (!isOpen()) return;
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            close();
        }
    });

    // Клик по ссылке внутри панели — закрыть
    menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', close);
    });

})();
