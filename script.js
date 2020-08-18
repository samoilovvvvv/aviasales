// элементы
const formSearch = document.querySelector('.form-search'),
	inputCitiesFrom = document.querySelector('.input__cities-from'),
	dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
	inputCitiesTo = document.querySelector('.input__cities-to'),
	dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
	inputDateDepart = document.querySelector('.input__date-depart');

// данные
let city = [];

const CITY_API = 'http://api.travelpayouts.com/data/ru/cities.json',
	PROXY = 'https://cors-anywhere.herokuapp.com/',
	API_KEY = '7b36d7b0a46ba5321aea139f20003d37',
	CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

// функции
const getData = (url, callback) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);

	request.addEventListener('load', () => {

		if (request.status === 200) {
			callback(request.response);
		} else {
			console.error(request.status);
		}

	});

	request.send();
};

function showCity(input, list) {
	removeCity(document.querySelectorAll('.dropdown__city'));

	if (input.value !== '') {

		const filterCity = city.filter(item => {
			const fixItem = item.name.toLowerCase();
			return fixItem.includes(input.value.toLowerCase());
		});

		filterCity.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('dropdown__city');
			li.textContent = item.name;
			list.append(li);
		});
	}
}

function removeCity(cities) {
	cities.forEach(item => item.remove());
}

function changeCity(event, input) {
	const target = event.target;
	input.value = target.textContent;
	input.focus();
	removeCity(document.querySelectorAll('.dropdown__city'));
}

function findCode(cityName) {
	let cityCode;

	city.forEach(item => {
		if (item.name === cityName) cityCode = item.code;
	});

	return cityCode;
}

function renderCheapDay(cheapTicket) {

}

function renderCheapYear(cheapTickets) {

}

function renderCheap(data, date) {
	const cheapTicket = (JSON.parse(data).best_prices);

	const cheapTicketDay = cheapTicket.filter(item => item.depart_date === date);
	console.log(cheapTicketDay);

}

// обработчик событий
inputCitiesFrom.addEventListener('input', () => {
	showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
	showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', event => {
	changeCity(event, inputCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', event => {
	changeCity(event, inputCitiesTo);
});

formSearch.addEventListener('submit', (event) => {
	event.preventDefault();

	const cityFrom = city.find(item => inputCitiesFrom.value === item.name);

	const cityTo = city.find(item => inputCitiesTo.value === item.name);

	const formDate = {
		from: cityFrom.code,
		to: cityTo.code,
		when: inputDateDepart.value
	}

	const requestData = `?depart_date=${formDate.when}&origin=${formDate.from}&destination=${formDate.to}&one_way=true&token${API_KEY}`;
	
	getData(CALENDAR + requestData, (response) => {
		renderCheap(response, formDate.when);
	});

});

// вызовы функций
getData(PROXY + CITY_API, (data) => {
	city = (JSON.parse(data)).filter(item => item.name);
});

// getData(PROXY + CALENDAR + '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token=' + API_KEY, data => {
//     const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-09-29');
//     console.log(cheapTicket);
// });