import './sass/index.scss';
import debounce from 'lodash.debounce';
const axios = require('axios/dist/node/axios.cjs');
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

import {btnSearch, galleryContainer, loadMoreBtn} from './partials/refs';

btnSearch.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(evt) { evt => {
    evt.preventDefault();
    btnSearch.currentTarget.value
}

};

