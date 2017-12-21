'use strict';
(function () {
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
    pinElement.classList.add('hidden');

    return pinElement;
  };


  window.render = function (data) {
    var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPins) {
      mapPins.forEach(function (el) {
        pinsListElement.removeChild(el);
      });
    }
    var takeNumber = data.length;
    for (var i = 0; i < takeNumber; i++) {
      pinsListElement.appendChild(fillPin(data[i]));
    }
  };


})();
