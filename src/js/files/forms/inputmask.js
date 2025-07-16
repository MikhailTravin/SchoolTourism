// Подключение модуля
import "inputmask/dist/inputmask.min.js";

const data = document.querySelectorAll('.tel');
if (data) {
	Inputmask({ "mask": "+7 (999) - 999 - 99 - 99" }).mask(data);
}

const numCard = document.querySelectorAll('.card');
if (numCard) {
	Inputmask({ "mask": "9999 - 9999 - 9999" }).mask(numCard);
}