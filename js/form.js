'use strict';

(function () {
  var HouseTypesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelector('.map__filters-container');
  var formFilters = mapFilters.querySelector('.map__filters');
  var formRoomNumber = adForm.querySelector('#room_number');
  var selectGuest = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var avatar = adForm.querySelector('#avatar');
  var images = adForm.querySelector('#images');
  var typeOfHousing = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var address = adForm.querySelector('#address');
  var isDisabled = true;

  var setInitialPrice = function () {
    price.placeholder = HouseTypesPrices[typeOfHousing.value.toUpperCase()];
    return price;
  };

  var disabledState = function (bool) {
    adForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = bool;
    });

    formFilters.querySelectorAll('select, fieldset').forEach(function (select) {
      select.disabled = bool;
    });
  };

  // var ROOMS_FOR_GUESTS = {
  //   '1': ['1'],
  //   '2': ['2', '1'],
  //   '3': ['3', '2', '1'],
  //   '100': ['0']
  // };

  var ROOMS_FOR_GUESTS = {
    '1': ['1', '2', '3'],
    '2': ['2', '3'],
    '3': ['3'],
    '100': ['0', '1', '2']
    // '1': ['2', '3', '0'],
    // '2': ['3', '0'],
    // '3': ['0'],
    // '100': ['1', '2', '3']
  };
  var onChangeRoom = function () {
    var validGuestsOptions = ROOMS_FOR_GUESTS[formRoomNumber.value];
    var guestsOptions = selectGuest.querySelectorAll('option');

    guestsOptions.forEach(function (option) {
      option.hidden = true;
      option.selected = false;
      var index = validGuestsOptions.indexOf(option.value);
      if (index >= 0) {
        option.hidden = false;
        if (index === 0) {
          option.selected = true;
        }
      }
    });
  };
  onChangeRoom();

  // Написать валидацию, которая удаляет неподходящие элементы из селекта #capacity
  // var onChangeRoom = function () {
  //   if (formRoomNumber.value === '1' && selectGuest.value !== '1') {
  //     selectGuest.setCustomValidity('«1 комната» - «для 1 гостя»');
  //   } else if (formRoomNumber.value === '2' && (selectGuest.value !== '1' && selectGuest.value !== '2')) {
  //     selectGuest.setCustomValidity('«2 комнаты» - «для 2 гостей» или «для 1 гостя»');
  //   } else if (formRoomNumber.value === '3' && selectGuest.value === '0') {
  //     selectGuest.setCustomValidity('«3 комнаты» - «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  //   } else if (formRoomNumber.value === '100' && selectGuest.value !== '0') {
  //     selectGuest.setCustomValidity('«100 комнат» - «не для гостей»');
  //   } else {
  //     selectGuest.setCustomValidity('');
  //   }
  // };

  var onTypeHouseChoosing = function (evt) {
    var value = evt.target.value;
    var minPrice = HouseTypesPrices[value.toUpperCase()];

    switch (typeOfHousing.value) {
      case 'bungalo':
        price.placeholder = minPrice;
        price.min = minPrice;
        break;
      case 'flat':
        price.placeholder = minPrice;
        price.min = minPrice;
        break;
      case 'house':
        price.placeholder = minPrice;
        price.min = minPrice;
        break;
      case 'palace':
        price.placeholder = minPrice;
        price.min = minPrice;
        break;
    }
  };

  var getFileExtension = function (str) {
    return str.slice(str.lastIndexOf('.') + 1);
  };

  var checkFileExtension = function (input) {
    if (input.value.includes('.png') || input.value.includes('.jpeg') || input.value.includes('.jpg')) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Вы пытаетесь загрузить файл форматом "' + getFileExtension(input.value) + '". Разрешенными форматами являются: jpg и png. Пожалуйста замените формат загружаемого файла.');
    }
  };

  var setInAndOutTime = function (time) {
    timeIn.value = time;
    timeOut.value = time;
  };

  timeIn.addEventListener('change', function (evt) {
    setInAndOutTime(evt.target.value);
  });
  timeOut.addEventListener('change', function (evt) {
    setInAndOutTime(evt.target.value);
  });
  avatar.addEventListener('input', function () {
    checkFileExtension(avatar);
  });
  images.addEventListener('input', function () {
    checkFileExtension(images);
  });
  formRoomNumber.addEventListener('change', onChangeRoom);
  selectGuest.addEventListener('change', onChangeRoom);
  typeOfHousing.addEventListener('input', onTypeHouseChoosing);

  address.value = window.pin.getCoordPinMain();
  setInitialPrice();
  disabledState(isDisabled);

  window.form = {
    disabledState: disabledState
  };
})();
