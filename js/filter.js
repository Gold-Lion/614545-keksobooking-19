'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  // var housingPrice = document.querySelector('#housing-price');

  var updateData = function (ads) {
    var houseType = housingType.value;
    // var housePrice = housingPrice.value;

    var filterHouseType = ads.filter(function (ad) {
      return ad.offer.type === houseType;
    });
    if (houseType === 'any') {
      filterHouseType = ads;
    }

    // var filterHousePrice = filterHouseType.filter(function (ad) {
    //   var price;
    //   if (housePrice === 'middle') {
    //     price = ad.offer.price >= 100000 && ad.offer.price <= 500000;
    //   }
    //   return price;
    // });
    window.pin.renderPins(filterHouseType);
  };

  var onSuccess = function (data) {
    var ads = data.slice();

    window.pin.renderPins(ads);
    filtersForm.addEventListener('change', function () {
      window.card.closeCardAd();
      updateData(ads);
    });
  };

  window.filter = {
    onSuccess: onSuccess
  };
})();
