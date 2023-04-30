import countriesTamplate from '../templates/listItemMarkup.pug';

export function makeItemsMarkup({ countryList, countries }) {
  const murkup = countries
    .map(countrie => countriesTamplate(countrie))
    .join('');

  countryList.insertAdjacentHTML('beforeend', murkup);
}
