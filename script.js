const formSearch = document.querySelector('.form_search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

const city = ['Москва', 'Киев', 'Минск', 'Афины', 'Волгоград', 'Санкт-Петербург', 'Красноярск',
'Краснодар', 'Варшава', 'Рига', 'Бруклин', 'Дрезден', 'Одесса', 'Берлин', 'Барселона', 'Прага', 'Вена', 'Рим',
'Гамбург', 'Геленджик', 'Дубай', 'Екатеринбург', 'Казань', 'Кёльн', 'Мадрид', 'Милан', 'Керч', 'Кёльн',
'Омск', 'Осло', 'Витебск', 'Брест', 'Сочи', 'София', 'Тбилиси', 'Харьков', 'Цюрих', 'Челябинск', 'Чебоксары', 
'Шанхай', 'Штутгарт', 'Юрмала', 'Якутск', 'Ялта', 'Ярославль'];

function showCity(input, list) {
    removeCity(document.querySelectorAll('.dropdown__city'));

    if(input.value !== ''){

    const filterCity = city.filter(item => {
        const fixItem = item.toLowerCase();
        return fixItem.includes(input.value.toLowerCase());
    });

    filterCity.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item;
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