var hamburger = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function() {
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('is-open');
});

var mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('is-open');
  });
});

var hamburger = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function() {
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('is-open');
});

var mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('is-open');
  });
});
 var navLogo  = document.getElementById('nav-logo');
var heroBrand = document.getElementById('hero-brand');

function updateNavLogo() {
  var hash   = window.location.hash;
  var onHome = (hash === '' || hash === '#home');

  if (!onHome) {
    navLogo.classList.add('visible');
    return;
  }

  if (!heroBrand) {
    navLogo.classList.add('visible');
    return;
  }

  var rect = heroBrand.getBoundingClientRect();
  var navH = 62;

  if (rect.bottom < navH + 10) {
    navLogo.classList.add('visible');
  } else {
    navLogo.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateNavLogo);
window.addEventListener('hashchange', updateNavLogo);
updateNavLogo();

var backBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
});
