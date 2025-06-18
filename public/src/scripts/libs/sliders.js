// === SwiperManager.js ===
import { Swiper } from "./swiper/swiper-bundle.min.mjs";
import { ReviewRenderer } from "../functions/reviews.min.js";

const sliders = [
  {
    selector: ".swiper-banner",
    config: {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      grabCursor: true,
      preloadImages: true,
      lazy: {
        loadPrevNext: true
      },
      lazy: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    },
  },
  {
    selector: ".swiper-card",
    config: {
      slidesPerView: 1,
      spaceBetween: 8,
      speed: 800,
      grabCursor: true,
      loop: true,
      loopedSlides: 21,
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      },
      watchSlidesProgress: true,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      breakpoints: {
        540: { slidesPerView: 2 },
        760: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
    },
  },
  {
    selector: ".swiper-review",
    config: {
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 800,
      grabCursor: true,
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      },
      watchSlidesProgress: true,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        992: { slidesPerView: 2 },
      },
		}
  },
  {
    selector: ".swiper-menu",
    config: {
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 800,
      grabCursor: true,
      lazy: {
        loadPrevNext: true
      },
      watchSlidesProgress: true,
      freeMode: true,
      breakpoints: {
        340: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
      },
    },
  },
];

function observeAndInitSwiper({ selector, config }) {
  const el = document.querySelector(selector);
  if (!el) return;

  const init = () => {
		const slider = new Swiper(selector, { ...config });
		
		if (selector === ".swiper-review") {
      new ReviewRenderer('.reviews__wrapper', '/reviews', slider);
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        init();
        obs.disconnect();
      }
    });
    observer.observe(el);
  } else {
    init();
  }
}

window.addEventListener("load", () => {
  sliders.forEach(slider => observeAndInitSwiper(slider));
});
