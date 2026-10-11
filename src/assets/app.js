// Generator UI. Everything happens in this browser tab: answers are kept in
// localStorage on this device only (can be erased), nothing is sent anywhere.
import { buildDocument, DOCS, verdictBlocks, UI } from './lib/statement.js';
import { assessScope } from './lib/scope.js';
import { toHtml, toHtmlFragment, toMarkdown, toDocx } from './lib/render.js';
import { checklistDoc } from './lib/checklist.js';

const KEY = 'a11ykit:answers:v1';
const form = document.getElementById('gen-form');
const lang = document.documentElement.lang;
const t = UI[lang];
const preview = document.getElementById('preview');
const verdict = document.getElementById('verdict');
const status = document.getElementById('export-status');
const docChoice = document.getElementById('doc-choice');

const MULTI = ['features'];

function readAnswers() {
  const fd = new FormData(form);
  const a = {};
  for (const [k, v] of fd.entries()) {
    if (MULTI.includes(k)) (a[k] ||= []).push(v);
    else a[k] = String(v);
  }
  for (const k of MULTI) a[k] ||= [];
  return a;
}

function writeAnswers(a) {
  for (const el of form.elements) {
    if (!el.name || !(el.name in a)) continue;
    const v = a[el.name];
    if (el.type === 'radio') el.checked = el.value === v;
    else if (el.type === 'checkbox') el.checked = Array.isArray(v) && v.includes(el.value);
    else el.value = v;
  }
}

function save(a) {
  try {
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* storage unavailable: fine, nothing is kept */
  }
}
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

function currentDocId() {
  const r = docChoice.querySelector('input:checked');
  return r ? r.value : DOCS[lang][0].id;
}

function currentDoc(a) {
  const id = currentDocId();
  return id === 'checklist' ? checklistDoc(lang) : buildDocument(lang, id, a);
}

function syncVisibility(a) {
  for (const el of form.querySelectorAll('[data-show-country]')) el.hidden = a.country !== el.dataset.showCountry;
  for (const el of form.querySelectorAll('[data-show-audit]')) el.hidden = !(a.auditType === 'self' || a.auditType === 'external');
}

let timer;
let lastVerdict = '';
function update() {
  const a = readAnswers();
  syncVisibility(a);
  const v = toHtmlFragment({ blocks: verdictBlocks(lang, assessScope(a), a) });
  if (v !== lastVerdict) verdict.innerHTML = lastVerdict = v;
  preview.innerHTML = toHtmlFragment(currentDoc(a), { shift: 2 });
  clearTimeout(timer);
  timer = setTimeout(() => save(a), 300);
}

function slug(s) {
  return (s || 'document')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

function download(name, data, type) {
  const blob = new Blob([data], { type });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
  status.textContent = t.downloaded.replace('{f}', name);
}

document.getElementById('export').addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-fmt]');
  if (!btn) return;
  const a = readAnswers();
  const doc = currentDoc(a);
  const base = slug(`${doc.title}-${a.siteName || a.orgName || ''}`);
  const fmt = btn.dataset.fmt;
  if (fmt === 'html') download(`${base}.html`, toHtml(doc), 'text/html;charset=utf-8');
  else if (fmt === 'md') download(`${base}.md`, toMarkdown(doc), 'text/markdown;charset=utf-8');
  else if (fmt === 'docx') download(`${base}.docx`, toDocx(doc), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  else if (fmt === 'copy-html' || fmt === 'copy-md') {
    const text = fmt === 'copy-html' ? toHtmlFragment(doc) : toMarkdown(doc);
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = t.copied;
    } catch {
      status.textContent = t.copyFailed;
    }
  }
});

document.getElementById('save-json').addEventListener('click', () => {
  download('a11y-kit-answers.json', JSON.stringify(readAnswers(), null, 2), 'application/json');
});

document.getElementById('import-json').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const a = JSON.parse(await file.text());
    if (typeof a !== 'object' || !a) throw new Error('bad');
    form.reset();
    writeAnswers(a);
    update();
    status.textContent = t.imported;
  } catch {
    status.textContent = t.importFailed;
  }
  e.target.value = '';
});

document.getElementById('reset').addEventListener('click', () => {
  if (!confirm(t.confirmReset)) return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  form.reset();
  setDefaults();
  update();
  status.textContent = t.cleared;
});

function setDefaults() {
  const today = new Date().toISOString().slice(0, 10);
  if (!form.elements.statementDate.value) form.elements.statementDate.value = today;
  if (!form.elements.planStart.value) form.elements.planStart.value = String(new Date().getFullYear());
  if (!form.elements.technologies.value) form.elements.technologies.value = 'HTML, CSS, JavaScript';
  form.elements.country.value ||= { fr: 'FR', de: 'DE', en: 'EU' }[lang];
}

const saved = load();
if (saved) writeAnswers(saved);
else form.elements.country.value = { fr: 'FR', de: 'DE', en: 'EU' }[lang];
setDefaults();
form.addEventListener('input', update);
form.addEventListener('change', update);
docChoice.addEventListener('change', update);
form.addEventListener('submit', (e) => e.preventDefault());
update();
document.documentElement.classList.add('js');
