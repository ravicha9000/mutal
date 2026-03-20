/* ============================================================
   main.js — Global JavaScript (nav, dark mode, utilities)
   ============================================================ */

(function () {
  'use strict';

  /* ── Dark / Light mode ──────────────────────────────────── */
  const THEME_KEY = 'mf-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved || preferred);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ── Mobile navigation ──────────────────────────────────── */
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active nav link ────────────────────────────────────── */
  function markActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Toast notifications ────────────────────────────────── */
  window.showToast = function (message, type) {
    type = type || 'info';
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.style.cssText = [
      'background:var(--bg-card)',
      'border:1px solid var(--border)',
      'border-radius:10px',
      'padding:12px 18px',
      'font-size:0.88rem',
      'font-weight:600',
      'box-shadow:var(--shadow)',
      'display:flex',
      'align-items:center',
      'gap:10px',
      'min-width:240px',
      'animation:slideUp .25s ease',
      'color:var(--text-primary)'
    ].join(';');

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = '<span>' + (icons[type] || 'ℹ️') + '</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity .3s ease';
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  };

  /* ── Form validation helper ─────────────────────────────── */
  window.validateForm = function (formEl) {
    let valid = true;
    formEl.querySelectorAll('[required]').forEach(function (field) {
      const wrapper = field.closest('.form-group');
      const existing = wrapper && wrapper.querySelector('.field-error');
      if (existing) existing.remove();
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--danger)';
        if (wrapper) {
          const err = document.createElement('span');
          err.className = 'field-error';
          err.style.cssText = 'color:var(--danger);font-size:0.78rem;margin-top:2px;';
          err.textContent = 'This field is required.';
          wrapper.appendChild(err);
        }
      } else {
        field.style.borderColor = '';
      }
    });
    return valid;
  };

  /* ── Intersection Observer for fade-in ──────────────────── */
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) return;
    const style = document.createElement('style');
    style.textContent = '.fade-in{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}.fade-in.visible{opacity:1;transform:none}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}';
    document.head.appendChild(style);

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el); });
  }

  /* ── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileNav();
    markActiveNav();
    initSmoothScroll();
    initFadeIn();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  });
})();
