import axios from "axios";
import Notiflix from 'notiflix';


 export async function fetchPhotos(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function loadingPhotos(url) {
    Notiflix.Loading.dots('Loading...');
    const response = await fetchPhotos(url);
    Notiflix.Loading.remove();
    // console.log('loading1', response);
    return response;
};


