import Notiflix from 'notiflix';



export function infoNoPhoto() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

export function infoMessage() {
    Notiflix.Notify.failure('Sorry, you need to write something. Please choose category of picter.');
};
 
export function infoEndCollection(){ 
    Notify.failure("We're sorry, but you've reached the end of search results.");
};

