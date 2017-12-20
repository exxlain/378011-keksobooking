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

    return pinElement;
  };


  window.displayItems = function (arr, action) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].classList[action]('hidden');
    }
  };
   var PIN_MAX_QUANTITY = 5;
  window.displayPins = function (arr, action) {
    for (var i = 0; i < PIN_MAX_QUANTITY; i++) {
     arr[i].classList[action]('hidden');
    }
  };

   window.render = function(data) {
     var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
     if(mapPins) {
       mapPins.forEach(function(el, i, arr) {
         pinsListElement.removeChild(el);
       });
     }
     var takeNumber = data.length;
     for(var i = 0; i < takeNumber; i++) {
      pinsListElement.appendChild(fillPin(data[i]));
     }
     var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
     window.displayItems(mapPins, 'add'); //спрятала все пины сразу после загрузки - при открытии страницы
   };


})();
