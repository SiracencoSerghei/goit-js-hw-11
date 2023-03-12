import './sass/index.scss';
// const axios = require('axios');
import Notiflix from 'notiflix';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

import {btnSearchSubmit, formElem, galleryContainer, loadMoreBtn, happyEndEl} from './modules/refs';
import { loadingPhotos, fetchPhotos } from './modules/fetchPhotos';
import { infoMessage} from './modules/infoMessages';

// variables
const observer = new IntersectionObserver(intersector);
let pageN = 0;
 let gallery = new SimpleLightbox(".gallery a", {
   captionDelay: 250,
   captionsData:	'alt',
   captionPosition:	'bottom',
     enableKeyboard: true,
   docClose: true,
   close: true
 });
const params = {
    BASE_URL: 'https://pixabay.com/api/',
      key: '34315621-6b18059d5a6be575efaf0d130',
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    };
    
 const {
    BASE_URL,
    q,
    key,
    image_type,
    orientation,
    safesearch,
    order,
    page,
    per_page,
  } = params;
let totalPicts = 0;

formElem.addEventListener('submit', onSearchSubmit);


console.log('init', pageN);

// functions

// установка атрибута disabled на кнопке
switchOnSearchSubmit ();
formElem.addEventListener('input', switchOnSearchSubmit);

function switchOnSearchSubmit () {
  const inputValue = formElem.elements['searchQuery'].value.trim();
  if (inputValue) {
    btnSearchSubmit.disabled = false;
  } else {
    btnSearchSubmit.disabled = true;
  }
};

async function onSearchSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const inputElement = form.elements['searchQuery'];
    const inputValue = inputElement.value.trim();
    params.q = `${inputValue}`;
    totalPicts = 0;
    pageN += params.page;

    // console.log('before url', pageN);

const url = `${BASE_URL}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&order=${order}&page=${pageN}&per_page=${per_page}`;

// console.log(url);

    if (!inputValue) {
          Notiflix.Notify.failure('Sorry, you need to write something. Please choose category of picter.');
        return;
    } 
    try {
       const response = await loadingPhotos(url);
       await infoPhoto(response);
        await changePage(response);
        await renderMarkup(response);
        await console.log('return pageN', pageN)
    } catch(error) {
         console.error(error);
    }
};
  
// functions

function infoPhoto(response) {
  totalPicts = response.totalHits;
    if(  totalPicts === 0) {
      console.log('loading11', response);
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
    if(totalPicts > 0) {
      console.log('loading12', response);
         Notiflix.Notify.success(`Hooray! We found ${totalPicts} images.`)
         return response;
    };
    return response;
};

 function intersector(entries) {
    if(entries[0].isIntersecting) {
      console.log('aa',params.q, params.page, params.per_page)

        const url = `${BASE_URL}?key=${key}&q=${q}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&order=${order}&page=${pageN}&per_page=${per_page}`;
        // console.log('first', pageN);
        // pageN += 1;
        // console.log('second', pageN);
        fetchPhotos(url)
        .then(renderMarkup)
        .catch(() => {})
        console.log('return intersector pageN', pageN)
        return pageN
    }
 };

async function changePage() {
  await console.log('first observe changePage', pageN);
 await observer.observe(happyEndEl)
 await console.log('second observe changePage', pageN);
};

  function renderMarkup (response) {
   const markup = response.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
            `<a href="${largeImageURL}">
             <img src="${webformatURL}" alt="${tags}" loading="lazy" />
             <div class="info">
               <p class="info-item">
                 <b>Likes </b><span>${likes}</span>
               </p>
               <p class="info-item">
                 <b>Views </b><span>${views}</span>
               </p>
               <p class="info-item">
                 <b>Comments </b><span>${comments}</span>
               </p>
               <p class="info-item">
                 <b>Downloads </b><span>${downloads}</span>
               </p>
             </div>
            </a>`
        )
        .join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();

    const happyEnd = totalPicts - pageN * params.per_page;
    if (happyEnd < 0) {
        happyEndEl.classList.remove('hidden');
        observer.unobserve(happyEndEl);
        return;
    }
    pageN += 1;
    console.log('finish', pageN);
    happyEndEl.classList.add('hidden');
    return
   };

