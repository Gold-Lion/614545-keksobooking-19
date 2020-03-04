'use strict';

/**
 * План на вторую часть
 * 1) Попробывать переписать валидацию для проверки количества комнат и гостей +-
 * 2) Исправить ошибку с неотображением с первого раза данных по photos и features, если не получиться самостоятельно то написать на toster'е и приложить демку
 * 3) Разобрать с ошибкой клоннирования card.js
 */

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');


  var activeMap = function () { // Активируем карту
    if (map.classList.contains('map--faded')) {
      var isDisabled = false;

      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      // window.form.disabledState(isDisabled);
      window.form.disabledAdForm(isDisabled);
      window.backend.load(window.filter.onSuccess, window.responseMessage.onError);

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
