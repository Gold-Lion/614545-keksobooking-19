'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 80;
  var PIN_WIDTH = 50;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var getCoordPinMain = function (left, top, bool) {
    var coordX = parseInt(left, 10) + mapPinMain.offsetWidth / 2;
    var coordY = parseInt(top, 10) + mapPinMain.offsetHeight / 2;

    if (bool) {
      coordY = parseInt(top, 10) + PIN_MAIN_HEIGHT;
    }

    var coordsPin = Math.round(coordX) + ', ' + Math.round(coordY);

    return coordsPin;
  };

  // Создаю пин на основе полученных данных из массива
  var createPin = function (ads) {
    for (var i = 0; i < window.util.TOTAL_PINS; i++) {
      var ad = ads[i];

      var newPinTemplate = pinTemplate.cloneNode(true);
      newPinTemplate.querySelector('img').src = ad.author.avatar;
      newPinTemplate.querySelector('img').alt = ad.offer.title;
      newPinTemplate.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_MAIN_HEIGHT) + 'px;';

      // При клики на пин вызывается функция с проверкой на наличие существующих карточек объявлений в разметке, если их нет, тогда создается новая карточка и вставляется перед контейнером mapFilters
      newPinTemplate.addEventListener('click', function () {
        window.card.openCardAd(ad);
      });
      mapPins.appendChild(newPinTemplate);
    }
  };

  var onSuccess = function (ads) {
    createPin(ads);
  };

  var onError = function (errorMessage) {
    var newErrorTemplate = errorTemplate.cloneNode(true);
    newErrorTemplate.querySelector('.error__message').textContent = errorMessage;
    document.body.appendChild(newErrorTemplate);
    // console.log(errorMessage);
  };


  // Прохожу по каждому элементу массива объектов. Каждый полученный элемент массива передаю в функцию создания пина и добавляю этот пин в контейнер для пинов
  var renderPins = function (ads) {
    ads.forEach(function (ad) {
      mapPins.appendChild(createPin(ad));
    });
  };

  window.pin = {
    getCoordPinMain: getCoordPinMain,
    renderPins: renderPins,
    onSuccess: onSuccess,
    onError: onError
  };
})();
