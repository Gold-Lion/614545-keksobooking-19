'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

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
  var createPin = function (ad) {
    var newPinTemplate = templatePin.cloneNode(true);
    newPinTemplate.querySelector('img').src = ad.author.avatar;
    newPinTemplate.querySelector('img').alt = ad.offer.title;
    newPinTemplate.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';

    // При клики на пин вызывается функция с проверкой на наличие существующих карточек объявлений в разметке, если их нет, тогда создается новая карточка и вставляется перед контейнером mapFilters
    newPinTemplate.addEventListener('click', function () {
      window.card.openCardAd(ad);
    });

    return newPinTemplate;
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
  };
})();
