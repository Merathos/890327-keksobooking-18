'use strict';

(function () {
  var UserPin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');

  var appendCard = function (announcmentCard) {
    var cardItem = window.card.render(announcmentCard);
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.map.filterContainer.insertAdjacentElement('beforebegin', cardItem);
  };

  var renderPins = function (randomAnnouncmentsList) {
    var pins = [];
    randomAnnouncmentsList.forEach(function (element) {
      var pinElement = pinTemplate.cloneNode(true);

      var avatarUrl = element.author.avatar;
      pinElement.querySelector('img').setAttribute('src', avatarUrl);
      var offerTitle = element.offer.title;
      pinElement.querySelector('img').setAttribute('alt', offerTitle);
      var locationX = element.location.x + UserPin.WIDTH / 2 + 'px';
      var locationY = element.location.y + UserPin.HEIGHT + 'px';
      pinElement.style.cssText = 'left: ' + locationX + '; ' + 'top: ' + locationY + ';';

      pinElement.addEventListener('click', function () {
        document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
          if (el.classList.contains('map__pin--active')) {
            el.classList.remove('map__pin--active');
          }
        });
        appendCard(element);
        pinElement.classList.add('map__pin--active');
      });

      pins.push(pinElement);
    });

    return pins;
  };

  window.pin = {
    render: renderPins
  };
})();
