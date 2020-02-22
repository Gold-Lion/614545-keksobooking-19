'use strict';

(function () {
  var PIN_MAIN_WIDTH = 66;
  var PIN_MAIN_HEIGHT = 80;
  var MAP_WIDTH = 1200;
  var MIN_RANGE_X = -PIN_MAIN_WIDTH / 2;
  var MAX_RANGE_X = MAP_WIDTH - PIN_MAIN_WIDTH / 2;
  var MIN_RANGE_Y = 130 - PIN_MAIN_HEIGHT;
  var MAX_RANGE_Y = 630 - PIN_MAIN_HEIGHT;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');

  var getCoords = function (offset, shift, min, max) {
    var coord = offset - shift;

    if (coord >= max) {
      coord = max;
    } else if (coord <= min) {
      coord = min;
    }

    return coord;
  };

  var setCoords = function (bool) {
    return window.pin.getCoordPinMain(mapPinMain.style.left, mapPinMain.style.top, bool);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.util.isMouseButtonEvent(evt, window.map.activeMap);

    var isActive = true;
    address.value = setCoords(isActive);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordX = getCoords(mapPinMain.offsetLeft, shift.x, MIN_RANGE_X, MAX_RANGE_X);
      var coordY = getCoords(mapPinMain.offsetTop, shift.y, MIN_RANGE_Y, MAX_RANGE_Y);

      mapPinMain.style.left = coordX + 'px';
      mapPinMain.style.top = coordY + 'px';

      address.value = setCoords(isActive);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
