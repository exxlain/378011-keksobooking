'use strict';
(function () {
  var offers = window.createOffersArray(8);

  var mapWindow = document.querySelector('.map');
  var pinsListElement = mapWindow.querySelector('.map__pins');
  var templateElement = document.querySelector('template').content;
  var mapPinTemplate = templateElement.querySelector('.map__pin');

  /* заполняет pin данными*/
  var fillPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.style.left = pin.location.x - 20 + 'px';
    pinElement.style.top = pin.location.y - 58 + 'px';

    return pinElement;
  };

  /* генерирует пины*/
  var pins = window.templateutil.getFragment(offers, fillPin);


  /* отображает пины*/
  window.pinShow = function () {
    window.templateutil.appendToNode(pinsListElement, pins);
  };

})();
