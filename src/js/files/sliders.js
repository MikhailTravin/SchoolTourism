/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

if (document.querySelector('.selecting-tour__slider')) {
	new Swiper('.selecting-tour__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 10,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: true,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		pagination: {
			el: '.selecting-tour__dotts',
			clickable: true,
		},

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.selecting-tour__arrow-prev',
			nextEl: '.selecting-tour__arrow-next',
		},

		// Брейкпоинты
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		// События
		on: {

		}
	});
}

if (document.querySelector('.news__slider')) {
	new Swiper('.news__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 10,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: true,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		pagination: {
			el: '.news__dotts',
			clickable: true,
		},

		// Брейкпоинты
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		// События
		on: {

		}
	});
}

if (document.querySelector('.like__slider')) {
	new Swiper('.like__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: true,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		pagination: {
			el: '.like__dotts',
			clickable: true,
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			450: {
				slidesPerView: 1.5,
			},
			768: {
				slidesPerView: 2.2,
			},
			992: {
				slidesPerView: 3.5,
			},
			1325: {
				slidesPerView: 4,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.reviews__slider')) {
	new Swiper('.reviews__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		preloadImages: true,
		//lazy: true,

		// Пагинация
		pagination: {
			el: '.reviews__dotts',
			clickable: true,
		},

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.reviews__arrow-prev',
			nextEl: '.reviews__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			450: {
				slidesPerView: 1.5,
			},
			700: {
				slidesPerView: 2.5,
			},
			992: {
				slidesPerView: 3,
			},
			1268: {
				slidesPerView: 4,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.left-tour-card__images')) {
	const thumbsSwiper = new Swiper('.images-product__thumbs', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Thumbs],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 22,
		speed: 800,
		allowTouchMove: true,
		preloadImages: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.images-product__arrow-prev',
			nextEl: '.images-product__arrow-next',
		},
		on: {
		}
	});
	const mainThumbsSwiper = new Swiper('.images-product__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination, Thumbs],
		thumbs: {
			swiper: thumbsSwiper
		},
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 2,
		speed: 800,
		watchSlidesProgress: true,
		allowTouchMove: true,
		preloadImages: true,
		navigation: {
			prevEl: '.images-product__arrow-prev',
			nextEl: '.images-product__arrow-next',
		},
		// Пагинация
		pagination: {
			el: '.images-product__dotts',
			clickable: true,
		},
	});
}