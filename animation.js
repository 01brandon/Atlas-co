window.addEventListener('load', function() {

  var revealEls = document.querySelectorAll('.scroll-reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});

window.addEventListener('hashchange', function() {
  if (window.location.hash === '#expertise') {
    var expCards = document.querySelectorAll('.exp-card');
    expCards.forEach(function(card, i) {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(16px)';
      setTimeout(function() {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
      }, i * 60);
    });
  }
});