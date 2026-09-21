(function(){
  var THEME_KEY = 'swiftbox-theme';
  var RTL_KEY = 'swiftbox-rtl';
  var body = document.body;
  var themeBtn = document.getElementById('themeToggle');
  var langBtn = document.getElementById('langToggle');

  function applyTheme(theme){
    var isLight = theme === 'light';
    body.classList.toggle('light', isLight);
    body.classList.toggle('dark', !isLight);
    themeBtn.innerHTML = isLight
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeBtn.setAttribute('aria-pressed', String(isLight));
  }

  function applyDir(isRtl){
    body.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    langBtn.setAttribute('aria-label', isRtl ? 'Switch to left-to-right' : 'Switch to right-to-left');
    langBtn.setAttribute('aria-pressed', String(isRtl));
  }

  applyTheme(localStorage.getItem(THEME_KEY) || 'dark');
  applyDir(localStorage.getItem(RTL_KEY) === 'true');

  themeBtn.addEventListener('click', function(){
    var next = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  langBtn.addEventListener('click', function(){
    var next = body.getAttribute('dir') !== 'rtl';
    applyDir(next);
    localStorage.setItem(RTL_KEY, String(next));
  });

  window.addEventListener('storage', function(e){
    if(e.key === THEME_KEY){ applyTheme(e.newValue || 'dark'); }
    if(e.key === RTL_KEY){ applyDir(e.newValue === 'true'); }
  });

  document.querySelectorAll('.nav-dropdown > .nav-drop-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var parent = btn.closest('.nav-dropdown');
      var isOpen = parent.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(function(d){
        d.classList.remove('open');
        d.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
      });
      if(!isOpen){
        parent.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', function(){
    document.querySelectorAll('.nav-dropdown.open').forEach(function(d){
      d.classList.remove('open');
      d.querySelector('.nav-drop-btn').setAttribute('aria-expanded', 'false');
    });
  });

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  function closeMobileNav(){
    if(!navLinks || !navToggle) return;
    navLinks.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  function openMobileNav(){
    if(!navLinks || !navToggle) return;
    navLinks.classList.add('mobile-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }

  if(navToggle && navLinks){
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = navLinks.classList.contains('mobile-open');
      if(isOpen){
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        closeMobileNav();
      });
    });

    document.addEventListener('click', function(e){
      if(!navLinks.classList.contains('mobile-open')) return;
      if(navLinks.contains(e.target) || navToggle.contains(e.target)) return;
      closeMobileNav();
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ closeMobileNav(); }
    });

    window.addEventListener('resize', function(){
      if(window.innerWidth > 1023){ closeMobileNav(); }
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }
})();

(function () {
  const navLinks = document.querySelectorAll('.nav-links > li > a, .nav-dropdown-menu a');
  const dropBtn = document.querySelector('.nav-drop-btn');

  function normalize(path) {
    let p = path.split('/').pop() || 'index';
    p = p.replace(/\.html$/i, '');
    return p.toLowerCase() || 'index';
  }

  const currentFile = normalize(location.pathname);
  const homePages = ['index', 'home2', ''];

  function clearActive() {
    navLinks.forEach(a => a.classList.remove('active'));
    if (dropBtn) dropBtn.classList.remove('active');
  }

  function setStaticActive() {
    clearActive();

    if (homePages.includes(currentFile)) {
      if (dropBtn) dropBtn.classList.add('active');
      const dropMatch = Array.from(navLinks).find(a => normalize(a.getAttribute('href') || '') === (currentFile || 'index'));
      if (dropMatch) dropMatch.classList.add('active');
      return;
    }

    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href && normalize(href) === currentFile) {
        a.classList.add('active');
      }
    });
  }

  setStaticActive();
})();


"use strict";

document.addEventListener("DOMContentLoaded", () => {

    document.documentElement.classList.add("js-enabled");

    const revealElements = document.querySelectorAll(
        ".reveal, " +
        ".home2-hero-content, " +
        ".home2-hero-trust, " +
        ".home2-intro-image, " +
        ".home2-intro-content, " +
        ".insight-feature, " +
        ".insight-item, " +
        ".showcase-card, " +
        ".protection-image, " +
        ".protection-content, " +
        ".experience-image, " +
        ".experience-quote, " +
        ".experience-feature, " +
        ".planning-image, " +
        ".planning-content, " +
        ".home2-cta-banner"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold:0.12,
                rootMargin:"0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {

            element.classList.add("section-reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("section-reveal");
            element.classList.add("active");

        });

    }

});

