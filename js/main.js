'use strict';

var PIN_MAIN_HEIGHT = 80;
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
  window.util.isEnterEvent(evt, activeMap);
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

    renderPins(window.data.getArrayAds());
  }
};

var onMapPinMouseDown = function (evt) {
  window.util.isButtonEvent(evt, activeMap);
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

var renderFeature = function (features) { // Отрисовываем особенности объявления
  var featuresFragment = document.createDocumentFragment();
  var featureList = templateCard.querySelector('.popup__features');
  featureList.innerHTML = '';

  features.forEach(function (feature) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + feature;
    featuresFragment.appendChild(newFeature);
  });

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

  photos.forEach(function (photo) {
    var newPhoto = photoItem.cloneNode(true);
    newPhoto.src = photo;
    photosFragment.appendChild(newPhoto);
  });

  if (photos.length > 0) {
    photosList.appendChild(photosFragment);
  } else {
    photosList.classList.add('hidden');
  }
};

/*
Создаю пин на основе полученных данных из массива
*/
var createPin = function (ad) { // Создаем Пин по полученным данным из массива
  var newPinTemplate = templatePin.cloneNode(true);
  newPinTemplate.querySelector('img').src = ad.author.avatar;
  newPinTemplate.querySelector('img').alt = ad.offer.title;
  newPinTemplate.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';

  // При клики на пин вызывается функция с проверкой на наличие существующих карточек объявлений в разметке, если их нет, тогда создается новая карточка и вставляется перед контейнером mapFilters
  newPinTemplate.addEventListener('click', function () {
    openCardAd(ad);
  });

  return newPinTemplate;
};

/*
Прохожу по каждому элементу массива объектов. Каждый полученный элемент массива передаю в функцию создания пина и добавляю этот пин в контейнер для пинов
*/
var renderPins = function (ads) {
  ads.forEach(function (ad) {
    mapPins.appendChild(createPin(ad));
  });
};

/*
Проверяю находятся ли в контейнере с пинами сами пины, если да, тогда удаляем их
*/
var closeCardAd = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
    document.removeEventListener('keydown', onPopupCloseEscPress);
  }
};

var openCardAd = function (ad) {
  closeCardAd();
  map.insertBefore(createCard(ad), mapFilters);
  document.addEventListener('keydown', onPopupCloseEscPress);
};

var onPopupCloseEscPress = function (evt) {
  window.util.isEscEvent(evt, closeCardAd);
};

/*
Создаю функцию, которая принимает данные пина, на котором произошло событие клика. По этим данным создаю карточку объявлений и возвращаю её
*/
var createCard = function (ad) { // Создаем карточку объявлений по полученным данным из массива
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
  newCardTemplate.querySelector('.popup__close').addEventListener('click', function () {
    closeCardAd();
  });

  return newCardTemplate;
};

mapPinMain.addEventListener('keydown', onPinMainEnterPress);
mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
