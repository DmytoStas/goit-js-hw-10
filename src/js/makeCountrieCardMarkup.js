import cardsTamplate from '../templates/cardMarcup.pug';

export function makeCountrieCardMarkup({ countryInfo, countrie }) {
  const languagesString = languagesToString(countrie);

  countrie.languages = languagesString.slice(0, languagesString.length - 2);

  const murkup = cardsTamplate(countrie);

  countryInfo.insertAdjacentHTML('beforeend', murkup);
}

function languagesToString(countrie) {
  const keys = Object.keys(countrie.languages);

  let languagesToString = '';

  for (const key of keys) {
    languagesToString += countrie.languages[key] + ', ';
  }
  return languagesToString;
}
