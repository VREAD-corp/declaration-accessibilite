/* A11y Kit order page: browser-side checks of the audit fields (the server checks them again).
 * Runs on the "octave-validate" event that pay.js dispatches before the form validity check.
 * Also records the cro.js 'checkout' goal (aggregate A/B counter, no data) when a valid order form is submitted. */
(function () {
  'use strict';
  var form = document.getElementById('octave-pay');
  if (!form) return;
  var site = form.elements.siteUrl;
  var pages = form.elements.pages;
  var MAX = Number(pages.getAttribute('data-max') || 20);
  function host(v) {
    var s = String(v || '').trim();
    if (!s) return '';
    if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
    try { return new URL(s).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return null; }
  }
  function check() {
    var h = host(site.value);
    site.setCustomValidity(h === null || (site.value.trim() && !/\./.test(h || '')) ? 'Adresse du site invalide (ex. https://www.exemple.fr/).' : '');
    var lines = pages.value.split(/[\s,;]+/).map(function (l) { return l.trim(); }).filter(Boolean);
    var msg = '';
    if (lines.length > MAX) msg = MAX + ' pages au maximum (' + lines.length + ' indiquées).';
    else if (h) {
      for (var i = 0; i < lines.length; i++) {
        if (/^\//.test(lines[i])) continue;
        var ph = host(lines[i]);
        if (ph !== h) { msg = 'Toutes les pages doivent appartenir au site indiqué (' + h + ') : ' + lines[i].slice(0, 80); break; }
      }
    }
    pages.setCustomValidity(msg);
    var count = document.getElementById('pages-count');
    if (count) count.textContent = lines.length ? lines.length + ' / ' + MAX + ' pages' : 'Aucune page indiquée : exploration automatique du site (' + MAX + ' pages au plus).';
  }
  site.addEventListener('input', check);
  pages.addEventListener('input', check);
  form.addEventListener('octave-validate', check);
  // cro.js goal: checkout started (pay.js, registered first, has validated the form and starts the payment).
  form.addEventListener('submit', function () {
    if (form.checkValidity() && window.octaveCro) window.octaveCro.goal('checkout');
  });
  check();
})();
