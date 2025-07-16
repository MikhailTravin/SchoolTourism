// Подключение функционала "Чертогов Фрилансера"
import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение из node_modules
import tippy from 'tippy.js';

// Подключение cтилей из src/scss/libs
import "../../scss/libs/tippy.scss";
// Подключение cтилей из node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаем и добавляем в объект модулей
flsModules.tippy = tippy('[data-tippy-content]', {

});

//========================================================================================================================================================

const bookTour = document.querySelector('#book-tour');

const inputNumberStudents = document.querySelector('#number'); //количество школьников
const inputNumberStudentsQuantity = document.querySelector('#input-quantity'); //количество школьников
const inputNumberAttendants = document.querySelector('#number-2'); //дополнительные сопровождающие
const inputStudentsMasterСlass = document.querySelector('#number-4'); //количество школьников на мастеркласс
let quantityButtons = document.querySelectorAll('.quantity__button');

//цена школьников
const numberStudentsPrice = document.querySelector('.it-price-students-small'); //цена за 1 школьника < 17
const numberStudentsPrice_2 = document.querySelector('.it-price-students-medium'); //цена за 1 школьника > 17 < 28
const numberStudentsPrice_3 = document.querySelector('.it-price-students-big'); //цена за 1 школьника > 30 < 50
const numberStudentsPriceWeekend = document.querySelector('.it-price-students-weekend'); //цена за 1 школьника выходные
const numberStudentsPriceFive = document.querySelector('.it-price-students-five'); //цена за 1 школьника пятница

const numberDescStudentsPrice = document.querySelector('.desc-price-students-small'); //цена за 1 школьника < 17
const numberDescStudentsPrice_2 = document.querySelector('.desc-price-students-medium'); //цена за 1 школьника > 17 < 28
const numberDescStudentsPrice_3 = document.querySelector('.desc-price-students-big'); //цена за 1 школьника > 30 < 50

//цена сопровождающих
const numberAttendantsPrice = document.querySelector('.it-price-attendants-small'); //цена за 1 сопровождающих < 2
const numberAttendantsPrice_2 = document.querySelector('.it-price-attendants-medium'); //цена за 1 сопровождающих < 2
const numberAttendantsPrice_3 = document.querySelector('.it-price-attendants-big'); //цена за 1 сопровождающих < 4
const numberAttendantsPriceWeekend = document.querySelector('.it-price-attendants-weekend'); //цена за 1 сопровождающих выходные
const numberAttendantsPriceFive = document.querySelector('.it-price-attendants-five'); //цена за 1 сопровождающих пятница

const numberAttendants = document.querySelector('.number-attendants-small'); //количество сопровождающих до 17
const numberAttendants_2 = document.querySelector('.number-attendants-medium'); //количество сопровождающих 17-28
const numberAttendants_3 = document.querySelector('.number-attendants-big'); //количество сопровождающих 30-50

//радиокнопки
const radioType = document.querySelectorAll('input[name="option"]');
const radioType_2 = document.querySelectorAll('input[name="option_2"]');
const radioType_1 = document.querySelector('#o_1');

//итоговые значения
const totalPrice = document.querySelector('.form-popup__total-new-price'); //итоговая сумма в попапе
const totalPrice_2 = document.querySelector('.price-tour-card__total-sum'); //итоговая сумма на странице
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
		inputNumberStudentsQuantity.value = e.target.value;
		const minStudents = +inputNumberStudents.min;
		const maxStudents = +inputNumberStudents.max;
		const value = +inputNumberStudents.value;
		if (value > maxStudents) { inputNumberStudents.value = maxStudents }
		else if (value < minStudents) { inputNumberStudents.value = minStudents }

		if (inputNumberStudents.value <= 17) {
			numberStudentsPrice.classList.add('_active')
			numberStudentsPrice_3.classList.remove('_active')
			numberStudentsPrice_2.classList.remove('_active')

			numberDescStudentsPrice.classList.add('_active')
			numberDescStudentsPrice_3.classList.remove('_active')
			numberDescStudentsPrice_2.classList.remove('_active')

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

			numberDescStudentsPrice.classList.remove('_active')
			numberDescStudentsPrice_2.classList.add('_active')
			numberDescStudentsPrice_3.classList.remove('_active')

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

			numberDescStudentsPrice.classList.remove('_active')
			numberDescStudentsPrice_3.classList.add('_active')
			numberDescStudentsPrice_2.classList.remove('_active')

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
		if (inputNumberAttendants.value > numberAttendants.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice.innerHTML) - (numberAttendantsPrice.innerHTML * numberAttendants.innerHTML);
		}
	}
	if (numberStudentsPrice_2.classList.contains("_active")) {
		totalPriceElement = (totalPriceElement) + inputNumberStudents.value * numberStudentsPrice_2.innerHTML;
		totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value * numberStudentsPrice_2.innerHTML);
		if (inputNumberAttendants.value > numberAttendants_2.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_2.innerHTML) - (numberAttendantsPrice_2.innerHTML * numberAttendants_2.innerHTML);
		}
	}
	if (numberStudentsPrice_3.classList.contains("_active")) {
		totalPriceElement = (totalPriceElement) + inputNumberStudents.value * numberStudentsPrice_3.innerHTML;
		totalPriceElement_2 = totalPriceElement_2 + (inputNumberStudents.value * numberStudentsPrice_3.innerHTML);
		if (inputNumberAttendants.value > numberAttendants_3.innerHTML) {
			totalPriceElement = (totalPriceElement) + (inputNumberAttendants.value * numberAttendantsPrice_3.innerHTML) - (numberAttendantsPrice_3.innerHTML * numberAttendants_3.innerHTML);
		}
	}

	//количество на странице + -
	quantityButtons.forEach(quantityButton => {
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (value <= 17) {
				numberStudentsPrice.classList.add('_active')
				numberStudentsPrice_3.classList.remove('_active')
				numberStudentsPrice_2.classList.remove('_active')

				numberDescStudentsPrice_3.classList.remove('_active')
				numberDescStudentsPrice_2.classList.remove('_active')
				numberDescStudentsPrice.classList.add('_active')
			} else if (value >= 19 && value <= 28) {
				numberStudentsPrice.classList.remove('_active')
				numberStudentsPrice_2.classList.add('_active')
				numberStudentsPrice_3.classList.remove('_active')

				numberDescStudentsPrice.classList.remove('_active')
				numberDescStudentsPrice_2.classList.add('_active')
				numberDescStudentsPrice_3.classList.remove('_active')
			} else if (value >= 30 && value <= 50) {
				numberStudentsPrice_3.classList.add('_active')
				numberStudentsPrice.classList.remove('_active')
				numberStudentsPrice_2.classList.remove('_active')

				numberDescStudentsPrice.classList.remove('_active')
				numberDescStudentsPrice_3.classList.add('_active')
				numberDescStudentsPrice_2.classList.remove('_active')
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
		});
	});

	quantityButtons.forEach(btn => {
		btn.addEventListener('click', function () {
			if (numberDescStudentsPrice.classList.contains("_active")) {
				totalPriceElement_2 = (inputNumberStudentsQuantity.value * numberDescStudentsPrice.innerHTML);
				totalPrice.innerText = totalPriceElement_2;
				totalPrice_2.innerText = totalPriceElement_2;
				totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
			}
			if (numberStudentsPrice_2.classList.contains("_active")) {
				totalPriceElement_2 = (inputNumberStudentsQuantity.value * numberDescStudentsPrice_2.innerHTML);
				totalPrice.innerText = totalPriceElement_2;
				totalPrice_2.innerText = totalPriceElement_2;
				totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
			}
			if (numberStudentsPrice_3.classList.contains("_active")) {
				totalPriceElement_2 = (inputNumberStudentsQuantity.value * numberDescStudentsPrice_3.innerHTML);
				totalPrice.innerText = totalPriceElement_2;
				totalPrice_2.innerText = totalPriceElement_2;
				totalPriceOld.innerText = totalPriceElement_2 + (totalPriceElement_2 / 100 * percent);
			}
		});
	});

	//радиокнопки
	const optionsOther = document.querySelector('.form-popup__options-other');
	if (optionsOther) {
		radioType_2.forEach(radio_2 => {
			if (radio_2.checked === true) {
				radioType_1.value = 0;
				if (radioType_1.checked === true) {
					document.documentElement.classList.add("_active-option")
					totalPriceElement = (totalPriceElement) + (parseInt(inputStudentsMasterСlass.value) * parseInt(radio_2.value));
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
		console.log(currentSum)
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
		totalPrice_2.innerText = formatter.format(totalPriceElement_2);
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