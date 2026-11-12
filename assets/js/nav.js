/* Плавный скролл по якорям */

(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    if (!links.length) return;

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
})();