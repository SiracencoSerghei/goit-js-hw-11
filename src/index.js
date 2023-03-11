import './sass/index.scss';
import debounce from 'lodash.debounce';
const axios = require('axios');
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

import {btnSearchSubmit, formElem, galleryContainer, loadMoreBtn} from './partials/refs';

// установка атрибута disabled на кнопке
switchBtnSearchSubmit ();
formElem.addEventListener('input', switchBtnSearchSubmit);

function switchBtnSearchSubmit () {
  const inputValue = formElem.elements['searchQuery'].value.trim();
  if (inputValue) {
    btnSearchSubmit.disabled = false;
  } else {
    btnSearchSubmit.disabled = true;
  }
};


formElem.addEventListener('submit', onSearchSubmit);


function onSearchSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    // const inputElement = form.querySelector('input[name="searchQuery"]');
    const inputElement = form.elements['searchQuery'];
    const inputValue = inputElement.value.trim();
    if (!inputValue) {
        return;
    }
    console.log(inputValue);
};

