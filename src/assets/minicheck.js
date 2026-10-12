// Client-side automated mini-check of a pasted HTML snippet with axe-core.
// The snippet is sanitised (no scripts, no event handlers), then rendered in a
// sandboxed iframe (opaque origin) whose Content-Security-Policy blocks every
// network request except the axe-core script served by this site. Nothing is
// uploaded anywhere.

import { WCAG_TO_RGAA } from './data/rgaa-map.js';
import { AXE_TO_RGAA } from './data/axe-rgaa.js';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const DOC_LEVEL_RULES = ['html-has-lang', 'html-lang-valid', 'html-xml-lang-mismatch', 'document-title', 'bypass', 'meta-refresh', 'meta-viewport'];

export function sanitize(input) {
  const parser = new DOMParser();
  const isFullDoc = /<html[\s>]/i.test(input);
  const doc = parser.parseFromString(input, 'text/html');
  doc.querySelectorAll('script, iframe, frame, frameset, object, embed, base, meta[http-equiv], link[rel~="import"], portal').forEach((n) => n.remove());
  // External resources are never fetched: neutralise them before rendering.
  const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  doc.querySelectorAll('link[rel~="stylesheet"], link[rel~="preload"], link[rel~="prefetch"], link[rel~="icon"]').forEach((n) => n.remove());
  doc.querySelectorAll('img[src], input[type="image"][src], source[src], video[src], audio[src], track[src], video[poster]').forEach((el) => {
    for (const attr of ['src', 'poster']) {
      const val = el.getAttribute(attr);
      if (val && !/^data:/i.test(val)) el.setAttribute(attr, el.tagName === 'IMG' || el.tagName === 'INPUT' || attr === 'poster' ? PIXEL : '');
    }
  });
  doc.querySelectorAll('[srcset]').forEach((el) => el.removeAttribute('srcset'));
  doc.querySelectorAll('*').forEach((el) => {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) el.removeAttribute(attr.name);
      else if (['href', 'src', 'action', 'formaction', 'xlink:href', 'srcdoc'].includes(name) && /^\s*(javascript|data:text\/html|vbscript)/i.test(attr.value)) el.removeAttribute(attr.name);
      else if (name === 'srcdoc') el.removeAttribute(attr.name);
    }
  });
  return { isFullDoc, doc };
}

function nonce() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('');
}

function scFromTags(tags) {
  return tags
    .map((t) => t.match(/^wcag(\d)(\d)(\d+)$/))
    .filter(Boolean)
    .map((m) => `${m[1]}.${m[2]}.${m[3]}`);
}

export function buildSrcdoc(input, { axeSrc, localeData, lang, token, origin }) {
  const { isFullDoc, doc } = sanitize(input);
  const n = nonce();
  const csp = `default-src 'none'; script-src 'nonce-${n}' 'unsafe-eval' ${origin}; style-src 'unsafe-inline'; img-src data:; font-src data:`;
  const head = doc.head;
  const meta = doc.createElement('meta');
  meta.setAttribute('http-equiv', 'Content-Security-Policy');
  meta.setAttribute('content', csp);
  head.prepend(meta);
  if (!isFullDoc) {
    doc.documentElement.setAttribute('lang', lang);
    const title = doc.createElement('title');
    title.textContent = 'snippet';
    head.append(title);
  }
  const options = {
    runOnly: { type: 'tag', values: TAGS },
    resultTypes: ['violations', 'incomplete'],
    rules: isFullDoc ? {} : Object.fromEntries(DOC_LEVEL_RULES.map((r) => [r, { enabled: false }])),
  };
  const runner = `
(function(){
  var token=${JSON.stringify(token)};
  function send(m){ m.token=token; parent.postMessage(m,'*'); }
  try {
    ${localeData ? `axe.configure({locale:${JSON.stringify(localeData).replace(/</g, '\\u003c')}});` : ''}
    axe.run(document, ${JSON.stringify(options)}).then(function(r){
      function slim(list){ return list.map(function(v){ return {id:v.id, impact:v.impact, help:v.help, description:v.description, helpUrl:v.helpUrl, tags:v.tags,
        nodes:v.nodes.slice(0,5).map(function(nd){ return {target:nd.target.join(' '), html:nd.html.slice(0,300), summary:(nd.failureSummary||'').slice(0,600)}; }), count:v.nodes.length}; }); }
      send({type:'axe-result', violations:slim(r.violations), incomplete:slim(r.incomplete), passes:r.passes.length});
    }, function(e){ send({type:'axe-error', message:String(e && e.message || e)}); });
  } catch(e){ send({type:'axe-error', message:String(e && e.message || e)}); }
})();`;
  const s1 = doc.createElement('script');
  s1.setAttribute('src', axeSrc);
  s1.setAttribute('nonce', n);
  const s2 = doc.createElement('script');
  s2.setAttribute('nonce', n);
  s2.textContent = runner;
  doc.body.append(s1, s2);
  return '<!doctype html>\n' + doc.documentElement.outerHTML;
}

export function runCheck(input, cfg) {
  return new Promise((resolve, reject) => {
    const token = nonce();
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.setAttribute('title', cfg.frameTitle || 'axe-core');
    frame.setAttribute('tabindex', '-1');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:absolute;left:-10000px;top:0;width:1280px;height:900px;border:0;';
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, 30000);
    function onMsg(e) {
      if (e.source !== frame.contentWindow || !e.data || e.data.token !== token) return;
      cleanup();
      if (e.data.type === 'axe-result') resolve(e.data);
      else reject(new Error(e.data.message));
    }
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('message', onMsg);
      frame.remove();
    }
    window.addEventListener('message', onMsg);
    frame.srcdoc = buildSrcdoc(input, { ...cfg, token });
    document.body.append(frame);
  });
}

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else e.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null) e.append(c);
  return e;
}

export function renderResults(container, res, t, lang) {
  container.textContent = '';
  const nViol = res.violations.reduce((s, v) => s + v.count, 0);
  const nRev = res.incomplete.reduce((s, v) => s + v.count, 0);
  const summary = el('p', { class: 'callout info', id: 'mc-summary', tabindex: '-1' },
    t.summary.replace('{v}', String(res.violations.length)).replace('{vn}', String(nViol)).replace('{r}', String(res.incomplete.length)).replace('{rn}', String(nRev)));
  container.append(summary);
  const section = (title, list, cls) => {
    if (!list.length) return;
    container.append(el('h3', {}, title));
    for (const v of list) {
      const sc = scFromTags(v.tags);
      const rgaa = AXE_TO_RGAA[v.id] || [...new Set(sc.flatMap((s) => WCAG_TO_RGAA[s] || []))];
      const meta = [];
      if (v.impact) meta.push(`${t.impact} : ${t.impacts[v.impact] || v.impact}`);
      if (sc.length) meta.push(`WCAG ${sc.join(', ')}`);
      if (rgaa.length) meta.push(`RGAA ${rgaa.join(', ')}`);
      meta.push(`${t.elements} : ${v.count}`);
      const nodes = el('ul', {}, v.nodes.map((nd) => el('li', {}, el('code', {}, nd.target))));
      if (v.count > v.nodes.length) nodes.append(el('li', {}, t.more.replace('{n}', String(v.count - v.nodes.length))));
      container.append(
        el('div', { class: `result-item ${cls}` },
          el('h4', {}, v.help),
          el('p', {}, meta.join(' · ')),
          nodes,
          el('p', {}, el('a', { href: v.helpUrl, rel: 'noopener', hreflang: 'en' }, t.learn + ` (${v.id})`)))
      );
    }
  };
  section(t.violations, res.violations, '');
  section(t.review, res.incomplete, 'review');
  if (!res.violations.length && !res.incomplete.length) container.append(el('p', {}, t.none));
  container.append(el('p', { class: 'callout' }, t.limits));
  // Lead-in to the paid audit (only present in the i18n while the audit is on sale).
  if (t.upsell && t.upsellHref) {
    const n = res.violations.length + res.incomplete.length;
    container.append(
      el('div', { class: 'upsell' },
        el('p', {}, n ? t.upsell.replace('{n}', String(n)) : t.upsellNone),
        el('p', {}, el('a', { class: 'btn', href: t.upsellHref }, t.upsellCta)))
    );
  }
  summary.focus();
}

export function init() {
  const form = document.getElementById('minicheck');
  if (!form) return;
  const out = document.getElementById('mc-results');
  const status = document.getElementById('mc-status');
  const t = JSON.parse(document.getElementById('mc-i18n').textContent);
  const lang = document.documentElement.lang;
  let localeData = null;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.elements.snippet.value.trim();
    if (!input) {
      status.textContent = t.empty;
      form.elements.snippet.focus();
      return;
    }
    status.textContent = t.running;
    try {
      if (form.dataset.axeLocale && !localeData) localeData = await (await fetch(form.dataset.axeLocale)).json();
      const res = await runCheck(input, {
        axeSrc: new URL(form.dataset.axeSrc, location.href).href,
        origin: location.origin,
        localeData,
        lang,
        frameTitle: t.frameTitle,
      });
      status.textContent = t.done;
      renderResults(out, res, t, lang);
    } catch (err) {
      status.textContent = t.error + ' ' + err.message;
    }
  });
}

init();
