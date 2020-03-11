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

      window.form.disabledAd(isDisabled);
      window.backend.load(window.filter.onSuccess, window.responseMessage.showError);

      mapPinMain.removeEventListener('keydown', onPinMainEnterPress);
    }
  };

  var onPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, activeMap);
  };

  mapPinMain.addEventListener('keydown', onPinMainEnterPress);
  address.value = window.pin.getCoord(mapPinMain.style.left, mapPinMain.style.top);

  window.map = {
    active: activeMap,
    onPinMainEnterPress: onPinMainEnterPress
  };
})();
