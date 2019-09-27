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
    var cardItem = window.renderCard(announcmentCard);
    window.mapFilterContainer.insertAdjacentElement('beforebegin', cardItem);
  };

  window.renderPins = function (randomAnnouncmentsList) {
    var pins = [];

    randomAnnouncmentsList.forEach(function (element) {
      var pinElement = pinTemplate.cloneNode(true);

      var avatarUrl = element.author.avatar;
      pinElement.querySelector('img').setAttribute('src', avatarUrl);
      var offerTitle = element.offer.title;
      pinElement.querySelector('img').setAttribute('alt', offerTitle);
      var locationX = element.location.x + UserPin.WIDTH / 2 + 'px';
      var locationY = element.location.y + UserPin.HEIGHT + 'px';
      var pinCoordinates = 'left: ' + locationX + '; ' + 'top: ' + locationY + ';';
      pinElement.style.cssText = pinCoordinates;

      pinElement.addEventListener('click', function () {
        appendCard(element);
      });

      pins.push(pinElement);
    });

    return pins;
  };
})();
