// Navigation scroll state
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navOverlay = document.querySelector('.nav-overlay');

if (navToggle && navOverlay) {
  navToggle.addEventListener('click', () => {
    const isOpen = navOverlay.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navOverlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navOverlay.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Hero parallax
const heroBg = document.querySelector('.hero .hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = 'translateY(' + (window.scrollY * 0.38) + 'px)';
  }, { passive: true });
}

// Intersection observer for scroll animations
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-in').forEach(function(el) {
  observer.observe(el);
});

// Active nav link
var page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function(a) {
  if (a.getAttribute('href') === page) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});

// Menu subnav active state on scroll
var menuCats = document.querySelectorAll('.menu-cat[id]');
var subnavLinks = document.querySelectorAll('.menu-subnav a');

if (menuCats.length && subnavLinks.length) {
  var catObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        subnavLinks.forEach(function(a) {
          if (a.getAttribute('href') === '#' + e.target.id) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  menuCats.forEach(function(c) { catObserver.observe(c); });
}

// Reservation form feedback
var resForm = document.querySelector('.res-form');
if (resForm) {
  resForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = resForm.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.textContent = 'Request Received. We will be in touch soon.';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    setTimeout(function() {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.opacity = '';
      resForm.reset();
    }, 5000);
  });
}
