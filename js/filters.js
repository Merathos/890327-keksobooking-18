'use strict';

(function () {
  var MAX_OFFERS = 5;
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');

  function getHousingType(element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  }

  function filterOffers(data) {
    return data
      .filter(function (element) {
        return getHousingType(element);
      })
      .slice(0, MAX_OFFERS);
  }

  filtersForm.addEventListener('change', function () {
    if (document.querySelectorAll('.map__pin:not(.map__pin--main)')) {
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
        elem.remove();
      });
    }
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.map.appendPins(filterOffers(window.map.offers));
  });

  window.filters = {
    filterOffers: filterOffers
  };
})();
