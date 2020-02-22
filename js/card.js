'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  // Создаю функцию, которая принимает данные пина, на котором произошло событие клика. По этим данным создаю карточку объявлений и возвращаю её
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
      default:
        type = 'Неизвестное построение';
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

  // Проверяю находятся ли в контейнере с пинами сами пины, если да, тогда удаляем их
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

  window.card = {
    openCardAd: openCardAd,
    closeCardAd: closeCardAd
  };
})();
