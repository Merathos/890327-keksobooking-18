'use strict';

(function () {
  var MAX_OFFERS = 5;
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');

  var getMatch = function (source, target) {
    var isInclude = true;
    for (var i = 0; i < source.length; i++) {
      if (!(source.includes(target[i]))) {
        isInclude = false;
      }
    }
    return isInclude;
  };

  var getFeatures = function (availableFeatures) {
    var features = housingFeatures.querySelectorAll('input:checked');
    var requiredFeatures = [];
    for (var i = 0; i < features.length; i++) {
      requiredFeatures.push(features[i].value);
    }
    return getMatch(availableFeatures, requiredFeatures);
  };

  function getHousingType(element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  }

  function getHousingRooms(element) {
    return housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value;
  }

  function getHousingGuests(element) {
    return housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
  }

  var getPrice = function (element) {
    var isRequiredPrice;
    switch (housingPrice.value) {
      case 'middle':
        isRequiredPrice = (element > 10000) && (element < 50000);
        break;
      case 'low':
        isRequiredPrice = (element < 1000);
        break;
      case 'high':
        isRequiredPrice = (element > 50000);
        break;
      default:
        isRequiredPrice = true;
    }

    return isRequiredPrice;

  };

  function filterOffers(data) {
    return data
      .filter(function (element) {
        return (
          getHousingType(element) &&
          getFeatures(element.offer.features) &&
          getHousingRooms(element) &&
          getHousingGuests(element) &&
          getPrice(element.offer.price)
        );
      })
      .slice(0, MAX_OFFERS);
  }

  filtersForm.addEventListener('change', window.debounce(function () {
    if (document.querySelectorAll('.map__pin:not(.map__pin--main)')) {
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
        elem.remove();
      });
    }
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.map.appendPins(filterOffers(window.map.offers));
  }));


  window.filters = {
    filterOffers: filterOffers
  };
})();
