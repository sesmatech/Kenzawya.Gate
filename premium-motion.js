/* Premium motion layer — presentation only. Requires AOS from the CDN. */
(function () {
  function revealWithoutAos() {
    document.querySelectorAll('[data-aos]').forEach(function (element) {
      element.removeAttribute('data-aos');
      element.removeAttribute('data-aos-delay');
      element.removeAttribute('data-aos-duration');
      element.removeAttribute('data-aos-easing');
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
  }
  function decorate() {
    if (typeof AOS === 'undefined') {
      // AOS is enhancement-only. If its CDN is blocked, never leave content hidden.
      revealWithoutAos();
      return;
    }
    var selectors = [
      '.section-card', '.service-card', '.project-card', '.video-card',
      '.compound-news-card', '.transport-card', '.apt-section', '.ad-card',
      '.info-item', '.stop-item', '.news-slide', '.site-footer'
    ];
    var index = 0;
    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (element) {
        if (!element.hasAttribute('data-aos')) element.setAttribute('data-aos', 'fade-up');
        if (!element.hasAttribute('data-aos-duration')) element.setAttribute('data-aos-duration', '560');
        if (!element.hasAttribute('data-aos-easing')) element.setAttribute('data-aos-easing', 'ease-out-cubic');
        if (!element.hasAttribute('data-aos-delay')) element.setAttribute('data-aos-delay', String(Math.min((index++ % 5) * 55, 220)));
      });
    });
    AOS.init({
      once: true,
      duration: 560,
      offset: 42,
      easing: 'ease-out-cubic',
      disable: function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    });
    // Some sections are populated by the existing page scripts after load.
    window.setTimeout(function () { if (window.AOS) AOS.refreshHard(); }, 900);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate, { once: true });
  else decorate();
  window.setTimeout(function () { if (typeof AOS === 'undefined') revealWithoutAos(); }, 1200);
})();
