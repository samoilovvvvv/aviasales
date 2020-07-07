const formSearch = document.querySelector('.form_search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

const city = ['Москва', 'Киев', 'Минск', 'Афины', 'Волгоград', 'Санкт-Петербург', 'Красноярск',
'Краснодар', 'Варшава', 'Рига', 'Бруклин', 'Дрезден', 'Одесса', 'Берлин', 'Барселона', 'Прага', 'Вена', 'Рим',
'Гамбург', 'Геленджик', 'Дубай', 'Екатеринбург', 'Казань', 'Кёльн', 'Киев', 'Мадрид', 'Милан', 'Керч', 'Кёльн',
'Омск', 'Осло', 'Витебск', 'Брест', 'Сочи', 'София', 'Тбилиси', 'Харьков', 'Цюрих', 'Челябинск', 'Чебоксары', 
'Шанхай', 'Штутгарт', 'Юрмала', 'Якутск', 'Ялта', 'Ярославль'];