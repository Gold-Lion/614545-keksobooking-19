'use strict';

/**
 * План на вторую часть
 * 1) Сделать рефакторинг кода для функции которая блокирует форму  +++
 * 2) Попробывать переписать валидацию для проверки количества комнат и гостей +-
 * 3) Исправить ошибку с неотображением с первого раза данных по photos и features, если не получиться самостоятельно то написать на toster'е и приложить демку
 * 4) Проверить правильность разбиения кода на модули +++
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

      window.form.disabledState(isDisabled);
      window.pin.renderPins(window.data.getArrayAds());

      mapPinMain.removeEventListener('keydown', onPinMainEnterPress);
    }
  };

  var onPinMainEnterPress = function (evt) {
    window.util.isEnterEvent(evt, activeMap);
  };

  mapPinMain.addEventListener('keydown', onPinMainEnterPress);
  address.value = window.pin.getCoordPinMain(mapPinMain.style.left, mapPinMain.style.top);

  window.map = {
    activeMap: activeMap
  };
})();
