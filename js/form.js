'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_IMAGE_PREVIEW = 'img/muffin-grey.svg';
  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var priceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var HouseTypesAndPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    PALACE: 10000,
    HOUSE: 5000
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var resetFormBtn = adForm.querySelector('.ad-form__reset');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var formFilters = mapFilters.querySelector('.map__filters');
  var formRoomNumber = adForm.querySelector('#room_number');
  var selectGuest = adForm.querySelector('#capacity');
  var guestsOptions = selectGuest.querySelectorAll('option');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var avatar = adForm.querySelector('#avatar');
  var images = adForm.querySelector('#images');
  var typeOfHousing = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var address = adForm.querySelector('#address');
  var adFormPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhoto = document.querySelector('.ad-form__photo');
  var isDisabled = true;

  var setInitialPrice = function () {
    price.placeholder = HouseTypesAndPrices[typeOfHousing.value.toUpperCase()];
    return price;
  };

  var disabledAdForm = function (bool) {
    adForm.querySelectorAll('fieldset').forEach(function (fieldset) {
      fieldset.disabled = bool;
    });
  };

  var disabledFiltersForm = function (bool) {
    formFilters.querySelectorAll('select, fieldset').forEach(function (select) {
      select.disabled = bool;
    });
  };

  var disabledGuestOptions = function () {
    guestsOptions.forEach(function (option) {
      option.hidden = true;
    });
    guestsOptions[0].hidden = false;
  };

  var validateGuest = function () {
    var validGuestsOptions = roomsForGuestsMap[formRoomNumber.value];

    guestsOptions.forEach(function (option) {
      var index = validGuestsOptions.indexOf(option.value);
      if (index === -1) {
        option.hidden = true;
      } else {
        option.hidden = false;
      }
      if (index === 0) {
        option.selected = true;
      }
    });
  };

  var onRoomChange = function () {
    validateGuest();
  };

  var setDefPrice = function (minPrice) {
    price.placeholder = minPrice;
    price.min = minPrice;
  };

  var onTypeHouseChoosing = function (evt) {
    var value = evt.target.value;

    if (priceMap[value]) {
      return setDefPrice(priceMap[value]);
    }

    return setDefPrice(0);
  };

  var getFileExtension = function (str) {
    return str.slice(str.lastIndexOf('.') + 1);
  };

  var uploadImage = function (img, file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      if (img.tagName.toLowerCase() !== 'div') {
        img.src = reader.result;
      } else {
        img.style.backgroundSize = 'contain';
        img.style.backgroundRepeat = 'no-repeat';
        img.style.backgroundPosition = 'center';
        img.style.backgroundImage = 'url(' + reader.result + ')';
      }
    });
    reader.readAsDataURL(file);
  };

  var checkFileExtension = function (input, img) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      uploadImage(img, file);
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Вы пытаетесь загрузить файл форматом "' + getFileExtension(input.value) + '". Разрешенными форматами являются: ' + FILE_TYPES.join(', ') + '. Пожалуйста замените формат загружаемого файла.');
    }
  };

  var setInAndOutTime = function (time) {
    timeIn.value = time;
    timeOut.value = time;
  };

  var setDefaultValue = function () {
    window.pin.defaultCoordsPinMain();
    address.value = window.pin.getCoordPinMain(mapPinMain.style.left, mapPinMain.style.top);
    setInitialPrice();
    disabledGuestOptions();
    disabledAdForm(isDisabled);
    disabledFiltersForm(isDisabled);
  };

  var onSuccesMessage = function () {
    window.responseMessage.showSuccessMessage();
  };

  var onErrorMessage = function (errorMessage) {
    window.responseMessage.showErrorMessage(errorMessage);
  };

  var resetForm = function () {
    adForm.reset();
    formFilters.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.removePins();
    window.card.closeCardAd();
    adFormPreview.src = DEFAULT_IMAGE_PREVIEW;
    adFormPhoto.style = '';
    setDefaultValue();

    mapPinMain.addEventListener('keydown', window.map.onPinMainEnterPress);
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adForm), onSuccesMessage, onErrorMessage);
    window.responseMessage.preloaderBtnSubmit();
  });

  timeIn.addEventListener('change', function (evt) {
    setInAndOutTime(evt.target.value);
  });
  timeOut.addEventListener('change', function (evt) {
    setInAndOutTime(evt.target.value);
  });
  avatar.addEventListener('change', function () {
    checkFileExtension(avatar, adFormPreview);
  });
  images.addEventListener('change', function () {
    checkFileExtension(images, adFormPhoto);
  });
  formRoomNumber.addEventListener('change', onRoomChange);
  typeOfHousing.addEventListener('input', onTypeHouseChoosing);
  resetFormBtn.addEventListener('click', onResetClick);

  setDefaultValue();

  window.form = {
    disabledAdForm: disabledAdForm,
    disabledFiltersForm: disabledFiltersForm,
    resetForm: resetForm
  };
})();
