var debounce = require('lodash.debounce');
import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { makeListItemsMarkup } from './js/makeListItemsMarkup';
// import countriesTpl from './templates/listItemMarkup.hbs';
// const compiledTemplate = require('./template.handlebars');
// const countriesTpl = require('../templates/listItemMarkup.hbs');
// const countrie = {
//   name: 'Ukr',
//   flag: 'https://flagcdn.com/ua.svg',
// };
// console.log(countriesTpl(countrie));

const DEBOUNCE_DELAY = 300;

const { searchInput, countryList, countryInfo } = refs;

console.log(searchInput.value);

searchInput.addEventListener('input', debounce(inputHendler, DEBOUNCE_DELAY));

function inputHendler(e) {
  const searchCountrieName = searchInput.value.trim();

  if (searchCountrieName === '') {
    return;
  }

  fetchCountries(searchCountrieName)
    .then(countries => {
      // const countrie = {
      //   name: 'Ukr',
      //   flag: 'https://flagcdn.com/ua.svg',
      // };
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      // } else if (countries.length > 2 && countries.length <= 10) {
      // countryList.insertAdjacentHTML('afterbegin', countriesTpl(countrie));
      // }
      console.log(countries);
    })
    .catch(error => {
      console.log(error);
    });
}
