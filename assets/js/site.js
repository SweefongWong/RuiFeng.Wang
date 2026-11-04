(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Publication filters. Without JavaScript the whole list simply stays visible.
  var buttons = document.querySelectorAll('.filter');
  var pubs = document.querySelectorAll('.pub');
  var years = document.querySelectorAll('.pub-year');

  function matches(pub, filter) {
    if (filter === 'all') return true;
    if (filter === 'selected') return pub.dataset.selected === 'true';
    return pub.dataset.type === filter;
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === button));
      });
      pubs.forEach(function (pub) {
        pub.hidden = !matches(pub, button.dataset.filter);
      });
      years.forEach(function (year) {
        year.hidden = !year.querySelector('.pub:not([hidden])');
      });
    });
  });

  // Highlight the section currently in view.
  if (!('IntersectionObserver' in window)) return;
  var links = {};
  document.querySelectorAll('.sections a').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(links).forEach(function (id) {
        links[id].removeAttribute('aria-current');
      });
      links[entry.target.id].setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-15% 0px -75% 0px' });
  document.querySelectorAll('main .section').forEach(function (s) {
    observer.observe(s);
  });
})();
