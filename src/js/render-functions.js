import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css"; 
const list = document.querySelector(".js-list");
            const lightBox = new SimpleLightbox('.js-list a', {
                captions: true,
                captionsData: 'alt',
                captionPosition: 'bottom', 
            });
            
export function createMarkup(arr) {
    const response = arr.map(({
        id, webformatURL, tags, largeImageURL, likes, views, comments, downloads
        }) => `
        <li class="gallery-item" data-id=${id} heigth="200">
            <a class="gallery-link" href=${largeImageURL}>
                <img src="${webformatURL}" alt="${tags}" width="360">
            </a>
            <div class="gallery-word">
                <div class="gallery-opis">
                    <h2 class="title">Likes</h2>
                    <p  class="count">${likes}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Views</h2>
                    <p  class="count">${views}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Comments</h2>
                    <p  class="count">${comments}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Downloads</h2>
                    <p  class="count">${downloads}</p>
                </div>
            </div>
        </li>
    `).join("");
    list.insertAdjacentHTML("beforeend", response); 
    lightBox.refresh();
}