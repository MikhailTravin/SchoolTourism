import { bodyLock, bodyUnlock } from "../files/functions.js";
import "../libs/select.js";

//наведение/клик каталог
const menuButton = document.querySelector('.menu-button button');
function menu() {
	if (menuButton) {
		const menuContent = document.querySelector('.menu__content');
		const menuTitles = document.querySelectorAll('.menu__title');
		if (document.documentElement.clientWidth > 991.98) {
			menuButton.addEventListener("mouseenter", function (e) {
				menuContent.classList.add("_hover")
				menuButton.classList.add("_hover")
			});
			menuContent.addEventListener("mouseenter", function (e) {
				menuContent.classList.add("_hover")
				menuButton.classList.add("_hover")
			});
			menuContent.addEventListener("mouseleave", function () {
				menuContent.classList.remove("_hover");
				menuButton.classList.remove("_hover");
			});
			menuButton.addEventListener("mouseleave", function () {
				menuContent.classList.remove("_hover");
				menuButton.classList.remove("_hover");
			});
			menuButton.addEventListener("click", function (e) {
				document.documentElement.classList.remove("_active-catalog")
			});
		} else {
			menuContent.classList.remove("_hover")
			menuButton.classList.remove("_hover")
			menuButton.addEventListener("mouseenter", function (e) {
				menuContent.classList.remove("_hover")
				menuButton.classList.remove("_hover")
			});
			menuContent.addEventListener("mouseenter", function (e) {
				menuContent.classList.remove("_hover")
				menuButton.classList.remove("_hover")
			});
			menuButton.addEventListener("click", function (e) {
				document.documentElement.classList.toggle("_active-catalog")
			});
			menuTitles.forEach(title => {
				title.addEventListener('click', async (e) => {
					document.documentElement.classList.toggle("_menu-catalog-active")

					let parent = e.target.parentNode

					if (parent.classList.contains('_active')) {
						parent.classList.remove('_active')
						menuContent.classList.remove("_active-column")
					} else {
						parent.classList.add('_active')
						menuContent.classList.add("_active-column")
					}
				})
			});
		}
	}
}
menu();

window.addEventListener("resize", function (e) {
	menu();
});

//========================================================================================================================================================

//поиск
function menuSearch() {
	const searchIcon = document.querySelector('.search-header__icon');
	if (searchIcon) {
		if (document.documentElement.clientWidth < 767.98) {
			searchIcon.addEventListener("click", function (e) {
				bodyLock();
				document.documentElement.classList.add("menu-open");
			});
		} else {
			bodyUnlock();
			document.documentElement.classList.remove("menu-open");
		}
	}
}
window.addEventListener("resize", function (e) {
	menuSearch();
});

//========================================================================================================================================================

//зыездный рейтинг
function formRating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		initRatings();
	}
	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;
		// "Бегаем" по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}
		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);

			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}
		// Инициализайция переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__activeline');
			ratingValue = rating.querySelector('.rating-input');
		}
		// Изменяем ширину активных звезд
		function setRatingActiveWidth() {
			const ratingActiveWidth = ratingValue.value / 0.05;
			ratingActive.style.width = `${ratingActiveWidth}%`;
		}

		ratingValue.addEventListener('change', function () {
			setRatingActiveWidth();
		});

		// Возможность указать оценку 
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__star');
			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];
				ratingItem.addEventListener("mouseenter", function (e) {
					// Обновление переменных
					initRatingVars(rating);
					// Обновление активных звезд
					setRatingActiveWidth(ratingItem.value);
				});
				ratingItem.addEventListener("mouseleave", function (e) {
					// Обновление активных звезд
					setRatingActiveWidth();
				});
				ratingItem.addEventListener("click", function (e) {
					// Обновление переменных
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// "Отправить" на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Отобразить указанную оцнку
						ratingValue.value = index + 1;
						setRatingActiveWidth();
					}
				});

			}
		}
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправика данных (value) на сервер
				let response = await fetch('rating.json', {
					method: 'GET',

					//body: JSON.stringify({
					//	userRating: value
					//}),
					//headers: {
					//	'content-type': 'application/json'
					//}

				});
				if (response.ok) {
					const result = await response.json();

					// Получаем новый рейтинг
					const newRating = result.newRating;

					// Вывод нового среднего результата
					ratingValue.value = newRating;

					// Обновление активных звезд
					setRatingActiveWidth();

					rating.classList.remove('rating_sending');
				} else {
					alert("Ошибка");

					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}

formRating()

//========================================================================================================================================================

//Видео
const myVideos = document.querySelectorAll('.popup__video-item');
if (myVideos) {
	myVideos.forEach(myVideo => {
		myVideo.addEventListener('click', function (e) {
			let parent = e.target.parentNode

			if (parent.classList.contains('_active')) {
				parent.classList.remove('_active')
			} else {
				parent.classList.add('_active')
			}
			if (myVideo.paused) {
				myVideo.play();
			} else {
				myVideo.pause();
			}
		});
	});

}

//========================================================================================================================================================

const calendar = document.querySelector(".calendar__main");
if (calendar) {
	const input = document.querySelector("#date");
	const calHeader = document.querySelector(".calendar__header");
	const calHeaderTitle = document.querySelector(".calendar__header span");
	const calDays = document.querySelector(".calendar__days");
	const days = [
		"Пн",
		"Вт",
		"Ср",
		"Чт",
		"Пт",
		"Сб",
		"Вс"
	];
	const months = [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь"
	];

	let oneDay = 60 * 60 * 24 * 1000;
	let todayTimestamp =
		Date.now() -
		(Date.now() % oneDay) +
		new Date().getTimezoneOffset() * 1000 * 60;

	let selectedDay = todayTimestamp;
	// console.log(selectedDay); // Str in millisec

	// Get num of days in month
	// month param 0-11
	const getNumberOfDays = (year, month) => {
		return 40 - new Date(year, month, 40).getDate();
	};
	// getNumberOfDays(2023, 1);

	// Calc day details
	const getDayDetails = (args) => {
		let date = args.index - args.firstDay;
		let day = args.index % 7;
		// console.log(day)
		let prevMonth = args.month - 1;
		let prevYear = args.year;
		if (prevMonth < 0) {
			prevMonth = 11;
			prevYear--;
		}
		let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

		let _date =
			(date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
		// console.log(_date)
		let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
		let timestamp = new Date(args.year, args.month, _date).getTime();
		// console.log(timestamp)
		return {
			date: _date,
			day,
			month,
			timestamp,
			dayString: days[day]
		};
	};

	// [{}] each {} with details for each day of month
	const getMonthDetails = (year, month) => {
		let firstDay = new Date(year, month).getDay();
		let numberOfDays = getNumberOfDays(year, month);
		let monthArray = [];
		let rows = 5;
		let currentDay = null;
		let index = 0;
		let cols = 7;

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				currentDay = getDayDetails({
					index,
					numberOfDays,
					firstDay,
					year,
					month
				});
				monthArray.push(currentDay);
				index++;
			}
		}
		return monthArray;
	};
	// getMonthDetails(2023, 3)

	// Variables that get updated with "state" changes
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth();
	let monthDetails = getMonthDetails(year, month);

	const isCurrentDay = (day, cell) => {
		if (day.timestamp === todayTimestamp) {

			cell.classList.add("active");
			cell.classList.add("isCurrent");

		}
	};

	// Checks if day is one selected
	const isSelectedDay = (day, cell) => {
		if (day.timestamp === selectedDay) {
			cell.classList.add("active");
			cell.classList.add("isSelected");
		}
	};

	// Get month str
	const getMonthStr = (month) =>
		months[Math.max(Math.min(11, month), 0)] || "Month";
	// console.log(getMonthStr(month))

	// Set year using arrows
	const setHeaderNav = (offset) => {
		month = month + offset;
		if (month === -1) {
			month = 11;
			year--;
		} else if (month === 12) {
			month = 0;
			year++;
		}
		monthDetails = getMonthDetails(year, month);
		// console.log(getMonthDetails(year, month))
		return {
			year,
			month,
			monthDetails
		};
	};

	// Set dynamic calendar header
	const setHeader = (year, month) => {
		calHeaderTitle.innerHTML = getMonthStr(month) + " " + year;
	};

	// Set calendar header
	setHeader(year, month);

	// 1677139200000 => "2023-02-23"
	const getDateStringFromTimestamp = (timestamp) => {
		let dateObject = new Date(timestamp);
		let month = dateObject.getMonth();
		let date = dateObject.getDate();
		// return (
		//   dateObject.getFullYear() +
		//   "-" +
		//   (month < 10 ? "0" + month : month) +
		//   "-" +
		//   (date < 10 ? "0" + date : date)
		// );
		return `${getMonthStr(month)} ${date}, ${dateObject.getFullYear()}`;
	};

	const setDateToInput = (timestamp) => {
		let dateString = getDateStringFromTimestamp(timestamp);
		input.value = dateString;
	};
	setDateToInput(todayTimestamp);

	// Add days row to calendar
	for (let i = 0; i < days.length; i++) {
		let div = document.createElement("div"),
			span = document.createElement("span");

		div.classList.add("cell_wrapper");
		// div.classList.add("cal_days");
		span.classList.add("cell_item");

		span.innerText = days[i].slice(0, 2);

		div.appendChild(span);
		calDays.appendChild(div);
	}

	// Add dates to calendar
	const setCalBody = (monthDetails) => {
		// Add dates to calendar
		for (let i = 0; i < monthDetails.length; i++) {
			let div = document.createElement("div"),
				span = document.createElement("span");

			div.classList.add("cell_wrapper");
			div.classList.add("cal_date");
			div.classList.add("input-calc");
			monthDetails[i].month === 0 && div.classList.add("current");
			monthDetails[i].month === 0 && isCurrentDay(monthDetails[i], div);
			span.classList.add("cell_item");
			var fifth_1 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(5)")
			fifth_1.forEach(five => {
				five.classList.add("fifth-day");
			});
			var fifth_2 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(12)")
			fifth_2.forEach(five => {
				five.classList.add("fifth-day");
			});
			var fifth_3 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(19)")
			fifth_3.forEach(five => {
				five.classList.add("fifth-day");
			});
			var fifth_4 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(26)")
			fifth_4.forEach(five => {
				five.classList.add("fifth-day");
			});
			var fifth_5 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(33)")
			fifth_5.forEach(five => {
				five.classList.add("fifth-day");
			});

			var sixth_1 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(6)")
			sixth_1.forEach(six => {
				six.classList.add("weekend");
			});
			var sixth_2 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(13)")
			sixth_2.forEach(six => {
				six.classList.add("weekend");
			});
			var sixth_3 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(20)")
			sixth_3.forEach(six => {
				six.classList.add("weekend");
			});
			var sixth_4 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(27)")
			sixth_4.forEach(six => {
				six.classList.add("weekend");
			});
			var sixth_5 = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(34)")
			sixth_5.forEach(six => {
				six.classList.add("weekend");
			});

			var seventh = document.querySelectorAll(".calendar__main .cell_wrapper.cal_date:nth-child(7n)")
			seventh.forEach(seven => {
				seven.classList.add("weekend");
			});

			span.innerText = monthDetails[i].date;

			div.appendChild(span);
			calendar.appendChild(div);
		}
	};

	setCalBody(monthDetails);

	const updateCalendar = (btn) => {
		let newCal, offset;
		if (btn.classList.contains("calendar__btn-prev")) {
			// let { year, month, monthDetails } = setHeaderNav(-1);
			offset = -1;
		} else if (btn.classList.contains("calendar__btn-next")) {
			// let { year, month, monthDetails } = setHeaderNav(1);
			offset = 1;
		}
		newCal = setHeaderNav(offset);
		// console.log(monthDetails)
		setHeader(newCal.year, newCal.month);
		calendar.innerHTML = "";
		setCalBody(newCal.monthDetails);
	};

	// Only one calendar date is selected
	const selectOnClick = () => {
		document.querySelectorAll(".cell_wrapper").forEach((cell) => {
			cell.classList.contains("isSelected") && cell.classList.remove("active");
			if (cell.classList.contains("isCurrent") &&
				!cell.classList.contains("active")) {
				cell.querySelector("span").classList.add("inactive_indicator");
			}
		});
	};

	const updateInput = () => {
		let currentDay = document.querySelector(".isCurrent");

		// Update input based on clicked cell
		document.querySelectorAll(".cell_wrapper").forEach((cell) => {
			if (cell.classList.contains("current")) {
				cell.addEventListener("click", (e) => {
					let cell_date = e.target.textContent;

					currentDay !== null && currentDay.classList.remove("active");

					for (let i = 0; i < monthDetails.length; i++) {
						if (monthDetails[i].month === 0) {
							if (monthDetails[i].date.toString() === cell_date) {
								selectedDay = monthDetails[i].timestamp;
								setDateToInput(selectedDay);
								selectOnClick();

								isSelectedDay(monthDetails[i], cell);

								cell.querySelector('span').classList.contains('inactive_indicator')
									&& cell.querySelector('span').classList.remove('inactive_indicator');
							}
						}
					}
				});
			}
		});
	};

	updateInput();

	// Set header nav actions
	document.querySelectorAll(".calendar-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			updateCalendar(btn);
			updateInput();
		});
	});

	input.addEventListener('click', () => {
		document.querySelector('.calendar__content').classList.toggle('hidden');
		document.querySelector('.calendar__input').classList.toggle('showCal');
		document.querySelector('#date').classList.toggle('onFocus');
	});
	window.addEventListener('click', e => {
		const target = e.target
		if (!target.closest('#date') && !target.closest('.calendar__input') && !target.closest('.calendar__content')) {
			document.querySelector('.calendar__content').classList.add('hidden');
			document.querySelector('.calendar__input').classList.remove('showCal');
			document.querySelector('#date').classList.add('onFocus');
		}
	})

}

//========================================================================================================================================================

//калькулятор

//значения инпутов

const inputNumberStudents = document.querySelector('#number'); //количество школьников
const inputStudentsQuantity_1 = document.querySelector('#quantity-1'); //количество школьников 
const inputStudentsQuantity_2 = document.querySelector('#quantity-2'); //количество школьников 
const inputNumberAttendants = document.querySelector('#number-2'); //дополнительные сопровождающие
const inputStudentsMasterСlass = document.querySelector('#number-4'); //количество школьников на мастеркласс
const quantityButtons = document.querySelectorAll('.quantity__button');

//цена школьников
const numberStudentsPrice = document.querySelector('.it-price-students-small'); //цена за 1 школьника < 17
const numberStudentsPrice_2 = document.querySelector('.it-price-students-medium'); //цена за 1 школьника > 17 < 28
const numberStudentsPrice_3 = document.querySelector('.it-price-students-big'); //цена за 1 школьника > 30 < 50
const numberStudentsPriceWeekend = document.querySelector('.it-price-students-weekend'); //цена за 1 школьника выходные
const numberStudentsPriceFive = document.querySelector('.it-price-students-five'); //цена за 1 школьника пятница

const numberDescStudentsPrice = document.querySelectorAll('.desc-price-students-small'); //цена за 1 школьника < 17
const numberDescStudentsPrice_2 = document.querySelectorAll('.desc-price-students-medium'); //цена за 1 школьника > 17 < 28
const numberDescStudentsPrice_3 = document.querySelectorAll('.desc-price-students-big'); //цена за 1 школьника > 30 < 50

//цена сопровождающих
const numberAttendantsPrice = document.querySelector('.it-price-attendants-small'); //цена за 1 сопровождающих < 2
const numberAttendantsPrice_2 = document.querySelector('.it-price-attendants-medium'); //цена за 1 сопровождающих < 2
const numberAttendantsPrice_3 = document.querySelector('.it-price-attendants-big'); //цена за 1 сопровождающих < 4
const numberAttendantsPriceWeekend = document.querySelector('.it-price-attendants-weekend'); //цена за 1 сопровождающих выходные
const numberAttendantsPriceFive = document.querySelector('.it-price-attendants-five'); //цена за 1 сопровождающих пятница

const numberAttendants = document.querySelector('.number-attendants-small'); //количество сопровождающих до 17
const numberAttendants_2 = document.querySelector('.number-attendants-medium'); //количество сопровождающих 17-28
const numberAttendants_3 = document.querySelector('.number-attendants-big'); //количество сопровождающих 30-50

//Цена мастеклассы
const numberOptionsPriceWeekend = document.querySelector('.it-price-options-weekend'); //цена за 1 мастекласс выходные
const numberOptionsPriceFive = document.querySelector('.it-price-options-five'); //цена за 1 мастекласс пятница

//радиокнопки
const radioType = document.querySelectorAll('.masterclass');
const radioType_2 = document.querySelectorAll('.masterclass-2');
const radioType_1 = document.querySelector('#o_1');

//итоговые значения
const totalPrice = document.querySelector('.form-popup__total-new-price'); //итоговая сумма в попапе
const totalPrice_2 = document.querySelectorAll('.price-tour-card__total-sum'); //итоговая сумма на странице
const totalPriceOld = document.querySelector('.form-popup__total-old-price'); //старая цена
const inputTotals = document.querySelectorAll('.input-calc'); //инпуты
const basePrice = 0;
const percent = 20; //процент скидки

const priceStudents = numberStudentsPrice.innerHTML;
const priceStudents_2 = numberStudentsPrice_2.innerHTML;
const priceStudents_3 = numberStudentsPrice_3.innerHTML;

const priceAttendants = numberAttendantsPrice.innerHTML;
const priceAttendants_2 = numberAttendantsPrice_2.innerHTML;
const priceAttendants_3 = numberAttendantsPrice_3.innerHTML;

function calculater() {

	let totalPriceElement = basePrice;
	let totalPriceElement_2 = basePrice;

	if (inputStudentsMasterСlass) {
		const minStudentsMasterСlass = +inputStudentsMasterСlass.min;
		const maxStudentsMasterСlass = +inputStudentsMasterСlass.max;
		const value = +inputStudentsMasterСlass.value;
		if (value > maxStudentsMasterСlass) { inputStudentsMasterСlass.value = maxStudentsMasterСlass }
		else if (value < minStudentsMasterСlass) { inputStudentsMasterСlass.value = minStudentsMasterСlass }
	}

	//автобус вместимость
	inputNumberStudents.addEventListener("input", function (e) {
		inputStudentsQuantity_1.value = e.target.value;
		inputStudentsQuantity_2.value = e.target.value;
		const minStudents = +inputNumberStudents.min;
		const maxStudents = +inputNumberStudents.max;
		const value = +inputNumberStudents.value;
		if (value > maxStudents) { inputNumberStudents.value = maxStudents }
		else if (value < minStudents) { inputNumberStudents.value = minStudents }

		if (inputNumberStudents.value <= 17) {
			numberStudentsPrice.classList.add('_active')
			numberStudentsPrice_3.classList.remove('_active')
			numberStudentsPrice_2.classList.remove('_active')

			numberDescStudentsPrice.forEach(desc => {
				desc.classList.add('_active')
			});
			numberDescStudentsPrice_3.forEach(desc => {
				desc.classList.remove('_active')
			});
			numberDescStudentsPrice_2.forEach(desc => {
				desc.classList.remove('_active')
			});

			numberAttendantsPrice.classList.add("_active");
			numberAttendantsPrice_2.classList.remove("_active");
			numberAttendantsPrice_3.classList.remove("_active");

			numberAttendants.classList.add("_active");
			numberAttendants_2.classList.remove("_active");
			numberAttendants_3.classList.remove("_active");
		} else if (inputNumberStudents.value >= 19 && inputNumberStudents.value <= 28) {
			numberStudentsPrice.classList.remove('_active')
			numberStudentsPrice_2.classList.add('_active')
			numberStudentsPrice_3.classList.remove('_active')

			numberDescStudentsPrice.forEach(desc => {
				desc.classList.remove('_active')
			});
			numberDescStudentsPrice_3.forEach(desc => {
				desc.classList.remove('_active')
			});
			numberDescStudentsPrice_2.forEach(desc => {
				desc.classList.add('_active')
			});

			numberAttendantsPrice.classList.remove("_active");
			numberAttendantsPrice_2.classList.add("_active");
			numberAttendantsPrice_3.classList.remove('_active')

			numberAttendants.classList.remove("_active");
			numberAttendants_2.classList.add("_active");
			numberAttendants_3.classList.remove("_active");
		} else if (inputNumberStudents.value >= 30 && inputNumberStudents.value <= 50) {
			numberStudentsPrice_3.classList.add('_active')
			numberStudentsPrice.classList.remove('_active')
			numberStudentsPrice_2.classList.remove('_active')

			numberDescStudentsPrice.forEach(desc => {
				desc.classList.remove('_active')
			});
			numberDescStudentsPrice_3.forEach(desc => {
				desc.classList.add('_active')
			});
			numberDescStudentsPrice_2.forEach(desc => {
				desc.classList.remove('_active')
			});

			numberAttendantsPrice_3.classList.add("_active");
			numberAttendantsPrice.classList.remove("_active");
			numberAttendantsPrice_2.classList.remove("_active");

			numberAttendants.classList.remove("_active");
			numberAttendants_2.classList.remove("_active");
			numberAttendants_3.classList.add("_active");
		}

	});

	if (numberStudentsPrice.classList.contains("_active")) {
		totalPriceElement = (totalPriceElement) + inputNumberStudents.value * numberStudentsPrice.innerHTML;
		totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value * numberStudentsPrice.innerHTML);

		radioType_2.forEach(radio_2 => {
			if (radio_2.checked === true) {
				radioType_1.value = 0;
				if (radioType_1.checked === true) {
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
					totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
				};
			};
		});

		if (inputNumberAttendants.value > numberAttendants.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice.innerHTML) - (numberAttendantsPrice.innerHTML * numberAttendants.innerHTML);
		}
	}
	if (numberStudentsPrice_2.classList.contains("_active")) {
		totalPriceElement = (totalPriceElement) + inputNumberStudents.value * numberStudentsPrice_2.innerHTML;
		totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value * numberStudentsPrice_2.innerHTML);
		radioType_2.forEach(radio_2 => {
			if (radio_2.checked === true) {
				radioType_1.value = 0;
				if (radioType_1.checked === true) {
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
					totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
				};
			};
		});
		if (inputNumberAttendants.value > numberAttendants_2.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_2.innerHTML) - (numberAttendantsPrice_2.innerHTML * numberAttendants_2.innerHTML);
		}
	}
	if (numberStudentsPrice_3.classList.contains("_active")) {
		totalPriceElement = (totalPriceElement) + inputNumberStudents.value * numberStudentsPrice_3.innerHTML;
		totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value * numberStudentsPrice_3.innerHTML);
		radioType_2.forEach(radio_2 => {
			if (radio_2.checked === true) {
				radioType_1.value = 0;
				if (radioType_1.checked === true) {
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
					totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value - inputStudentsMasterСlass.value) + ((parseInt(inputStudentsMasterСlass.value) * numberStudentsPrice.innerHTML) + (parseInt(radio_2.value) * (parseInt(inputStudentsMasterСlass.value))));
				};
			};
		});
		if (inputNumberAttendants.value > numberAttendants_3.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_3.innerHTML) - (numberAttendantsPrice_3.innerHTML * numberAttendants_3.innerHTML);
		}
	}

	//количество на странице + 
	quantityButtons.forEach(quantityButton => {
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			inputStudentsQuantity_1.value = inputStudentsQuantity_2.value;
			if (value <= 17) {
				numberStudentsPrice.classList.add('_active')
				numberStudentsPrice_3.classList.remove('_active')
				numberStudentsPrice_2.classList.remove('_active')

				numberDescStudentsPrice.forEach(desc => {
					desc.classList.add('_active')
				});
				numberDescStudentsPrice_3.forEach(desc => {
					desc.classList.remove('_active')
				});
				numberDescStudentsPrice_2.forEach(desc => {
					desc.classList.remove('_active')
				});
			} else if (value >= 19 && value <= 28) {
				numberStudentsPrice.classList.remove('_active')
				numberStudentsPrice_2.classList.add('_active')
				numberStudentsPrice_3.classList.remove('_active')

				numberDescStudentsPrice.forEach(desc => {
					desc.classList.remove('_active')
				});
				numberDescStudentsPrice_3.forEach(desc => {
					desc.classList.remove('_active')
				});
				numberDescStudentsPrice_2.forEach(desc => {
					desc.classList.add('_active')
				});
			} else if (value >= 30 && value <= 50) {
				numberStudentsPrice_3.classList.add('_active')
				numberStudentsPrice.classList.remove('_active')
				numberStudentsPrice_2.classList.remove('_active')

				numberDescStudentsPrice.forEach(desc => {
					desc.classList.remove('_active')
				});
				numberDescStudentsPrice_3.forEach(desc => {
					desc.classList.add('_active')
				});
				numberDescStudentsPrice_2.forEach(desc => {
					desc.classList.remove('_active')
				});
			}
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
				if (value >= 50) {
					quantityButton.classList.add("disabled")
				} else {
					quantityButton.classList.remove("disabled")
				}
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
					quantityButton.classList.add("disabled")
				} else {
					quantityButton.classList.remove("disabled")
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = inputNumberStudents.value = value;

			numberDescStudentsPrice.forEach(desc => {
				if (desc.classList.contains("_active")) {
					totalPriceElement_2 = (inputStudentsQuantity_1.value * desc.innerHTML);
					totalPriceElement_2 = (inputStudentsQuantity_2.value * desc.innerHTML);
					totalPrice.innerText = totalPriceElement_2;
					totalPrice_2.forEach(total => {
						total.innerText = totalPriceElement_2;
					});
					totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
				}
			});
			numberDescStudentsPrice_2.forEach(desc => {
				if (numberStudentsPrice_2.classList.contains("_active")) {
					totalPriceElement_2 = (inputStudentsQuantity_1.value * desc.innerHTML);
					totalPriceElement_2 = (inputStudentsQuantity_2.value * desc.innerHTML);
					totalPrice.innerText = totalPriceElement_2;
					totalPrice_2.forEach(total => {
						total.innerText = totalPriceElement_2;
					});
					totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
				}
			});
			numberDescStudentsPrice_3.forEach(desc => {
				if (numberStudentsPrice_3.classList.contains("_active")) {
					totalPriceElement_2 = (inputStudentsQuantity_1.value * desc.innerHTML);
					totalPriceElement_2 = (inputStudentsQuantity_2.value * desc.innerHTML);
					totalPrice.innerText = totalPriceElement_2;
					totalPrice_2.forEach(total => {
						total.innerText = totalPriceElement_2;
					});
					totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
				}
			});
		});
	});

	//радиокнопки
	const optionsOther = document.querySelector('.form-popup__options-other');
	if (optionsOther) {
		radioType_2.forEach(radio_2 => {
			if (radio_2.checked === true) {
				radioType_1.value = 0;
				if (radioType_1.checked === true) {
					document.documentElement.classList.add("_active-option");
				} else {
					document.documentElement.classList.remove("_active-option")
				}
			};
		});
	}
	radioType.forEach(radio => {
		if (radio.checked === true) {
			totalPriceElement = (totalPriceElement) + parseInt(radio.value);
		}
	});

	if ((parseInt(inputStudentsMasterСlass.value)) > inputNumberStudents.value) {
		inputNumberStudents.value = inputStudentsMasterСlass.value;
	}

	//селекты
	const selectOptions = document.querySelectorAll('.select__option');
	//классы школьников
	const classes = [
		{
			name: 'junior',
			sum: 1000,
		},
		{
			name: 'medium',
			sum: 2000,
		}
		,
		{
			name: 'senior',
			sum: 3000,
		}
	]
	let currentSum = classes[0].sum;
	selectOptions.forEach(option => {
		option.addEventListener("click", function (e) {
			selectOptions.forEach(el => { el.classList.remove('_active'); });
			option.classList.add("_active");
			takeActiveClasses(option)
		});
	});
	const takeActiveClasses = sumClassesActive => {
		const dataAttrValue = sumClassesActive.getAttribute("data-price-class");
		const totalClasses = classes.find(option => option.name === dataAttrValue)
		currentSum = totalClasses.sum;
		totalPriceElement = (totalPriceElement) + currentSum;
		//console.log(currentSum)
	}

	document.querySelectorAll(".cell_wrapper").forEach((cell) => {
		if (cell) {
			cell.addEventListener("click", function (e) {
				const calendarItemFifth = document.querySelector('.cell_wrapper.cal_date.current.fifth-day.active');
				const calendarItemsSixth = document.querySelector('.cell_wrapper.cal_date.current.weekend.active');
				if (calendarItemFifth) {
					document.documentElement.classList.add("_active-wek-fifth")
					numberStudentsPrice.innerHTML = +priceStudents + +numberStudentsPriceFive.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice.innerHTML) - numberStudentsPrice.innerHTML;

					numberAttendantsPrice.innerHTML = +priceAttendants + +numberAttendantsPriceFive.innerHTML;
					if (inputNumberAttendants.value > numberAttendants.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * priceAttendants) - (numberAttendantsPrice.innerHTML * priceAttendants) - numberAttendantsPrice.innerHTML;
					}

					numberStudentsPrice_2.innerHTML = +priceStudents_2 + +numberStudentsPriceFive.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice_2.innerHTML) - priceStudents_2;

					numberAttendantsPrice_2.innerHTML = +priceAttendants_2 + +numberAttendantsPriceFive.innerHTML;
					if (inputNumberAttendants.value > numberAttendants_2.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_2.innerHTML) - priceAttendants_2;
					}

					numberStudentsPrice_3.innerHTML = +priceStudents_3 + +numberStudentsPriceFive.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice_3.innerHTML) - priceStudents_3;

					numberAttendantsPrice_3.innerHTML = +priceAttendants_3 + +numberAttendantsPriceFive.innerHTML;
					if (inputNumberAttendants.value > numberAttendants_3.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_3.innerHTML) - priceAttendants_3;
					}

					radioType_2.forEach(radio_2 => {
						if (radio_2.checked === true) {
							radioType_2.value = radioType_2.value + numberOptionsPriceWeekend.innerHTML;
						};
					});
				} else {
					document.documentElement.classList.remove("_active-wek-fifth")
					numberStudentsPrice.innerHTML = (+priceStudents + +numberStudentsPriceFive.innerHTML) - numberStudentsPriceFive.innerHTML;
					numberAttendantsPrice.innerHTML = (+priceAttendants + +numberAttendantsPriceWeekend.innerHTML) - numberAttendantsPriceWeekend.innerHTML;

					numberStudentsPrice_2.innerHTML = (+priceStudents_2 + +numberStudentsPriceFive.innerHTML) - numberStudentsPriceFive.innerHTML;
					numberAttendantsPrice_2.innerHTML = (+priceAttendants_2 + +numberAttendantsPriceWeekend.innerHTML) - numberAttendantsPriceWeekend.innerHTML;

					numberStudentsPrice_3.innerHTML = (+priceStudents_3 + +numberStudentsPriceFive.innerHTML) - numberStudentsPriceFive.innerHTML;
					numberAttendantsPrice_3.innerHTML = (+priceAttendants_3 + +numberAttendantsPriceWeekend.innerHTML) - numberAttendantsPriceWeekend.innerHTML;
				}
				if (calendarItemsSixth) {
					document.documentElement.classList.add("_active-weekend")
					numberStudentsPrice.innerHTML = +priceStudents + +numberStudentsPriceWeekend.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice.innerHTML) - numberStudentsPrice.innerHTML;

					numberAttendantsPrice.innerHTML = +priceAttendants + +numberAttendantsPriceWeekend.innerHTML;
					if (inputNumberAttendants.value > numberAttendants.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * priceAttendants) - (numberAttendantsPrice.innerHTML * priceAttendants) - numberAttendantsPrice.innerHTML;
					}

					numberStudentsPrice_2.innerHTML = +priceStudents_2 + +numberStudentsPriceWeekend.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice_2.innerHTML) - priceStudents_2;

					numberAttendantsPrice_2.innerHTML = +priceAttendants_2 + +numberAttendantsPriceWeekend.innerHTML;
					if (inputNumberAttendants.value > numberAttendants_2.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_2.innerHTML) - priceAttendants_2;
					}

					numberStudentsPrice_3.innerHTML = +priceStudents_3 + +numberStudentsPriceWeekend.innerHTML;
					totalPriceElement = (totalPriceElement) + (inputNumberStudents.value * numberStudentsPrice_3.innerHTML) - priceStudents_3;

					numberAttendantsPrice_3.innerHTML = +priceAttendants_3 + +numberAttendantsPriceWeekend.innerHTML;
					if (inputNumberAttendants.value > numberAttendants_3.innerHTML) {
						totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_3.innerHTML) - priceAttendants_3;
					}

					radioType_2.forEach(radio_2 => {
						if (radio_2.checked === true) {
							radioType_2.value = radioType_2.value + numberOptionsPriceFive.innerHTML;
						};
					});
				} else {
					document.documentElement.classList.remove("_active-weekend")
				}
			});
		}
	});

	//сумма
	const formatter = new Intl.NumberFormat('ru')
	if (totalPrice) {
		totalPrice.innerText = formatter.format(totalPriceElement);
	}
	if (totalPrice_2) {
		totalPrice_2.forEach(total => {
			total.innerText = formatter.format(totalPriceElement_2);
		});

	}

	//старая цена
	if (totalPriceOld) {
		totalPriceOld.innerText = totalPriceElement + (totalPriceElement / 100 * percent);
	}

};

calculater()

//календарь
document.querySelectorAll(".cell_wrapper").forEach((cell) => {
	cell.addEventListener("click", function (e) {
		calculater()
	});
});


inputTotals.forEach(input => {
	input.addEventListener('input', function () {
		calculater();
	});
});