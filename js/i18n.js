/**
 * Lightweight i18n module for the Krishna Map site.
 * Loads JSON locale files, translates DOM nodes with data-i18n attributes,
 * and provides t(key, params) for runtime string interpolation.
 */

var I18n = (function () {
  'use strict';

  var STORAGE_KEY = 'krishna_lang';
  var DEFAULT_LOCALE = 'en';
  var currentLocale = DEFAULT_LOCALE;
  var cache = {};
  var listeners = [];

  function savedLocale() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function init(cb) {
    var saved = savedLocale() || DEFAULT_LOCALE;
    loadLocale(saved, function () {
      translateDOM();
      if (cb) cb();
    });
  }

  function setLocale(code) {
    if (code === currentLocale && cache[code]) return;
    loadLocale(code, function () {
      translateDOM();
      try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
      document.documentElement.setAttribute('lang', code);
      updateSwitcherUI();
      listeners.forEach(function (fn) { fn(code); });
    });
  }

  function loadLocale(code, cb) {
    if (cache[code]) {
      currentLocale = code;
      if (cb) cb();
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'locales/' + code + '.json', true);
    xhr.timeout = 8000;
    xhr.ontimeout = function () {
      cache[code] = { ui: {}, content: {} };
      currentLocale = code;
      if (cb) cb();
    };
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          cache[code] = JSON.parse(xhr.responseText);
        } catch (e) {
          cache[code] = { ui: {}, content: {} };
        }
      } else {
        cache[code] = { ui: {}, content: {} };
      }
      currentLocale = code;
      if (cb) cb();
    };
    xhr.onerror = function () {
      cache[code] = { ui: {}, content: {} };
      currentLocale = code;
      if (cb) cb();
    };
    xhr.send();
  }

  function t(key, params) {
    var data = cache[currentLocale];
    var val = (data && data.ui && data.ui[key]) || key;
    if (params) {
      Object.keys(params).forEach(function (k) {
        val = val.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
      });
    }
    return val;
  }

  function content() {
    var data = cache[currentLocale];
    return (data && data.content) || {};
  }

  function locale() {
    return currentLocale;
  }

  function onLocaleChange(fn) {
    listeners.push(fn);
  }

  function translateDOM() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val === key) return;
      if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('data-title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-subtitle]').forEach(function (el) {
      el.setAttribute('data-subtitle', t(el.getAttribute('data-i18n-subtitle')));
    });
  }

  function updateSwitcherUI() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLocale);
    });
  }

  return {
    init: init,
    setLocale: setLocale,
    t: t,
    content: content,
    locale: locale,
    onLocaleChange: onLocaleChange
  };
})();
