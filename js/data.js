'use strict';

(function () {
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_IN_AND_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = [];
  var PHOTO_URLS = [];
  // var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  // var PHOTO_URLS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
  // ];
  var TOTAL_PINS = 8;
  var PIN_WIDTH = 50;
  var MAP_WIDTH = 1200;
  var MIN_X = 0;
  var MAX_X = MAP_WIDTH - PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;

  // Создаю один шаблон объекта с данными нашего объявления и возвращаю это объявление
  var createAd = function (number) { // Создаем объект объявления
    var ad = {
      author: {
        avatar: window.util.getAvatar(number)
      },
      offer: {
        title: 'Заголовок ' + number + '-го предложения',
        address: window.util.getRandomNumber(0, 650) + ', ' + window.util.getRandomNumber(0, 350),
        price: window.util.getRandomNumber(0, 1000),
        type: window.util.getRandomElementArr(HOUSE_TYPES),
        rooms: window.util.getRandomNumber(0, 7),
        guests: window.util.getRandomNumber(1, 15),
        checkin: window.util.getRandomElementArr(TIME_IN_AND_OUT),
        checkout: window.util.getRandomElementArr(TIME_IN_AND_OUT),
        features: window.util.getRandomLengthArr(FEATURES),
        description: 'строка с описанием предложенного объявления',
        photos: window.util.getRandomLengthArr(PHOTO_URLS)
      },
      location: {
        x: window.util.getRandomNumber(MIN_X, MAX_X),
        y: window.util.getRandomNumber(MIN_Y, MAX_Y)
      }
    };

    return ad;
  };

  // Из полученного шаблона создаю функцию которая возвращает массив объектов объявлений
  var getArrayAds = function () { // Получаем массив объектов объявлений
    var ads = [];

    for (var i = 1; i <= TOTAL_PINS; i++) {
      ads.push(createAd(i));
    }

    return ads;
  };

  window.data = {
    getArrayAds: getArrayAds
  };
})();
