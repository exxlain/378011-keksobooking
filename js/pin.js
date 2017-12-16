'use strict';
(function () {
  var offers = window.createOffersArray(8);

  var mapWindow = document.querySelector('.map');
  var pinsListElement = mapWindow.querySelector('.map__pins');
  var templateElement = document.querySelector('template').content;
  var mapPinTemplate = templateElement.querySelector('.map__pin');
  var PIN_AMOUNT = 5;

  /* заполняет pin данными*/
  var fillPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.style.left = pin.location.x - 20 + 'px';
    pinElement.style.top = pin.location.y - 58 + 'px';

    return pinElement;
  };

  /* стиль обработчика ошибки*/
  var errorHandlerStyle = function (nodeName) {
    nodeName.style.zIndex = '100';
    nodeName.style.margin = '0 auto';
    nodeName.style.textAlign = 'center';
    nodeName.style.backgroundColor = 'red';
    nodeName.style.position = 'absolute';
    nodeName.style.left = 0;
    nodeName.style.right = 0;
    nodeName.style.fontSize = '30px';
  };

  /* обработчик успеха и ошибки*/
  window.pin = {
    successHandler: function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < PIN_AMOUNT; i++) {
        fragment.appendChild(fillPin(pins[i]));
      }
      pinsListElement.appendChild(fragment);
      return pinsListElement;
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      errorHandlerStyle(node);
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();
