(function() {
  function ensureTopnav() {
    var existing = document.querySelector('nav.topnav');
    if (existing) return existing;

    var nav = document.createElement('nav');
    nav.className = 'topnav';
    nav.innerHTML = [
      '<a class="brand" href="/">Rocky Li</a>',
      '<a href="/projects/">Lab</a>',
      '<a href="/blog/">Blog</a>'
    ].join('');
    document.body.insertBefore(nav, document.body.firstChild);
    return nav;
  }

  function offsetBodyForTopnav() {
    var nav = ensureTopnav();
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', offsetBodyForTopnav);
  } else {
    offsetBodyForTopnav();
  }

  window.addEventListener('resize', offsetBodyForTopnav);
})();
