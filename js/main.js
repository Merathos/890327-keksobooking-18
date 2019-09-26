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
var UserPin = {
  WIDTH: 50,
  HEIGHT: 70
};
var ANNOUNCMENT_AMOUNT = 8;
var KeyCodes = {
  ESC: 27,
  ENTER: 13
};
var PIN_TIP_HEIGHT = 19;
var HousingType = {
  FLAT: 'Квартира',
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};
var HousingTypeToPrice = {
  FLAT: '1000',
  BUNGALO: '0',
  HOUSE: '5000',
  PALACE: '10000'
};

var mapFilterContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('button');
var mainPin = map.querySelector('.map__pin--main');
var mapSection = document.querySelector('.map');
var newOfferForm = document.querySelector('.ad-form');
var submitBtn = newOfferForm.querySelector('.ad-form__submit');
var addressInput = newOfferForm.querySelector('#address');
var roomInput = newOfferForm.querySelector('#room_number');
var guestsInput = newOfferForm.querySelector('#capacity');
var timein = newOfferForm.querySelector('#timein');
var timeout = newOfferForm.querySelector('#timeout');
var appartmentType = newOfferForm.querySelector('#type');
var appartmentPrice = newOfferForm.querySelector('#price');

var isPageActive = false;

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

var renderCard = function (announcment) {
  var templateCard = document.querySelector('#card').content;
  var mapCard = templateCard.querySelector('.map__card');
  var itemCard = mapCard.cloneNode(true);
  var closeBtn = itemCard.querySelector('.popup__close');
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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCodes.ESC) {
      itemCard.remove();
    }
  };

  var closeCard = function () {
    itemCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  title.textContent = announcment.offer.title;

  address.textContent = announcment.offer.address;

  price.textContent = announcment.offer.price + '₽/ночь';

  type.textContent = HousingType[announcment.offer.type.toUpperCase()];

  roomsGuest.textContent = announcment.offer.rooms + ' комнаты для ' + announcment.offer.guests + ' гостей';

  checkInOut.textContent = 'Заезд после ' + announcment.offer.checkin + ', выезд до ' + announcment.offer.checkout;

  featureList.innerHTML = '';
  for (var i = 0; i < announcment.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    var featureClass = 'popup__feature popup__feature--' + announcment.offer.features[i];
    featureItem.className = featureClass;
    featureList.appendChild(featureItem);
  }

  description.textContent = announcment.offer.description;

  photos.innerHTML = '';
  for (i = 0; i < announcment.offer.photos.length; i++) {
    var photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.src = announcment.offer.photos[i];
    photoItem.width = 45;
    photoItem.height = 40;
    photoItem.alt = announcment.offer.title;
    photos.appendChild(photoItem);
  }

  avatar.src = announcment.author.avatar;
  document.addEventListener('keydown', onPopupEscPress);
  closeBtn.addEventListener('click', closeCard);

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

    var locationX = randomAnnouncmentsList[i].location.x + UserPin.WIDTH / 2 + 'px';
    var locationY = randomAnnouncmentsList[i].location.y + UserPin.HEIGHT + 'px';
    var pinCoordinates = 'left: ' + locationX + '; ' + 'top: ' + locationY + ';';
    pinElement.style.cssText = pinCoordinates;

    pinElement.addEventListener('click', function (card) {
      return function () {
        appendCard(card);
      };
    }(randomAnnouncmentsList[i]));

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

var appendCard = function (announcmentCard) {
  var cardItem = renderCard(announcmentCard);
  mapFilterContainer.insertAdjacentElement('beforebegin', cardItem);
};

var runScript = function () {
  var randomAnnouncmentsList = getRandomAnnouncments();
  var pins = renderPins(randomAnnouncmentsList);
  appendPins(pins);
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
    runScript();
  }
  isPageActive = true;
};

var getAddress = function () {
  var yPointer = isPageActive ? mainPin.offsetHeight + PIN_TIP_HEIGHT : mainPin.offsetHeight / 2;
  var xCoord = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2);
  var yCoord = Math.round(mainPin.offsetTop + yPointer);
  addressInput.value = xCoord + ', ' + yCoord;
};

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

var initPage = function () {
  deactivatePage();
  getAddress();
};

mainPin.addEventListener('mousedown', function () {
  activatePage();
  getAddress();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    activatePage();
    getAddress();
  }
});

roomInput.addEventListener('change', onRoomsOrGuestsInput);
guestsInput.addEventListener('change', onRoomsOrGuestsInput);
timein.addEventListener('change', syncTimeOut);
timeout.addEventListener('change', syncTimeIn);
appartmentType.addEventListener('change', getPriceForAppartment);
submitBtn.addEventListener('click', function () {
  onRoomsOrGuestsInput();
});

initPage();
