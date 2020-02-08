'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME_IN_AND_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_URLS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];
var KeyCode = {
  ESC: 27,
  ENTER: 13
};
var ButtonPressed = {
  LEFT_MOUSE_BTN: 0
};
var HouseTypesPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALO: 0
};
var TOTAL_PINS = 8;
var PIN_WIDTH = 50;
var PIN_MAIN_HEIGHT = 80;
var MAP_WIDTH = 1200;
var MIN_X = 0;
var MAX_X = MAP_WIDTH - PIN_WIDTH;
var MIN_Y = 130;
var MAX_Y = 630;
var isDisabled = true;
var isActive = false;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters-container');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var formFilters = mapFilters.querySelector('.map__filters');
var address = adForm.querySelector('#address');
var formRoomNumber = adForm.querySelector('#room_number');
var selectGuest = adForm.querySelector('#capacity');
var avatar = adForm.querySelector('#avatar');
var images = adForm.querySelector('#images');
var typeOfHousing = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

var setInitialPrice = function () {
  price.placeholder = HouseTypesPrices[typeOfHousing.value.toUpperCase()];
  return price;
};
setInitialPrice();

var disabledState = function (bool) {
  adForm.querySelectorAll('fieldset').forEach(function (fieldset) {
    fieldset.disabled = bool;
  });

  formFilters.querySelectorAll('select').forEach(function (select) {
    select.disabled = bool;
  });

  formFilters.querySelectorAll('fieldset').forEach(function (fieldset) {
    fieldset.disabled = bool;
  });
};

disabledState(isDisabled);

var onPinMainEnterPress = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    activeMap();
  }
};

var getCoordPinMain = function (bool) {
  var coordX;
  var coordY;

  if (bool) {
    coordX = parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2;
    coordY = parseInt(mapPinMain.style.top, 10) + PIN_MAIN_HEIGHT;
  } else {
    coordX = parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2;
    coordY = parseInt(mapPinMain.style.top, 10) + mapPinMain.offsetHeight / 2;
  }

  var coordPin = Math.round(coordX) + ', ' + Math.round(coordY);

  address.value = coordPin;
};

getCoordPinMain(isActive);


var activeMap = function () { // Активируем карту
  if (map.classList.contains('map--faded')) {
    isDisabled = false;
    isActive = true;
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPinMain.removeEventListener('keydown', onPinMainEnterPress);

    getCoordPinMain(isActive);
    disabledState(isDisabled);

    renderPin(getArrayAds(TOTAL_PINS));
    renderCard(getArrayAds(TOTAL_PINS), TOTAL_PINS);
  }
};

var onMapPinMouseDown = function (evt) {
  if (evt.button === ButtonPressed.LEFT_MOUSE_BTN) {
    activeMap();
  }
};

// Написать валидацию, которая удаляет неподходящие элементы из селекта #capacity
var onChangeRoom = function () {
  if (formRoomNumber.value === '1' && selectGuest.value !== '1') {
    selectGuest.setCustomValidity('«1 комната» - «для 1 гостя»');
  } else if (formRoomNumber.value === '2' && (selectGuest.value !== '1' && selectGuest.value !== '2')) {
    selectGuest.setCustomValidity('«2 комнаты» - «для 2 гостей» или «для 1 гостя»');
  } else if (formRoomNumber.value === '3' && selectGuest.value === '0') {
    selectGuest.setCustomValidity('«3 комнаты» - «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (formRoomNumber.value === '100' && selectGuest.value !== '0') {
    selectGuest.setCustomValidity('«100 комнат» - «не для гостей»');
  } else {
    selectGuest.setCustomValidity('');
  }
};

var getRandomNumber = function (min, max) { // Получаем случайное число в заданном диапазоне
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElementArr = function (arr) { // Получаем случайный элемент массива
  return arr[getRandomNumber(0, arr.length - 1)];
};

var getAvatar = function (number) { // Получаем адрес аватарок
  return 'img/avatars/user' + (number < 10 ? '0' + number : number) + '.png';
};

var getRandomLengthArr = function (arr) { // Изменяем передаваемый массив и возвращаем измененный массив от нулевого элемента до элемента случайной длины
  return arr.slice(0, arr.indexOf(getRandomElementArr(arr)) + 1);
};

var declensionWords = function (totalRooms, totalQuests) { // Проверяем склонение слов
  var message = totalRooms;

  if (totalRooms % 10 === 1 && totalRooms % 100 !== 11) {
    message += ' комната ';
  } else if (totalRooms >= 2 && totalRooms <= 4) {
    message += ' комнаты ';
  } else {
    message += ' комнат ';
  }

  if (totalQuests % 10 === 1 && totalQuests % 100 !== 11) {
    message += 'для ' + totalQuests + ' гостя';
  } else {
    message += 'для ' + totalQuests + ' гостей';
  }

  return message;
};

var createAd = function (number) { // Создаем объект объявления
  var ad = {
    author: {
      avatar: getAvatar(number)
    },
    offer: {
      title: 'Заголовок ' + number + '-го предложения',
      address: getRandomNumber(0, 650) + ', ' + getRandomNumber(0, 350),
      price: getRandomNumber(0, 1000),
      type: getRandomElementArr(HOUSE_TYPES),
      rooms: getRandomNumber(0, 7),
      guests: getRandomNumber(1, 15),
      checkin: getRandomElementArr(TIME_IN_AND_OUT),
      checkout: getRandomElementArr(TIME_IN_AND_OUT),
      features: getRandomLengthArr(FEATURES),
      description: 'строка с описанием предложенного объявления',
      photos: getRandomLengthArr(PHOTO_URLS)
    },
    location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    }
  };

  return ad;
};

var getArrayAds = function (total) { // Получаем массив объектов объявления
  var ads = [];

  for (var i = 1; i <= total; i++) {
    ads.push(createAd(i));
  }

  return ads;
};

var renderPin = function (ads) { // Отрисовываем Пины на страницу
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < TOTAL_PINS; i++) {
    var ad = ads[i];

    var newPinTemplate = templatePin.cloneNode(true);
    newPinTemplate.querySelector('img').src = ad.author.avatar;
    newPinTemplate.querySelector('img').alt = ad.offer.title;
    newPinTemplate.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';
    pinFragment.appendChild(newPinTemplate);
  }

  mapPins.appendChild(pinFragment);
};

var getTypeHouse = function (typeHouse) { // Получаем тип жилища в зависимости от полученых данных
  var type = '';

  switch (typeHouse) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
  }

  return type;
};

var renderCard = function (ads, number) { // Отрисовываем карточки объявлений
  var cardsFragment = document.createDocumentFragment();

  for (var i = 0; i < number; i++) {
    var ad = ads[i];

    var newCardTemplate = templateCard.cloneNode(true);
    newCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
    newCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
    newCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCardTemplate.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    newCardTemplate.querySelector('.popup__type').textContent = getTypeHouse(ad.offer.type);
    newCardTemplate.querySelector('.popup__text--capacity').textContent = declensionWords(ad.offer.rooms, ad.offer.guests);
    newCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    newCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
    renderFeature(ad.offer.features);
    renderPhotos(ad.offer.photos);

    cardsFragment.appendChild(newCardTemplate);
  }

  map.insertBefore(cardsFragment, mapFilters);
};

var renderFeature = function (features) { // Отрисовываем особенности объявления
  var featuresFragment = document.createDocumentFragment();
  var featureList = templateCard.querySelector('.popup__features');
  featureList.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature');
    newFeature.classList.add('popup__feature--' + features[i]);
    featuresFragment.appendChild(newFeature);
  }

  if (features.length > 0) {
    featureList.appendChild(featuresFragment);
  } else {
    featureList.classList.add('hidden');
  }
};

var renderPhotos = function (photos) { // Отрисовываем фотографии объявления
  var photosFragment = document.createDocumentFragment();
  var photosList = templateCard.querySelector('.popup__photos');
  var photoItem = photosList.querySelector('.popup__photo');
  photosList.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    var newPhoto = photoItem.cloneNode(true);
    newPhoto.src = photos[i];
    photosFragment.appendChild(newPhoto);
  }

  if (photos.length > 0) {
    photosList.appendChild(photosFragment);
  } else {
    photosList.classList.add('hidden');
  }
};


// Обработчик для показа карточки объявления при клики на Пин
// mapPins.addEventListener('click', function (evt) {
//   var target = evt.target;
//   var btnPins = mapPins.querySelectorAll('button[type="button"');
//   console.log('target: ', target);

//   btnPins.forEach(function (btn) {

//     // if (target !== btn) return;

//     console.log('btnPins: ', btn);
//   });
// });

// var checkTypeHouse = function () {
//   ty
// };

var setInAndOutTime = function (time) {
  timeIn.value = time;
  timeOut.value = time;
};

timeIn.addEventListener('change', function (evt) {
  setInAndOutTime(evt.target.value);
});

timeOut.addEventListener('change', function (evt) {
  setInAndOutTime(evt.target.value);
});

var onTypeHouseChoosing = function (evt) {
  var value = evt.target.value;
  var minPrice = HouseTypesPrices[value.toUpperCase()];

  switch (typeOfHousing.value) {
    case 'bungalo':
      price.placeholder = minPrice;
      price.min = minPrice;
      break;
    case 'flat':
      price.placeholder = minPrice;
      price.min = minPrice;
      break;
    case 'house':
      price.placeholder = minPrice;
      price.min = minPrice;
      break;
    case 'palace':
      price.placeholder = minPrice;
      price.min = minPrice;
      break;
  }
};

var getFileExtension = function (str) {
  return str.slice(str.lastIndexOf('.') + 1);
};

var checkFileExtension = function (input) {
  if (input.value.includes('.png') || input.value.includes('.jpeg') || input.value.includes('.jpg')) {
    input.setCustomValidity('');
  } else {
    input.setCustomValidity('Ваш формат файла "' + getFileExtension(input.value) + '", разрешенными форматами являются: jpg и png. Пожалуйста проверьте формат загружаемого файла.');
  }
};

avatar.addEventListener('input', function () {
  checkFileExtension(avatar);
});

images.addEventListener('input', function () {
  checkFileExtension(images);
});

mapPinMain.addEventListener('keydown', onPinMainEnterPress);
mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
formRoomNumber.addEventListener('change', onChangeRoom);
selectGuest.addEventListener('change', onChangeRoom);
typeOfHousing.addEventListener('input', onTypeHouseChoosing);
