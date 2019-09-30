'use strict';

(function () {
  var PIN_TIP_HEIGHT = 19;
  var map = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var mapSection = document.querySelector('.map');
  var newOfferForm = document.querySelector('.ad-form');
  var addressInput = newOfferForm.querySelector('#address');
  var mapFilterContainer = document.querySelector('.map__filters-container');

  var isPageActive = false;
  var startCoords = {
    x: 0,
    y: 0
  };

  var activatePage = function () {
    mapSection.classList.remove('map--faded');
    newOfferForm.classList.remove('ad-form--disabled');
    newOfferForm.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    mapFilterContainer.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = false;
    });
    if (!isPageActive) {
      appendPins();
    }
    isPageActive = true;
  };

  var deactivatePage = function () {
    mapSection.classList.add('map--faded');
    newOfferForm.classList.add('ad-form--disabled');
    newOfferForm.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    mapFilterContainer.querySelectorAll('fieldset, input, select').forEach(function (elem) {
      elem.disabled = true;
    });
    isPageActive = false;
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentY = mainPin.offsetTop - shift.y;
    var currentX = mainPin.offsetLeft - shift.x;

    mainPin.style.top = Math.max(40, Math.min(620, currentY)) + 'px';
    mainPin.style.left = Math.max(0, Math.min(1135, currentX)) + 'px';
    getAddress();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    getAddress();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var dragHandler = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var getAddress = function () {
    var yPointer = isPageActive ? mainPin.offsetHeight + PIN_TIP_HEIGHT : mainPin.offsetHeight / 2;
    var xCoord = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    var yCoord = Math.round(mainPin.offsetTop + yPointer);
    addressInput.value = xCoord + ', ' + yCoord;
  };

  var appendPins = function () {
    var fragment = document.createDocumentFragment();
    var pins = window.pin.renderPins(window.randomAnnouncmentsList);

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(pins[i]);
    }
    map.appendChild(fragment);
  };

  var initPage = function () {
    deactivatePage();
    getAddress();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    activatePage();
    dragHandler(evt);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.card.KeyCodes.ENTER) {
      activatePage();
      dragHandler(evt);
    }
  });

  initPage();

  window.map = {
    newOfferForm: newOfferForm,
    mapFilterContainer: mapFilterContainer
  };
})();
