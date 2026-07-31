/* TEMA OSCURO / CLARO */

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const htmlEl = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    themeIcon.classList.remove('fa-moon', 'fa-sun');
    themeIcon.classList.add(theme === 'dark' ? 'fa-moon' : 'fa-sun');
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* IDIOMA (ES / EN) */

const langSelect = document.getElementById('lang-select');
const translatableEls = document.querySelectorAll('[data-es][data-en]');

function applyLanguage(lang) {
    translatableEls.forEach((el) => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    htmlEl.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
}

const savedLang = localStorage.getItem('lang') || 'es';
langSelect.value = savedLang;
applyLanguage(savedLang);

langSelect.addEventListener('change', (event) => {
    applyLanguage(event.target.value);
});


/* REVEAL ON SCROLL */

const revealElements = document.querySelectorAll('.reveal-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // entry.isIntersecting es true cuando el elemento ya es visible en el viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.15 
});

revealElements.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.5 
});

sections.forEach((section) => navObserver.observe(section));