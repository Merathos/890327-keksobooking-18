'use strict';

(function () {
  var APARTAMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_AND_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 560;
  var LOCATION_X_MIN = 100;
  var LOCATION_X_MAX = 1100;
  var MIN_PRICE = 10000;
  var MAX_PRICE = 80000;
  var ANNOUNCMENT_AMOUNT = 8;

  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getArrayWithRandomLenght = function (arr) {
    var result = [];
    var arrayLength = getRandomValue(1, arr.length);

    for (var i = 0; i < arrayLength; i++) {
      result.push(arr[i]);
    }
    return result;
  };

  var getRandomAnnouncments = function () {
    var randomAnnouncmentsList = [];

    for (var i = 1; i <= ANNOUNCMENT_AMOUNT; i++) {
      var randomAnnouncment = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },

        offer: {
          title: 'Объявление о продаже',
          address: getRandomValue(LOCATION_X_MIN, LOCATION_X_MAX) + ', ' + getRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX),
          price: getRandomValue(MIN_PRICE, MAX_PRICE),
          type: APARTAMENT_TYPE[getRandomValue(0, APARTAMENT_TYPE.length - 1)],
          rooms: getRandomValue(0, 4),
          guests: getRandomValue(0, 4),
          checkin: CHECKIN_AND_CHECKOUT_TIME[getRandomValue(0, CHECKIN_AND_CHECKOUT_TIME.length - 1)],
          checkout: CHECKIN_AND_CHECKOUT_TIME[getRandomValue(0, CHECKIN_AND_CHECKOUT_TIME.length - 1)],
          features: getArrayWithRandomLenght(FEATURES),
          description: 'Описание объявления',
          photos: getArrayWithRandomLenght(APARTAMENT_PHOTO)
        },

        location: {
          x: getRandomValue(LOCATION_X_MIN, LOCATION_X_MAX),
          y: getRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
        }
      };
      randomAnnouncmentsList.push(randomAnnouncment);
    }
    return randomAnnouncmentsList;
  };

  window.randomAnnouncmentsList = getRandomAnnouncments();
})();
