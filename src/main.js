import iziToast from "izitoast";   
import "izitoast/dist/css/iziToast.min.css"; 
import { serviceSearchPhoto } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";

const searchForm = document.querySelector(".js-search-form");
const list = document.querySelector(".js-list");
const loader = document.querySelector(".loader");
const loadBtn = document.querySelector(".load-more");
const input = document.querySelector(".search-input");
let page = 1;   
const perPage = 15;
let searchImage = "";
    
searchForm.addEventListener("submit", handleSubmit);
loadBtn.addEventListener("click", loadMore);
loaderShow(); 
loadBtn.style.display = "none";

async function handleSubmit(event) {
    event.preventDefault();
    list.innerHTML = ''; 
    loaderHidden();
    searchImage = event.currentTarget.elements.searchImage.value;
    if (!searchImage) {
        loaderShow();  
        iziToast.warning({
            title: 'Caution',
            titleColor: 'white',
            backgroundColor: '#EF4040',
            messageColor: '#FFFFFF',
            message: "You forgot to enter important data",
            position: 'topRight',
        });
        loadBtn.style.display = "none"; 
        return;
    }

    try {
        loaderHidden();
        page = 1; 
        const data = await serviceSearchPhoto(searchImage, page, perPage);
        const totalHit = data.totalHits;

        if (perPage * page >= totalHit) {
            loadBtn.style.display = "none";            
        }

        if (data.hits.length === 0) {
            loadBtn.style.display = "none";
            iziToast.warning({
                title: 'Warning',
                titleColor: 'white',
                backgroundColor: '#EF4040',
                messageColor: '#FFFFFF',
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
            });
            loaderShow();          
            searchForm.reset();     
            return;
        } else {
            createMarkup(data.hits);
            loadBtn.style.display = "flex"; 
            loaderShow();
        }
        searchForm.reset();
    }

    catch(error) {
        loaderHidden();
        iziToast.error({
            title: 'Error',
            titleColor: 'white',
            backgroundColor: '#FF0000',
            messageColor: '#FFFFFF',
            message: "Error! Illegal operation",
            position: 'topRight',
        }); 
        loaderShow();
    }
}

function loaderShow() {
    loader.classList.add("hidden");    
}

function loaderHidden() {
    loader.classList.remove("hidden");    
}

async function loadMore() {
    try {
        loadBtn.style.display = "flex"; 
        if (loadBtn) {    
            page += 1;
        }          
        const data = await serviceSearchPhoto(searchImage, page, perPage);
        const totalHit = data.totalHits;

        if (perPage * page >= totalHit) { 
            loadBtn.style.display = "none"; 
            loaderShow();
            iziToast.warning({
                    title: 'Warning',
                    titleColor: 'black',
                    backgroundColor: '#4E75FF',
                    messageColor: '#000000',
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });   
        }
        
        createMarkup(data.hits);
        scrollPage();
        searchForm.reset(); 
    }
    catch (error) { console.log(error.message) }
}

function scrollPage() {
    const liMarkup = list.querySelector(".gallery-item");
    const liHeight = liMarkup.getBoundingClientRect().height;
    window.scrollBy({
        top: liHeight * 2,
        behavior: 'smooth',
    })
}