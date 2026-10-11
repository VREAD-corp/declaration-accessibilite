import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDocument, rgaaStatus, DOCS, verdictBlocks, fmtDate } from '../../src/lib/statement.js';
import { assessScope } from '../../src/lib/scope.js';
import { CHECKS, rgaaFor, checklistDoc } from '../../src/lib/checklist.js';
import { toMarkdown, toHtml, toDocx } from '../../src/lib/render.js';
import { WCAG_TO_RGAA, RGAA_TITLES } from '../../src/data/rgaa-map.js';
import { AXE_TO_RGAA } from '../../src/data/axe-rgaa.js';

const text = (doc) => toMarkdown(doc);

test('microenterprise logic (Directive 2019/882 art. 3(23) and 4(5))', () => {
  const base = { consumerService: 'yes', publicBody: 'no', country: 'FR' };
  assert.equal(assessScope({ ...base, staff: 'lt10', smallFinance: 'yes' }).eaa, 'microExempt');
  assert.equal(assessScope({ ...base, staff: 'lt10', smallFinance: 'no' }).eaa, 'applies');
  assert.equal(assessScope({ ...base, staff: 'gte10', smallFinance: 'yes' }).eaa, 'applies');
  assert.equal(assessScope({ ...base, staff: '', smallFinance: '' }).eaa, 'checkSize');
  assert.equal(assessScope({ ...base, staff: 'lt10', smallFinance: '' }).eaa, 'checkSize');
  assert.equal(assessScope({ ...base, consumerService: 'no', staff: 'gte10' }).eaa, 'notService');
  assert.equal(assessScope({ ...base, consumerService: 'unsure' }).eaa, 'checkService');
  assert.equal(assessScope({ ...base, publicBody: 'yes' }).eaa, 'public');
  assert.equal(assessScope({ ...base, publicBody: 'yes' }).national, 'frPublic');
  assert.equal(assessScope({ ...base, frLarge: 'yes', staff: 'gte10', smallFinance: 'no' }).national, 'frArt47');
  assert.equal(assessScope({ ...base, country: 'DE', frLarge: 'yes' }).national, null);
  assert.equal(assessScope({ ...base, country: 'DE', publicBody: 'yes' }).national, 'dePublic');
});

test('verdict blocks exist for every outcome and language and never claim conformity', () => {
  for (const lang of ['fr', 'de', 'en'])
    for (const eaa of ['microExempt', 'applies', 'checkSize', 'notService', 'checkService', 'public'])
      for (const national of [null, 'frPublic', 'frArt47', 'dePublic']) {
        const md = toMarkdown({ blocks: verdictBlocks(lang, { eaa, national }, {}) });
        assert.ok(md.length > 80, `${lang} ${eaa}`);
        assert.doesNotMatch(md, /(totalement|partiellement) conforme|est conforme|ist konform|is compliant|you comply|vous êtes en règle/i);
      }
});

test('RGAA status only from a user-reported audit rate; no audit => non conforme', () => {
  assert.equal(rgaaStatus({ auditType: 'none' }), 'non');
  assert.equal(rgaaStatus({ auditType: '' }), null);
  assert.equal(rgaaStatus({ auditType: 'self', rate: '' }), null);
  assert.equal(rgaaStatus({ auditType: 'external', rate: '100' }), 'total');
  assert.equal(rgaaStatus({ auditType: 'external', rate: '50' }), 'partial');
  assert.equal(rgaaStatus({ auditType: 'external', rate: '49,9' }), 'non');
  assert.equal(rgaaStatus({ auditType: 'external', rate: '120' }), null);
});

test('FR RGAA statement follows the official model sections', () => {
  const md = text(buildDocument('fr', 'rgaa', { orgName: 'Boutique X', siteName: 'boutique-x.fr', auditType: 'none', contactEmail: 'a@b.fr' }));
  for (const h of ['# Déclaration d’accessibilité', '## État de conformité', '## Résultat des tests', '## Contenus non accessibles', '### Non conformité', '### Dérogations pour charge disproportionnée', '### Contenus non soumis à l’obligation d’accessibilité', '## Établissement de cette déclaration d’accessibilité', '### Technologies utilisées pour la réalisation du site web', '### Environnement de test', '### Les outils utilisés lors de l’évaluation', '### Pages du site ayant fait l’objet de la vérification de conformité', '## Retour d’information et contact', '## Voies de recours'])
    assert.ok(md.includes(h), h);
  assert.match(md, /boutique-x\.fr est non conforme/);
  assert.match(md, /Défenseur des droits/);
  assert.match(md, /mailto:a@b\.fr/);
  assert.doesNotMatch(md, /totalement conforme|partiellement conforme/);
});

test('FR RGAA statement with an audit uses the user rate and the right status', () => {
  const md = text(buildDocument('fr', 'rgaa', { siteName: 'S', auditType: 'external', auditor: 'Cabinet Y', rate: '72.5', auditDate: '2026-09-01' }));
  assert.match(md, /S est partiellement conforme/);
  assert.match(md, /72,5 % des critères/);
  assert.match(md, /par Cabinet Y le 1 septembre 2026/);
});

test('EAA / BFSG documents contain Annex V elements and the authority', () => {
  const de = text(buildDocument('de', 'eaa', { orgName: 'Muster GmbH', country: 'DE', features: ['keyboard'] }));
  for (const h of ['Allgemeine Beschreibung der Dienstleistung', 'Erläuterungen zur Durchführung der Dienstleistung', 'Barrierefreiheitsanforderungen', 'Marktüberwachungsbehörde', 'BFSG', 'Tastatur'])
    assert.ok(de.includes(h), h);
  const en = text(buildDocument('en', 'eaa', { orgName: 'Example Ltd' }));
  assert.match(en, /Annex V/);
  assert.match(en, /General description of the service/);
  const fr = text(buildDocument('fr', 'eaa', { orgName: 'Boutique X', country: 'FR' }));
  assert.match(fr, /Description générale du service/);
});

test('blank templates use bracketed placeholders and render in every format', () => {
  for (const lang of ['fr', 'de', 'en'])
    for (const d of DOCS[lang]) {
      const doc = d.id === 'checklist' ? checklistDoc(lang) : buildDocument(lang, d.id, {});
      const md = toMarkdown(doc);
      if (d.id !== 'checklist') assert.match(md, /\\\[/, `${lang}/${d.id} has placeholders`);
      assert.ok(toHtml(doc).includes(`lang="${lang}"`));
      assert.ok(toDocx(doc).length > 1000);
    }
});

test('plan covers three years from the start year', () => {
  const md = text(buildDocument('fr', 'plan', { planStart: '2026', actions1: 'Corriger le panier\nSous-titrer les vidéos', orgName: 'X' }));
  assert.match(md, /Schéma pluriannuel de mise en accessibilité 2026-2028/);
  for (const y of ['2026', '2027', '2028']) assert.match(md, new RegExp(`## Plan d’action ${y}`));
  assert.match(md, /\| Corriger le panier \| 2026 \|/);
});

test('date formatting', () => {
  assert.equal(fmtDate('2025-06-28', 'fr'), '28 juin 2025');
  assert.equal(fmtDate('2025-06-28', 'de'), '28. Juni 2025');
  assert.equal(fmtDate('bad', 'en'), null);
});

test('checklist: 20 items, every WCAG SC maps to RGAA from the official table', () => {
  assert.equal(CHECKS.length, 20);
  for (const c of CHECKS) {
    for (const l of ['fr', 'de', 'en']) assert.equal(c[l].length, 2);
    assert.ok(rgaaFor(c.wcag).length > 0, c.id);
  }
  assert.deepEqual(WCAG_TO_RGAA['2.4.7'], ['7.3', '10.7']);
  assert.ok(WCAG_TO_RGAA['1.1.1'].includes('1.1'));
});

test('documents never contain a compliance percentage unless the user typed one', () => {
  for (const lang of ['fr', 'de', 'en'])
    for (const d of DOCS[lang]) {
      if (d.id === 'checklist') continue;
      const md = text(buildDocument(lang, d.id, { auditType: 'none', orgName: 'O', siteName: 'S' }));
      assert.doesNotMatch(md, /\d\s?%/, `${lang}/${d.id}`);
    }
});

test('curated axe -> RGAA map only points to existing RGAA 4.1 criteria', () => {
  for (const [rule, list] of Object.entries(AXE_TO_RGAA)) for (const c of list) assert.ok(RGAA_TITLES[c], `${rule} -> ${c}`);
});
