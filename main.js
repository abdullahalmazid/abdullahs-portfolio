// ═══════════════════════════════════════════
//  main.js — shared JS for all pages
// ═══════════════════════════════════════════

(function () {
  'use strict';

  function init() {

    // ── Footer year ───────────────────────────────────────
    var yrEl = document.getElementById('yr');
    if (yrEl) yrEl.textContent = new Date().getFullYear();

    // ── Scroll: progress + nav shadow + back-to-top ───────
    var pb  = document.getElementById('progress');
    var btt = document.getElementById('btt');
    var nav = document.getElementById('nav');

    window.addEventListener('scroll', function () {
      var s = window.scrollY;
      var t = document.body.scrollHeight - window.innerHeight;
      if (pb)  pb.style.width = Math.min(t > 0 ? (s / t) * 100 : 0, 100) + '%';
      if (nav) { if (s > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); }
      if (btt) { if (s > 400) btt.classList.add('show'); else btt.classList.remove('show'); }
    }, { passive: true });

    // ── Scroll reveal ─────────────────────────────────────
    if ('IntersectionObserver' in window) {
      var ro = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
      document.querySelectorAll('.reveal').forEach(function (el) { ro.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }

    // ── Mobile menu ───────────────────────────────────────
    var burger  = document.getElementById('burger');
    var mobMenu = document.getElementById('mob-menu');

    function closeMenu() {
      if (!mobMenu) return;
      mobMenu.classList.remove('open');
      if (burger) burger.classList.remove('open');
      document.body.style.overflow = '';
    }

    window.toggleMenu = function () {
      if (!mobMenu) return;
      var opening = !mobMenu.classList.contains('open');
      if (opening) {
        mobMenu.classList.add('open');
        if (burger) burger.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        closeMenu();
      }
    };

    // Close menu on any link tap inside menu
    if (mobMenu) {
      mobMenu.addEventListener('click', function (e) {
        var a = e.target.closest('a');
        if (a || e.target === mobMenu) closeMenu();
      });
    }

    // ── Lucide icons ──────────────────────────────────────
    if (window.lucide) window.lucide.createIcons();

    // ── Page transitions (CSS class-based, no inline style) ─
    var leaving = false;
    document.addEventListener('click', function (e) {
      if (leaving) return;
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (href.indexOf('://') !== -1 || href.indexOf('mailto') === 0 || href.indexOf('tel') === 0) return;
      if (link.target === '_blank') return;
      closeMenu();
      leaving = true;
      e.preventDefault();
      document.documentElement.classList.add('is-leaving');
      setTimeout(function () { window.location.href = href; }, 220);
    });

  }

  // Safe DOMContentLoaded guard
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
