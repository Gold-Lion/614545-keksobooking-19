'use strict';

(function () {
  var TOTAL_PINS = 5;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_MOUSE_BUTTON = 0;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var isMouseButtonEvent = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElementArr = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  var getAvatar = function (number) {
    return 'img/avatars/user' + (number < 10 ? '0' + number : number) + '.png';
  };

  var getRandomLengthArr = function (arr) {
    return arr.slice(0, arr.indexOf(getRandomElementArr(arr)) + 1);
  };

  window.util = {
    TOTAL_PINS: TOTAL_PINS,
    getRandomNumber: getRandomNumber,
    getRandomElementArr: getRandomElementArr,
    getRandomLengthArr: getRandomLengthArr,
    getAvatar: getAvatar,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMouseButtonEvent: isMouseButtonEvent
  };
})();
