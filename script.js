/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Mobile menu ---- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMenu() {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
});

mobileClose.addEventListener('click', closeMenu);

/* Close when any link inside the menu is clicked */
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
});

/* Close on Escape key */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

/* Close when tapping the backdrop (the overlay itself, not its children) */
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
});

/* ---- Scroll reveal ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ---- Scroll to top ---- */
const scrollBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Accordion ---- */
document.querySelectorAll('.accordion__trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.accordion__item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion__item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

/* ---- Toast ---- */
function showToast(message, type = 'success') {
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastOut .4s var(--ease-out) forwards';
        setTimeout(() => toast.remove(), 420);
    }, 3500);
}

/* ---- Contact form ---- */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
        { id: 'name', fg: 'fg-name', check: v => v.trim().length >= 2 },
        { id: 'email', fg: 'fg-email', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { id: 'message', fg: 'fg-message', check: v => v.trim().length >= 10 },
    ];

    fields.forEach(({ id, fg, check }) => {
        const el = document.getElementById(id);
        const group = document.getElementById(fg);
        if (!check(el.value)) { group.classList.add('error'); valid = false; }
        else { group.classList.remove('error'); }
    });

    if (valid) {
        showToast('Message sent successfully! We\'ll reply within 24 hours.', 'success');
        e.target.reset();
    } else {
        showToast('Please fill in all required fields correctly.', 'error');
    }
});
document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group').classList.remove('error'));
});

/* ---- Privacy Modal ---- */
const modal = document.getElementById('privacyModal');
document.getElementById('privacyTrigger').addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
});
function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalAccept').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav__links a');
const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.5 });
sections.forEach(s => sectionObs.observe(s));

/* ---- Product card shop now buttons ---- */
document.querySelectorAll('.product-card__btn').forEach(btn => {
    btn.addEventListener('click', () => showToast('Request sent! We\'ll contact you shortly.', 'success'));
});
