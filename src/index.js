import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { makeItemsMarkup } from './js/makeItemsMarkup';
import { makeCountrieCardMarkup } from './js/makeCountrieCardMarkup';
import { clearMarkup } from './js/clearMarkup';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const { searchInput, countryList, countryInfo } = refs;

function inputHendler() {
  const searchCountrieName = searchInput.value.trim();

  if (searchCountrieName === '') {
    clearMarkup(refs);
    return;
  }

  fetchCountries(searchCountrieName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 2 && countries.length <= 10) {
        clearMarkup(refs);

        makeItemsMarkup({ countryList, countries });
      } else if (countries.length === 1) {
        clearMarkup(refs);

        const countrie = countries[0];

        makeCountrieCardMarkup({ countryInfo, countrie });
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

searchInput.addEventListener('input', debounce(inputHendler, DEBOUNCE_DELAY));
