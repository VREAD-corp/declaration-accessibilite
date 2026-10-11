// Indicative applicability check. Pure function, unit-tested.
// Sources (see /sources/): Directive (EU) 2019/882 art. 3(23) and 4(5);
// France: loi 2005-102 art. 47, décret 2023-931; Germany: BFSG § 2 Nr. 17, § 3 Abs. 3.

/**
 * @param {object} a answers
 * @param {'yes'|'no'|'unsure'|''} a.consumerService provides a service in EAA scope to consumers (e-commerce…)
 * @param {'lt10'|'gte10'|''} a.staff
 * @param {'yes'|'no'|''} a.smallFinance turnover <= EUR 2M OR balance sheet <= EUR 2M
 * @param {'yes'|'no'|''} a.publicBody
 * @param {'yes'|'no'|''} a.frLarge France only: turnover in France above the art. 47 threshold
 * @param {'FR'|'DE'|'EU'} a.country
 */
export function assessScope(a) {
  const micro = a.staff === 'lt10' && a.smallFinance === 'yes' ? true : a.staff === 'gte10' || a.smallFinance === 'no' ? false : null;
  let eaa;
  if (a.publicBody === 'yes') eaa = 'public';
  else if (a.consumerService === 'no') eaa = 'notService';
  else if (a.consumerService === 'unsure' || !a.consumerService) eaa = 'checkService';
  else if (micro === true) eaa = 'microExempt';
  else if (micro === false) eaa = 'applies';
  else eaa = 'checkSize';

  let national = null;
  if (a.country === 'FR') {
    if (a.publicBody === 'yes') national = 'frPublic';
    else if (a.frLarge === 'yes') national = 'frArt47';
  } else if (a.country === 'DE') {
    if (a.publicBody === 'yes') national = 'dePublic';
  }
  return { micro, eaa, national };
}
