'use strict';

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ANNOUNCMENT_AMOUNT = 8;

var mapFilterContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');

document.querySelector('.map').classList.remove('map--faded');

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
        type: APARTAMENT_TYPE[getRandomValue(0, APARTAMENT_TYPE.length)],
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

var renderCard = function (firstAnnouncment) {
  var templateCard = document.querySelector('#card').content;
  var mapCard = templateCard.querySelector('.map__card');
  var itemCard = mapCard.cloneNode(true);
  var title = itemCard.querySelector('.popup__title');
  var address = itemCard.querySelector('.popup__text--address');
  var price = itemCard.querySelector('.popup__text--price');
  var type = itemCard.querySelector('.popup__type');
  var roomsGuest = itemCard.querySelector('.popup__text--capacity');
  var checkInOut = itemCard.querySelector('.popup__text--time');
  var featureList = itemCard.querySelector('.popup__features');
  var description = itemCard.querySelector('.popup__description');
  var avatar = itemCard.querySelector('.popup__avatar');
  var photos = itemCard.querySelector('.popup__photos');

  title.textContent = firstAnnouncment.offer.title;

  address.textContent = firstAnnouncment.offer.address;

  price.textContent = firstAnnouncment.offer.price + '₽/ночь';

  switch (firstAnnouncment.offer.type) {
    case 'flat':
      type.textContent = 'Квартира';
      break;
    case 'bungalo':
      type.textContent = 'Бунгало';
      break;
    case 'house':
      type.textContent = 'Дом';
      break;
    case 'palace':
      type.textContent = 'Дворец';
      break;
  }

  roomsGuest.textContent = firstAnnouncment.offer.rooms + ' комнаты для ' + firstAnnouncment.offer.guests + ' гостей';

  checkInOut.textContent = 'Заезд после ' + firstAnnouncment.offer.checkin + ', выезд до ' + firstAnnouncment.offer.checkout;

  featureList.innerHTML = '';
  for (var i = 0; i < firstAnnouncment.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    var featureClass = 'popup__feature popup__feature--' + firstAnnouncment.offer.features[i];
    featureItem.className = featureClass;
    featureList.appendChild(featureItem);
  }

  description.textContent = firstAnnouncment.offer.description;

  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }

  for (i = 0; i < firstAnnouncment.offer.photos.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = firstAnnouncment.offer.photos[i];
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = firstAnnouncment.offer.title;
    photos.appendChild(photoItem);
  }

  avatar.src = firstAnnouncment.author.avatar;

  return itemCard;
};

var renderPins = function (randomAnnouncmentsList) {
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
    pinElement.style.cssText = pinCoordinates;

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

var appendCard = function (firstAnnouncment) {
  var cardItem = renderCard(firstAnnouncment);
  mapFilterContainer.insertAdjacentElement('beforebegin', cardItem);
};

var randomAnnouncmentsList = getRandomAnnouncments();
var firstAnnouncment = randomAnnouncmentsList[0];
var pins = renderPins(randomAnnouncmentsList);

appendPins(pins);
appendCard(firstAnnouncment);
