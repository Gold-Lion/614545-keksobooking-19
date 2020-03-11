'use strict';

(function () {
  var typeHouseMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (ad) {
    var newCardTemplate = templateCard.cloneNode(true);
    newCardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
    newCardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
    newCardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCardTemplate.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    newCardTemplate.querySelector('.popup__type').textContent = getTypeHouse(ad.offer.type);
    newCardTemplate.querySelector('.popup__text--capacity').textContent = declensionWords(ad.offer.rooms, ad.offer.guests);
    newCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    newCardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
    renderFeature(newCardTemplate.querySelector('.popup__features'), ad.offer.features);
    renderPhotos(newCardTemplate.querySelector('.popup__photos'), ad.offer.photos);
    newCardTemplate.querySelector('.popup__close').addEventListener('click', function () {
      closeCardAd();
    });

    return newCardTemplate;
  };

  var declensionWords = function (totalRooms, totalQuests) {
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

  var getTypeHouse = function (typeHouse) {
    if (typeHouseMap[typeHouse]) {
      return typeHouseMap[typeHouse];
    }

    return 'Неизвестное построение';
  };

  var renderFeature = function (container, features) {
    if (!Array.isArray(features) || features.length === 0) {
      container.remove();
      return;
    }

    container.innerHTML = '';
    features.forEach(function (feature) {
      container.innerHTML += '<li class="popup__feature popup__feature--' + feature + '"</li>';
    });
  };

  var renderPhotos = function (container, photos) {
    if (!Array.isArray(photos) || photos.length === 0) {
      container.remove();
      return;
    }

    container.innerHTML = '';
    photos.forEach(function (photo) {
      container.innerHTML += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    });
  };

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
    openAd: openCardAd,
    closeAd: closeCardAd
  };
})();
