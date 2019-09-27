'use strict';

(function () {
  var PIN_TIP_HEIGHT = 19;
  var map = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mapSection = document.querySelector('.map');
  window.newOfferForm = document.querySelector('.ad-form');
  var addressInput = window.newOfferForm.querySelector('#address');
  window.mapFilterContainer = document.querySelector('.map__filters-container');

  var isPageActive = false;

  var activatePage = function () {
    mapSection.classList.remove('map--faded');
    window.newOfferForm.classList.remove('ad-form--disabled');
    window.newOfferForm.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    window.mapFilterContainer.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    if (!isPageActive) {
      appendPins();
    }
    isPageActive = true;
  };

  var deactivatePage = function () {
    mapSection.classList.add('map--faded');
    window.newOfferForm.classList.add('ad-form--disabled');
    window.newOfferForm.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    window.mapFilterContainer.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    isPageActive = false;
  };

  var getAddress = function () {
    var yPointer = isPageActive ? mainPin.offsetHeight + PIN_TIP_HEIGHT : mainPin.offsetHeight / 2;
    var xCoord = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var yCoord = Math.round(mainPin.offsetTop + yPointer);
    addressInput.value = xCoord + ', ' + yCoord;
  };

  var appendPins = function () {
    var fragment = document.createDocumentFragment();
    var pins = window.renderPins(window.randomAnnouncmentsList);

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(pins[i]);
    }
    map.appendChild(fragment);
  };

  var initPage = function () {
    deactivatePage();
    getAddress();
  };

  mainPin.addEventListener('mousedown', function () {
    activatePage();
    getAddress();
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KeyCodes.ENTER) {
      activatePage();
      getAddress();
    }
  });

  initPage();
})();
