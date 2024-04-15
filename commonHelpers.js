import{a as S,S as C,i as d}from"./assets/vendor-06b1bbdf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();async function m(s,t,a){const l="43270282-4a5d06b91258db09a976f913c",e=new URLSearchParams({key:l,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:a}),o="https://pixabay.com/api/";try{return(await S.get(`${o}?${e}`)).data}catch(r){alert(r.message)}}const L=document.querySelector(".js-list"),P=new C(".js-list a",{captions:!0,captionsData:"alt",captionPosition:"bottom"});function y(s){const t=s.map(({id:a,webformatURL:l,tags:e,largeImageURL:o,likes:r,views:v,comments:w,downloads:b})=>`
        <li class="gallery-item" data-id=${a} heigth="200">
            <a class="gallery-link" href=${o}>
                <img src="${l}" alt="${e}" width="360">
            </a>
            <div class="gallery-word">
                <div class="gallery-opis">
                    <h2 class="title">Likes</h2>
                    <p  class="count">${r}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Views</h2>
                    <p  class="count">${v}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Comments</h2>
                    <p  class="count">${w}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Downloads</h2>
                    <p  class="count">${b}</p>
                </div>
            </div>
        </li>
    `).join("");L.insertAdjacentHTML("beforeend",t),P.refresh()}const p=document.querySelector(".js-search-form"),f=document.querySelector(".js-list"),F=document.querySelector(".loader"),i=document.querySelector(".load-more");document.querySelector(".search-input");let c=1;const g=15;let u="";p.addEventListener("submit",$);i.addEventListener("click",q);n();i.style.display="none";async function $(s){if(s.preventDefault(),f.innerHTML="",h(),u=s.currentTarget.elements.searchImage.value,!u){n(),d.warning({title:"Caution",titleColor:"white",backgroundColor:"#EF4040",messageColor:"#FFFFFF",message:"You forgot to enter important data",position:"topRight"});return}try{h(),c=1;const t=await m(u,c,g),a=t.totalHits;if(g*c>=a&&(i.style.display="none"),t.hits.length===0){i.style.display="none",d.warning({title:"Warning",titleColor:"white",backgroundColor:"#EF4040",messageColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n(),p.reset();return}else y(t.hits),i.style.display="flex",n();p.reset()}catch{h(),d.error({title:"Error",titleColor:"white",backgroundColor:"#FF0000",messageColor:"#FFFFFF",message:"Error! Illegal operation",position:"topRight"}),n()}}function n(){F.classList.add("hidden")}function h(){F.classList.remove("hidden")}async function q(){try{i.style.display="flex",i&&(c+=1);const s=await m(u,c,g),t=s.totalHits;g*c>=t&&(i.style.display="none",n(),d.warning({title:"Warning",titleColor:"black",backgroundColor:"#4E75FF",messageColor:"#000000",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),y(s.hits),E(),p.reset()}catch(s){console.log(s.message)}}function E(){const t=f.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
