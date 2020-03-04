'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuest = filtersForm.querySelector('#housing-guests');

  var updateData = function (ads) {
    var houseType = housingType.value;
    var housePrice = housingPrice.value;
    var houseRooms = housingRooms.value;
    var houseGuest = housingGuest.value;
    var housingFeatures = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked')).map(function (it) {
      return it.value;
    });
    console.log('housingFeatures: ', housingFeatures);


    var filterHouse = ads.filter(function (ad) {
      if (houseType === 'any') {
        return ads;
      }
      return ad.offer.type === houseType;
    })
    .filter(function (ad) {
      var price;
      switch (housePrice) {
        case 'middle':
          price = ad.offer.price >= 10000 && ad.offer.price <= 50000;
          break;
        case 'low':
          price = ad.offer.price < 10000;
          break;
        case 'high':
          price = ad.offer.price > 50000;
          break;
        default:
          return ads;
      }
      return price;
    })
    .filter(function (ad) {
      var rooms;
      switch (houseRooms) {
        case '1':
          rooms = ad.offer.rooms === 1;
          break;
        case '2':
          rooms = ad.offer.rooms === 2;
          break;
        case '3':
          rooms = ad.offer.rooms === 3;
          break;
        default:
          return ads;
      }
      return rooms;
    })
    .filter(function (ad) {
      var guest;
      switch (houseGuest) {
        case '2':
          guest = ad.offer.guests === 2;
          break;
        case '1':
          guest = ad.offer.guests === 1;
          break;
        case '0':
          guest = ad.offer.guests === 0;
          break;
        default:
          return ads;
      }
      return guest;
    })
    .filter(function (ad) {
      return housingFeatures.every(function (it) {
        return ad.offer.features.includes(it);
      });
    });
    window.pin.renderPins(filterHouse);
  };

  var onSuccess = function (data) {
    var ads = data.slice();
    var isDisabled = false;

    var onFiltersFormChange = function () {
      window.card.closeCardAd();
      updateData(ads);
    };

    window.pin.renderPins(ads);
    window.form.disabledFiltersForm(isDisabled);
    filtersForm.addEventListener('change', window.debounce(onFiltersFormChange));
  };

  window.filter = {
    onSuccess: onSuccess
  };
})();
