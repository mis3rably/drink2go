const burgerMenu = document.querySelector('.header__burger-wrapper');
const burgerButton = document.querySelector('.header__burger-button');
const rangeBar = document.querySelector('.filter__range-bar');
const lowestRangeInput = document.querySelector('.filter__range-input[name="lowest-range"]');
const highestRangeInput = document.querySelector('.filter__range-input[name="highest-range"]');
const catalogSorterWrapper = document.querySelector('.catalog__sorter-wrapper');
const paginationPageButton = document.querySelector('.catalog__pagination-button');
const paginationContainer = document.querySelector('.catalog__pagination');
const pagesList = document.querySelectorAll('.catalog__pagination-button--page');
const pageButton = document.querySelector('.catalog__pagination-button--page');
const prevPaginationButton = document.querySelector('.catalog__pagination-button-prev');
const nextPaginationButton = document.querySelector('.catalog__pagination-button-next');
const resetFormButton = document.querySelector('.filter__button--reset');

burgerMenu.classList.remove('header__burger-wrapper--nojs');
burgerButton.classList.remove('header__burger-button--nojs');
burgerMenu.classList.add('header__burger-wrapper--closed');

burgerButton.addEventListener('click', () => {
  burgerMenu.classList.toggle('header__burger-wrapper--closed');
  burgerButton.classList.toggle('header__burger-button--opened');
})

const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

noUiSlider.create(rangeBar, {
    start: [0, 123],
    connect: true,
    range: {
        'min': 0,
        'max': 145
    },
    format: {
      to: function(value) {
        return value.toFixed(0);
      },
      from: function(value) {
        return parseFloat(value);
      }
  }
});

resetFormButton.addEventListener('click', () => {
  rangeBar.noUiSlider.set([0, 123]);
})


rangeBar.noUiSlider.on('update', () => {
  [lowestRangeInput.value, highestRangeInput.value] = rangeBar.noUiSlider.get();
});

lowestRangeInput.addEventListener('change', () => {
  rangeBar.noUiSlider.set([lowestRangeInput.value, null]);
});

highestRangeInput.addEventListener('change', () => {
  rangeBar.noUiSlider.set([null, highestRangeInput.value]);
});

const map = L.map('map').setView([59.96831, 30.31747], 18);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker([59.96831, 30.31747]).addTo(map);

const isSelectOpened = () => {
  if (catalogSorterWrapper.classList.contains('catalog__sorter-wrapper--sorter-opened')) {
    return true;
  }
  return false;
}

const closeSelect = () => {
  catalogSorterWrapper.classList.remove('catalog__sorter-wrapper--sorter-opened');
  catalogSorterWrapper.classList.add('catalog__sorter-wrapper--sorter-closed');
  document.removeEventListener('click', closeSelectIfClickedOutside);
}

const openSelect = () => {
  catalogSorterWrapper.classList.remove('catalog__sorter-wrapper--sorter-closed');
  catalogSorterWrapper.classList.add('catalog__sorter-wrapper--sorter-opened');
  document.addEventListener('click', closeSelectIfClickedOutside);
}

const closeSelectIfClickedOutside = (evt) => {
  if (evt.target.contains(catalogSorterWrapper)) {
    closeSelect();
  }
}

catalogSorterWrapper.addEventListener('click', () => {
  if (isSelectOpened()) {
    closeSelect();
  } else {
    openSelect();
  }
});

catalogSorterWrapper.addEventListener('keydown', () => {
  if (isSelectOpened() && evt.keyCode === 13) {
    closeSelect();
  } else {
    openSelect();
  }
});

paginationContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('catalog__pagination-button--page') && !evt.target.classList.contains('catalog__pagination-button--active')) {
    document.querySelector('.catalog__pagination-button--active').classList.remove('catalog__pagination-button--active');
    evt.target.classList.add('catalog__pagination-button--active');
    switch (evt.target.textContent) {
      case '1':
        prevPaginationButton.style.visibility = 'hidden';
        nextPaginationButton.style.visibility = 'visible';
        break;
      case String(pagesList.length):
        nextPaginationButton.style.visibility = 'hidden';
        prevPaginationButton.style.visibility = 'visible';
        break;
      default:
        prevPaginationButton.style.visibility = 'visible';
        nextPaginationButton.style.visibility = 'visible';
        break;
    }
  }
});
