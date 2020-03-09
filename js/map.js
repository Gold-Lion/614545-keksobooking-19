'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');


  var activeMap = function () {
    if (map.classList.contains('map--faded')) {
      var isDisabled = false;

      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.form.disabledAdForm(isDisabled);
      window.backend.load(window.filter.onSuccess, window.responseMessage.showErrorMessage);

      mapPinMain.removeEventListener('keydown', onPinMainEnterPress);
    }
  };

  var onPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, activeMap);
  };

  mapPinMain.addEventListener('keydown', onPinMainEnterPress);
  address.value = window.pin.getCoordPinMain(mapPinMain.style.left, mapPinMain.style.top);

  window.map = {
    activeMap: activeMap,
    onPinMainEnterPress: onPinMainEnterPress
  };
})();
