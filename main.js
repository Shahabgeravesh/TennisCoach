(function () {
  function initMobileMenu() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !toggle.contains(event.target)) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  function initFadeIn() {
    var fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    if (!('IntersectionObserver' in window)) {
      fadeElements.forEach(function (el) {
        el.style.opacity = '1';
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initFadeIn();
  });
})();
