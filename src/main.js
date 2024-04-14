import axios from 'axios';
import { serviceSearchPhoto } from './js/pixabay-api.js'; 
import { createMarkup } from './js/render-functions.js'; 
import iziToast from "izitoast";   
import "izitoast/dist/css/iziToast.min.css"; 
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css"; 

const searchForm = document.querySelector(".js-search-form");
const list = document.querySelector(".js-list");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");
loader.style.display = 'none';

let currentPage = 1;
let searchQuery = '';

searchForm.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    const { searchImage } = event.currentTarget.elements;
    searchQuery = searchImage.value.trim();

    if (!searchQuery) {
        showErrorMessage("Please enter a search query!");
        return;
    }

    currentPage = 1;
    loader.style.display = 'block';
    list.innerHTML = ''; 

    try {
        const data = await serviceSearchPhoto(searchQuery, currentPage);
        handleSearchResults(data);
    } catch (error) {
        showErrorToast(error.message);
    }
}

async function handleLoadMore() {
    currentPage += 1;
    loader.style.display = 'block';
    
    try {
        const data = await serviceSearchPhoto(searchQuery, currentPage);
        handleSearchResults(data);
        smoothScrollToNextGroup(); 
    } catch (error) {
        showErrorToast(error.message);
    }
}

function handleSearchResults(data) {
    loader.style.display = 'none';

    if (data.hits.length === 0) {
        showErrorMessage("Sorry, there are no images matching your search query. Please try again!");
    } else {
        renderImages(data.hits);
        initializeLightbox();
        if (data.totalHits <= currentPage * 15) {
            loadMoreBtn.style.display = 'none';
            showInfoMessage("We're sorry, but you've reached the end of search results.");
        } else {
            loadMoreBtn.style.display = 'block';
        }
        searchForm.reset();
    }
}

function renderImages(images) {
    list.insertAdjacentHTML("beforeend", createMarkup(images));
}

function initializeLightbox() {
    const lightBox = new SimpleLightbox('.js-list a', {
        captions: true,
        captionsData: 'alt',
        captionPosition: 'bottom', 
    });
    lightBox.refresh();
}

function showErrorToast(message) {
    iziToast.error({
        title: 'Error',
        titleColor: 'white',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        message: message,
        position: 'topRight',
    });
}

function showInfoMessage(message) {
    iziToast.info({
        title: 'Info',
        titleColor: 'white',
        backgroundColor: '#4E75FF',
        messageColor: '#FFFFFF',
        message: message,
        position: 'topRight',
    });
}


function smoothScrollToNextGroup() {
    const firstGalleryItem = document.querySelector('.js-list a');

    if (!firstGalleryItem) {
        return;
    }

    const galleryItemHeight = firstGalleryItem.getBoundingClientRect().height;
    const scrollToHeight = galleryItemHeight * 2;

    window.scrollBy({
        top: scrollToHeight,
        behavior: 'smooth'
    });
}