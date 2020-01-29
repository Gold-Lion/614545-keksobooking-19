'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12: 00', '13: 00', '14: 00'];
var TOTAL_PINS = 8;
var PIN_WIDTH = 50;
var MAP_WIDTH = 1200;
var MIN_X = 0;
var MAX_X = MAP_WIDTH - PIN_WIDTH;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

var activeMap = function () {
  map.classList.remove('map--faded');
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

var createAd = function (number) {
  var ad = {
    author: {
      avatar: getAvatar(number)
    },
    offer: {
      title: 'Заголовок ' + number + '-го предложения',
      address: '600, 350',
      price: getRandomNumber(0, 1000),
      type: getRandomElementArr(HOUSE_TYPES),
      rooms: getRandomNumber(0, 7),
      guests: getRandomNumber(1, 15),
      checkin: getRandomElementArr(CHECKIN_TIME),
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'строка с описанием',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    }
  };

  return ad;
};

var getRandomAds = function (total) {
  var ads = [];

  for (var i = 1; i <= total; i++) {
    ads.push(createAd(i));
  }

  return ads;
};

var renderPin = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < TOTAL_PINS; i++) {
    var ad = ads[i];

    var newPinTemplate = templatePin.cloneNode(true);
    newPinTemplate.querySelector('img').src = ad.author.avatar;
    newPinTemplate.querySelector('img').alt = ad.offer.title;
    newPinTemplate.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';
    fragment.appendChild(newPinTemplate);
  }

  pinList.appendChild(fragment);
};

renderPin(getRandomAds(TOTAL_PINS));
activeMap();
