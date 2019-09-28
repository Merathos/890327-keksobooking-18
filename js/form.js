'use strict';

(function () {
  var HousingTypeToPrice = {
    FLAT: '1000',
    BUNGALO: '0',
    HOUSE: '5000',
    PALACE: '10000'
  };

  var submitBtn = window.map.newOfferForm.querySelector('.ad-form__submit');
  var roomInput = window.map.newOfferForm.querySelector('#room_number');
  var guestsInput = window.map.newOfferForm.querySelector('#capacity');
  var timein = window.map.newOfferForm.querySelector('#timein');
  var timeout = window.map.newOfferForm.querySelector('#timeout');
  var appartmentType = window.map.newOfferForm.querySelector('#type');
  var appartmentPrice = window.map.newOfferForm.querySelector('#price');

  var validateGuestsAndRooms = function () {
    var rooms = roomInput.value;
    var guests = guestsInput.value;

    switch (rooms) {
      case '1':
        if (guests === '1') {
          return '';
        }
        return '1 комната только для 1 гостя';
      case '2':
        if (guests === '1' || guests === '2') {
          return '';
        }
        return '2 комнаты только для 1 или 2 гостей';
      case '3':
        if (guests === '1' || guests === '2' || guests === '3') {
          return '';
        }
        return '3 комнаты только для 1, 2 или 3 гостей';
      case '100':
        if (guests === '0') {
          return '';
        }
        return '100 комнат не для гостей';
    }
    return '';
  };

  var syncTimeIn = function () {
    timein.value = timeout.value;
  };

  var syncTimeOut = function () {
    timeout.value = timein.value;
  };

  var onRoomsOrGuestsInput = function () {
    roomInput.setCustomValidity(validateGuestsAndRooms());
  };

  var getPriceForAppartment = function () {
    appartmentPrice.placeholder = HousingTypeToPrice[appartmentType.value.toUpperCase()];
    appartmentPrice.min = parseInt(HousingTypeToPrice[appartmentType.value.toUpperCase()], 10);
  };

  roomInput.addEventListener('change', onRoomsOrGuestsInput);
  guestsInput.addEventListener('change', onRoomsOrGuestsInput);
  timein.addEventListener('change', syncTimeOut);
  timeout.addEventListener('change', syncTimeIn);
  appartmentType.addEventListener('change', getPriceForAppartment);
  submitBtn.addEventListener('click', function () {
    onRoomsOrGuestsInput();
  });
})();
