'use strict';

document.querySelector('.map').classList.remove('map--faded');

var APARTAMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_AND_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 560;
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 1100;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var randomAnnouncmentsList = [];

var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');

var getRandomValue = function (min, max) {
  var result = Math.random() * (max - min) + min;
  return Math.floor(result);
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
  for (var i = 1; i <= 8; i++) {
    var randomAnnouncment = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      offer: {
        title: 'Объявление о продаже',
        address: '600, 350',
        price: 19999,
        type: APARTAMENT_TYPE[getRandomValue(0, APARTAMENT_TYPE.length)],
        rooms: getRandomValue(0, 4),
        guests: getRandomValue(0, 4),
        checkin: CHECKIN_AND_CHECKOUT_TIME[getRandomValue(0, CHECKIN_AND_CHECKOUT_TIME.length)],
        checkout: CHECKIN_AND_CHECKOUT_TIME[getRandomValue(0, CHECKIN_AND_CHECKOUT_TIME.length)],
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

var renderPins = function () {
  var pins = [];

  for (var i = 0; i < randomAnnouncmentsList.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    var avatarUrl = randomAnnouncmentsList[i].author.avatar;
    pinElement.querySelector('img').setAttribute('src', avatarUrl);

    var offerTitle = randomAnnouncmentsList[i].offer.title;
    pinElement.querySelector('img').setAttribute('alt', offerTitle);

    var locationX = randomAnnouncmentsList[i].location.x + PIN_WIDTH / 2 + 'px';
    var locationY = randomAnnouncmentsList[i].location.y + PIN_HEIGHT + 'px';
    var pinCoordinates = 'left: ' + locationX + '; ' + 'top: ' + locationY + ';';
    pinElement.setAttribute('style', pinCoordinates);

    pins.push(pinElement);
  }
  return pins;
};

var appendPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
  }
  map.appendChild(fragment);
};

getRandomAnnouncments();
var pins = renderPins();
appendPins(pins);
