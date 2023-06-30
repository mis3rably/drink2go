const burgerMenu=document.querySelector(".header__burger-wrapper"),burgerButton=document.querySelector(".header__burger-button"),rangeBar=document.querySelector(".filter__range-bar"),lowestRangeInput=document.querySelector('.filter__range-input[name="lowest-range"]'),highestRangeInput=document.querySelector('.filter__range-input[name="highest-range"]'),catalogSorterWrapper=document.querySelector(".catalog__sorter-wrapper"),paginationPageButton=document.querySelector(".catalog__pagination-button"),paginationContainer=document.querySelector(".catalog__pagination"),pagesList=document.querySelectorAll(".catalog__pagination-button--page"),pageButton=document.querySelector(".catalog__pagination-button--page"),prevPaginationButton=document.querySelector(".catalog__pagination-button-prev"),nextPaginationButton=document.querySelector(".catalog__pagination-button-next"),resetFormButton=document.querySelector(".filter__button--reset");burgerMenu.classList.remove("header__burger-wrapper--nojs"),burgerButton.classList.remove("header__burger-button--nojs"),burgerMenu.classList.add("header__burger-wrapper--closed"),burgerButton.addEventListener("click",(()=>{burgerMenu.classList.toggle("header__burger-wrapper--closed"),burgerButton.classList.toggle("header__burger-button--opened")}));const swiper=new Swiper(".swiper",{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination"}});noUiSlider.create(rangeBar,{start:[0,123],connect:!0,range:{min:0,max:145},format:{to:function(e){return e.toFixed(0)},from:function(e){return parseFloat(e)}}}),resetFormButton.addEventListener("click",(()=>{rangeBar.noUiSlider.set([0,123])})),rangeBar.noUiSlider.on("update",(()=>{[lowestRangeInput.value,highestRangeInput.value]=rangeBar.noUiSlider.get()})),lowestRangeInput.addEventListener("change",(()=>{rangeBar.noUiSlider.set([lowestRangeInput.value,null])})),highestRangeInput.addEventListener("change",(()=>{rangeBar.noUiSlider.set([null,highestRangeInput.value])}));const map=L.map("map").setView([59.96831,30.31747],18);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);const marker=L.marker([59.96831,30.31747]).addTo(map),isSelectOpened=()=>!!catalogSorterWrapper.classList.contains("catalog__sorter-wrapper--sorter-opened"),closeSelect=()=>{catalogSorterWrapper.classList.remove("catalog__sorter-wrapper--sorter-opened"),catalogSorterWrapper.classList.add("catalog__sorter-wrapper--sorter-closed"),document.removeEventListener("click",closeSelectIfClickedOutside)},openSelect=()=>{catalogSorterWrapper.classList.remove("catalog__sorter-wrapper--sorter-closed"),catalogSorterWrapper.classList.add("catalog__sorter-wrapper--sorter-opened"),document.addEventListener("click",closeSelectIfClickedOutside)},closeSelectIfClickedOutside=e=>{e.target.contains(catalogSorterWrapper)&&closeSelect()};catalogSorterWrapper.addEventListener("click",(()=>{isSelectOpened()?closeSelect():openSelect()})),catalogSorterWrapper.addEventListener("keydown",(()=>{isSelectOpened()&&13===evt.keyCode?closeSelect():openSelect()})),paginationContainer.addEventListener("click",(e=>{if(e.target.classList.contains("catalog__pagination-button--page")&&!e.target.classList.contains("catalog__pagination-button--active"))switch(document.querySelector(".catalog__pagination-button--active").classList.remove("catalog__pagination-button--active"),e.target.classList.add("catalog__pagination-button--active"),e.target.textContent){case"1":prevPaginationButton.style.visibility="hidden",nextPaginationButton.style.visibility="visible";break;case String(pagesList.length):nextPaginationButton.style.visibility="hidden",prevPaginationButton.style.visibility="visible";break;default:prevPaginationButton.style.visibility="visible",nextPaginationButton.style.visibility="visible"}}));