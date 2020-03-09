'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 80;
  var PIN_WIDTH = 50;
  var PIN_MAIN_TOP = document.querySelector('.map__pin--main').style.top;
  var PIN_MAIN_LEFT = document.querySelector('.map__pin--main').style.left;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var defaultCoordsPinMain = function () {
    mapPinMain.style.top = PIN_MAIN_TOP;
    mapPinMain.style.left = PIN_MAIN_LEFT;
  };

  var getCoordPinMain = function (left, top, bool) {
    var coordX = parseInt(left, 10) + mapPinMain.offsetWidth / 2;
    var coordY = parseInt(top, 10) + mapPinMain.offsetHeight / 2;

    if (bool) {
      coordY = parseInt(top, 10) + PIN_MAIN_HEIGHT;
    }

    var coords = Math.round(coordX) + ', ' + Math.round(coordY);

    return coords;
  };

  var setActivePin = function (pin) {
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (it) {
      it.classList.remove('map__pin--active');
    });
    pin.classList.add('map__pin--active');
  };

  var createPin = function (ad) {
    var newPinTemplate = pinTemplate.cloneNode(true);
    newPinTemplate.querySelector('img').src = ad.author.avatar;
    newPinTemplate.querySelector('img').alt = ad.offer.title;
    newPinTemplate.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_MAIN_HEIGHT) + 'px;';

    newPinTemplate.addEventListener('click', function (evt) {
      setActivePin(evt.currentTarget);
      window.card.openCardAd(ad);
    });

    return newPinTemplate;
  };

  var renderPins = function (ads) {
    var takeNumber = ads.length > window.util.TOTAL_PINS ? window.util.TOTAL_PINS : ads.length;
    removePins();

    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(createPin(ads[i]));
    }
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    defaultCoordsPinMain: defaultCoordsPinMain,
    getCoordPinMain: getCoordPinMain,
    renderPins: renderPins,
    createPin: createPin,
    removePins: removePins
  };
})();
