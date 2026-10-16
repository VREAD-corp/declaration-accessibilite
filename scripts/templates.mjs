// Builds the free blank templates published as GitHub Release assets.
import { mkdirSync, writeFileSync } from 'node:fs';
import { buildDocument, DOCS } from '../src/lib/statement.js';
import { checklistDoc } from '../src/lib/checklist.js';
import { toDocx, toHtml, toMarkdown } from '../src/lib/render.js';
import { zip } from '../src/lib/zip.js';
import { TEMPLATE_FILES } from '../src/lib/templates-list.js';

const out = new URL('../release/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });

const docFor = (lang, kind) => (kind === 'checklist' ? checklistDoc(lang) : buildDocument(lang, kind, {}));
const render = (doc, ext) => (ext === 'docx' ? toDocx(doc) : ext === 'md' ? toMarkdown(doc) : toHtml(doc));

const README = {
  fr: 'Modèles gratuits – A11y Kit (Jalonel, marque de READ FRANCE SAS)\n\nRemplacez les passages entre crochets. Générateur en ligne : https://accessibilite.jalonel.com/\n\nInformation uniquement : ni conseil juridique, ni attestation de conformité. Une déclaration doit refléter un audit réel.\nSources officielles : https://accessibilite.jalonel.com/sources/\nLicence des modèles : MIT.\n',
  de: 'Kostenlose Vorlagen – A11y Kit (Jalonel, eine Marke der READ FRANCE SAS)\n\nErsetzen Sie die Angaben in eckigen Klammern. Online-Generator: https://accessibilite.jalonel.com/de/\n\nNur zur Information: keine Rechtsberatung, keine Konformitätsbescheinigung.\nQuellen: https://accessibilite.jalonel.com/de/quellen/\nLizenz der Vorlagen: MIT.\n',
  en: 'Free templates – A11y Kit (Jalonel, a brand of READ FRANCE SAS)\n\nReplace the text in square brackets. Online generator: https://accessibilite.jalonel.com/en/\n\nInformation only: not legal advice, not a certificate of conformity.\nSources: https://accessibilite.jalonel.com/en/sources/\nTemplate licence: MIT.\n',
};

for (const f of TEMPLATE_FILES) {
  const ext = f.name.split('.').pop();
  if (f.kind === 'bundle') {
    const files = [{ name: 'LISEZMOI-README.txt', data: README[f.lang] }];
    for (const d of [...DOCS[f.lang].map((d) => d.id)]) {
      const doc = docFor(f.lang, d);
      const stem = f.name.replace(/\.zip$/, '') + '-' + d;
      for (const e of ['docx', 'md', 'html']) files.push({ name: `${stem}.${e}`, data: render(doc, e) });
    }
    writeFileSync(out + f.name, zip(files));
  } else {
    writeFileSync(out + f.name, render(docFor(f.lang, f.kind), ext));
  }
  console.log('wrote', f.name);
}
