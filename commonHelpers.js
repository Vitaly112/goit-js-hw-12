import{a as w,S as v,i as d}from"./assets/vendor-09d7c26e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const F="https://pixabay.com/api/",S="43270282-4a5d06b91258db09a976f913c";async function h(e="",s=1,r=15){try{return(await w.get(F,{params:{key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:r}})).data}catch{throw new Error("Oops! Something went wrong. Please try again later.")}}function L(e){return e.map(({id:s,webformatURL:r,tags:i,largeImageURL:t,likes:o,views:a,comments:m,downloads:b})=>`
        <li class="gallery-item" data-id=${s}>
            <a class="gallery-link" href=${t}>
                <img src="${r}" alt="${i}">
            </a>
            <div class="gallery-word">
                <div class="gallery-opis">
                    <h2 class="title">Likes</h2>
                    <p class="count">${o}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Views</h2>
                    <p class="count">${a}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Comments</h2>
                    <p class="count">${m}</p>
                </div>
                <div class="gallery-opis">
                    <h2 class="title">Downloads</h2>
                    <p class="count">${b}</p>
                </div>
            </div>
        </li>
    `).join("")}const p=document.querySelector(".js-search-form"),y=document.querySelector(".js-list"),c=document.querySelector(".loader"),u=document.querySelector(".load-more-btn");c.style.display="none";let n=1,l="";p.addEventListener("submit",E);u.addEventListener("click",P);async function E(e){e.preventDefault();const{searchImage:s}=e.currentTarget.elements;if(l=s.value.trim(),!l){showErrorMessage("Please enter a search query!");return}n=1,c.style.display="block",y.innerHTML="";try{const r=await h(l,n);g(r)}catch(r){f(r.message)}}async function P(){n+=1,c.style.display="block";try{const e=await h(l,n);g(e),C()}catch(e){f(e.message)}}function g(e){c.style.display="none",e.hits.length===0?showErrorMessage("Sorry, there are no images matching your search query. Please try again!"):(q(e.hits),I(),e.totalHits<=n*15?(u.style.display="none",M("We're sorry, but you've reached the end of search results.")):u.style.display="block",p.reset())}function q(e){y.insertAdjacentHTML("beforeend",L(e))}function I(){new v(".js-list a",{captions:!0,captionsData:"alt",captionPosition:"bottom"}).refresh()}function f(e){d.error({title:"Error",titleColor:"white",backgroundColor:"#EF4040",messageColor:"#FFFFFF",message:e,position:"topRight"})}function M(e){d.info({title:"Info",titleColor:"white",backgroundColor:"#4E75FF",messageColor:"#FFFFFF",message:e,position:"topRight"})}function C(){const e=document.querySelector(".js-list a");if(!e)return;const r=e.getBoundingClientRect().height*2;window.scrollBy({top:r,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
