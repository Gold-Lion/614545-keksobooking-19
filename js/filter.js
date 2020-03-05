'use strict';

(function () {
  var NO_FILTER = 'any';
  var housingPriceMap = {
    Range: {
      MIDDLE: 'middle',
      LOW: 'low',
      HIGH: 'high'
    },
    RangeValue: {
      LOW: 10000,
      HIGH: 50000
    }
  };
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuest = filtersForm.querySelector('#housing-guests');

  var updateData = function (ads) {
    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuest.value;
    var featuresValue = Array.from(filtersForm.querySelectorAll('.map__checkbox:checked')).map(function (it) {
      return it.value;
    });

    var filterHouse = ads.filter(function (ad) {
      if (typeValue === NO_FILTER) {
        return true;
      }
      return ad.offer.type === typeValue;
    })
    .filter(function (ad) {
      switch (priceValue) {
        case housingPriceMap.Range.MIDDLE:
          return ad.offer.price >= housingPriceMap.RangeValue.LOW && ad.offer.price <= housingPriceMap.RangeValue.HIGH;
        case housingPriceMap.Range.LOW:
          return ad.offer.price < housingPriceMap.RangeValue.LOW;
        case housingPriceMap.Range.HIGH:
          return ad.offer.price > housingPriceMap.RangeValue.HIGH;
        default:
          return true;
      }
    })
    .filter(function (ad) {
      if (roomsValue === NO_FILTER) {
        return true;
      }
      return ad.offer.rooms === +roomsValue;
    })
    .filter(function (ad) {
      if (guestsValue === NO_FILTER) {
        return true;
      }
      return ad.offer.guests === +guestsValue;
    })
    .filter(function (ad) {
      return featuresValue.every(function (it) {
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
