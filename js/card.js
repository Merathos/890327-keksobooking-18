'use strict';

(function () {
  var HousingType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var render = function (announcment) {
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
        closeCard();
      }
    };

    var closeCard = function () {
      itemCard.remove();
      document.removeEventListener('keydown', onPopupEscPress);
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
        if (el.classList.contains('map__pin--active')) {
          el.classList.remove('map__pin--active');
        }
      });
    };

    title.textContent = announcment.offer.title;

    address.textContent = announcment.offer.address;

    price.textContent = announcment.offer.price + '₽/ночь';

    type.textContent = HousingType[announcment.offer.type.toUpperCase()];

    roomsGuest.textContent = announcment.offer.rooms + ' комнаты для ' + announcment.offer.guests + ' гостей';

    checkInOut.textContent = 'Заезд после ' + announcment.offer.checkin + ', выезд до ' + announcment.offer.checkout;

    featureList.innerHTML = '';

    announcment.offer.features.forEach(function (el) {
      var featureItem = document.createElement('li');
      var featureClass = 'popup__feature popup__feature--' + el;
      featureItem.className = featureClass;
      featureList.appendChild(featureItem);
    });

    description.textContent = announcment.offer.description;

    photos.innerHTML = '';

    announcment.offer.photos.forEach(function (el) {
      var photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.src = el;
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = announcment.offer.title;
      photos.appendChild(photoItem);
    });

    avatar.src = announcment.author.avatar;
    document.addEventListener('keydown', onPopupEscPress);
    closeBtn.addEventListener('click', closeCard);

    return itemCard;
  };

  window.card = {
    KeyCodes: KeyCodes,
    render: render
  };
})();
