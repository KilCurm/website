(function () {

    var form = document.getElementById('contactForm');
    if (!form) return;

    var button = form.querySelector('.form-submit');
    if (!button) return;

    var ENDPOINT = 'https://formspree.io/f/mkjrgroy';
    var FLASH_MS = 3000;

    var originalText = button.textContent.trim();
    var timer = null;

    form.addEventListener('submit', function (event) {

        event.preventDefault();

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        button.disabled = true;
        button.classList.remove('is-success', 'is-error');
        button.textContent = 'Отправка…';

        fetch(ENDPOINT, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        })
            .then(function (response) {
                if (response.ok) {
                    form.reset();
                    button.classList.add('is-success');
                    button.textContent = 'Готово!';
                } else {
                    button.classList.add('is-error');
                    button.textContent = 'Ошибка. Попробуйте ещё раз';
                }
            })
            .catch(function () {
                button.classList.add('is-error');
                button.textContent = 'Ошибка. Попробуйте ещё раз';
            })
            .finally(function () {
                timer = setTimeout(function () {
                    button.classList.remove('is-success', 'is-error');
                    button.textContent = originalText;
                    button.disabled = false;
                    timer = null;
                }, FLASH_MS);
            });

    });

})();