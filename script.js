// элементы
const formSearch = document.querySelector('.form-search'),
	inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
	dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
	inputCitiesTo = formSearch.querySelector('.input__cities-to'),
	dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
	inputDateDepart = formSearch.querySelector('.input__date-depart'),
	cheapestTicket = document.querySelector('#cheapest-ticket'),
	otherCheapTickets = document.querySelector('#other-cheap-tickets'),
	wrongDirection = document.querySelector('#wrong-direction'),
	wrongCityName = document.querySelector('#wrong-city-name');

// данные
let city = [];
let filterCity = [];

const MAX_COUNT = 10;

const CITY_API = 'http://api.travelpayouts.com/data/ru/cities.json',
	PROXY = 'https://cors-anywhere.herokuapp.com/',
	API_KEY = '7b36d7b0a46ba5321aea139f20003d37',
	CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

// функции
const getData = (url, callback, reject = console.error) => {
	const request = new XMLHttpRequest();

	request.open('GET', url);

	request.addEventListener('load', () => {

		if (request.status === 200) {
			callback(request.response);
		} else {
			reject(request.status);
		}

	});

	request.send();
};

const showCity = (input, list) => {
	removeCity(document.querySelectorAll('.dropdown__city'));

	if (input.value !== '') {

		const filterCity = city.filter(item => {
			const fixItem = item.name.toLowerCase();
			return fixItem.startsWith(input.value.toLowerCase());
		});

		filterCity.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('dropdown__city');
			li.textContent = item.name;
			list.append(li);
		});
	}
};

const removeCity = cities => {
	cities.forEach(item => item.remove());
};

const changeCity = (event, input) => {
	const target = event.target;
	input.value = target.textContent;
	input.focus();
	removeCity(document.querySelectorAll('.dropdown__city'));
};

const getNameCity = code => {
	const objCity = city.find(item => item.code === code);
	return objCity.name;
};

const getDate = date => {
	return new Date(date).toLocaleString('ru', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};

const getChanges = num => {
	if(num) {
		return num === 1 ? 'С одной пересадкой' : 'С двумя пересадками';
	} else {
		return 'Без пересадок';
	}
};

const getLinkAviasales = data => {
	let link = 'https://www.aviasales.ru/search/';

	link += data.origin;

	const date = new Date(data.depart_date);
	const day = date.getDate();
	const month = date.getMonth() + 1;

	link += day < 10 ? '0' + day : day;

	link += month < 10 ? '0' + month : month;

	link += data.destination;

	link += '1';

	return link;
};

const createCard = data => {
	const ticket = document.createElement('article');
	ticket.classList.add('ticket');
	
	let deep = '';

	if(data) {
		deep = `
		<h3 class="agent">${data.gate}</h3>
		<div class="ticket__wrapper">
			<div class="left-side">
				<a href="${getLinkAviasales(data)}" target="_blank" class="button button__buy">Купить
					за ${data.value}₽</a>
			</div>
			<div class="right-side">
				<div class="block-left">
					<div class="city__from">Вылет из города
						<span class="city__name">${getNameCity(data.origin)}</span>
					</div>
					<div class="date">${getDate(data.depart_date)}</div>
				</div>

				<div class="block-right">
					<div class="changes">${getChanges(data.number_of_changes)}</div>
					<div class="city__to">Город назначения:
						<span class="city__name">${getNameCity(data.destination)}</span>
					</div>
				</div>
			</div>
		</div>
	`;
	} else {
		deep = '<h3>К сожалению, билетов на текущую дату билетов не нашлось</h3>';
	}

	ticket.insertAdjacentHTML('afterbegin', deep);

	return ticket;
};

const renderCheapDay = cheapTicket => {
	cheapestTicket.style.display = 'block';
	cheapestTicket.innerHTML = '<h2>Самый дешевый билет на выбранную дату</h2>';

	const ticket = createCard(cheapTicket[0]);

	cheapestTicket.insertAdjacentElement('beforeend', ticket);
};

const renderCheapYear = cheapTickets => {
	otherCheapTickets.style.display = 'block';
	otherCheapTickets.innerHTML = '<h2>Самый дешевые билеты на другие даты</h2>';

	cheapTickets.sort((a, b) => {
 
		if(a.value > b.value) return 1;

		if(a.value < b.value) return -1;

		return 0;
	});

	for(let i = 0; i < cheapTickets.length && i < MAX_COUNT; i++ ) {
		const ticket = createCard(cheapTickets[i]);

		otherCheapTickets.insertAdjacentElement('beforeend', ticket);
	}

	console.log(cheapTickets);
};

const renderCheap = (data, date) => {
	const cheapTicket = JSON.parse(data).best_prices;

	const cheapTicketDay = cheapTicket.filter(item => item.depart_date === date);

	renderCheapDay(cheapTicketDay);
	renderCheapYear(cheapTicket);
};

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

document.querySelector('body').addEventListener('click', () => removeCity(document.querySelectorAll('.dropdown__city')));

formSearch.addEventListener('submit', event => {
	event.preventDefault();

	const cityFrom = city.find(item => inputCitiesFrom.value === item.name);

	const cityTo = city.find(item => inputCitiesTo.value === item.name);

	const formDate = {
		from: cityFrom,
		to: cityTo,
		when: inputDateDepart.value
	}

	if(formDate.from && formDate.to){
		const requestData = `?depart_date=${formDate.when}&origin=${formDate.from.code}&destination=${formDate.to.code}&one_way=true&token${API_KEY}`;
		
		getData(CALENDAR + requestData, response => {
			wrongDirection.innerHTML = '';
			wrongCityName.innerHTML = '';
			renderCheap(response, formDate.when);
		}, error => {
			wrongDirection.style.display = 'block';
			wrongDirection.innerHTML = '<h2>В этом направлении нет рейсов</h2>';
			console.error(error);
		});
	} else {
		wrongCityName.style.display = 'block';
		wrongCityName.innerHTML = '<h2>Введите корректное название города!</h2>';
	}

});

// вызовы функций
getData(PROXY + CITY_API, data => {
	city = (JSON.parse(data)).filter(item => item.name);

	city.sort((a, b) => {

		if(a.name > b.name) return 1;

		if(a.name < b.name) return -1;

		return 0;
	});
	console.log(city);
});