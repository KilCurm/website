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

        var nameField = form.querySelector('[name="name"]');
        var contactField = form.querySelector('[name="contact"]');
        var nameVal = nameField ? nameField.value.trim() : '';
        var contactVal = contactField ? contactField.value.trim() : '';

        if (nameVal.length < 2) {
            button.classList.remove('is-success');
            button.classList.add('is-error');
            button.textContent = 'Укажите имя (минимум 2 символа)';
            timer = setTimeout(function () {
                button.classList.remove('is-error');
                button.textContent = originalText;
                timer = null;
            }, FLASH_MS);
            return;
        }

        if (contactVal.length < 5) {
            button.classList.remove('is-success');
            button.classList.add('is-error');
            button.textContent = 'Укажите телефон или Telegram (минимум 5 символов)';
            timer = setTimeout(function () {
                button.classList.remove('is-error');
                button.textContent = originalText;
                timer = null;
            }, FLASH_MS);
            return;
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