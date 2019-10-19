'use strict';

(function () {
  var MAX_OFFERS = 5;
  var Prices = {
    LOW: 10000,
    HIGH: 50000
  };
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');

  var getFeatures = function (element) {
    var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) {
      return item.value;
    });
    return requiredFeatures.every(function (feature) {
      return element.offer.features.includes(feature);
    });
  };

  var getHousingType = function (element) {
    return element.offer.type === housingType.value || housingType.value === 'any';
  };

  var getHousingRooms = function (element) {
    return housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value;
  };

  var getHousingGuests = function (element) {
    return housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
  };

  var getPrice = function (element) {
    var isRequiredPrice;
    switch (housingPrice.value) {
      case 'middle':
        isRequiredPrice = (element > Prices.LOW) && (element < Prices.HIGH);
        break;
      case 'low':
        isRequiredPrice = (element < Prices.LOW);
        break;
      case 'high':
        isRequiredPrice = (element > Prices.HIGH);
        break;
      default:
        isRequiredPrice = true;
    }

    return isRequiredPrice;

  };

  var filterOffers = function (data) {
    return data
      .filter(function (element) {
        return (
          getHousingType(element) &&
          getFeatures(element) &&
          getHousingRooms(element) &&
          getHousingGuests(element) &&
          getPrice(element.offer.price)
        );
      })
      .slice(0, MAX_OFFERS);
  };

  filtersForm.addEventListener('change', window.debounce(function () {
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      elem.remove();
    });
    if (document.querySelector('.map__card')) {
      window.card.close();
    }
    window.map.appendPins(filterOffers(window.map.offers));
  }));


  window.filters = {
    sortOffers: filterOffers
  };
})();
