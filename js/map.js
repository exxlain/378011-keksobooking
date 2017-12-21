'use strict';
(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_MAX_QUANTITY = 5;
  /* ограничения перемещения главного пина по высоте*/
  var MIN_Y = 100;
  var MAX_Y = 500;
  /* размеры главного пина*/
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_TAIL_HEIGHT = 22;
  var mapWindow = document.querySelector('.map');
  var mapFiltersElement = mapWindow.querySelector('.map__filters-container');
  var noticeForm = document.querySelector('.notice__form');
  var inputAddress = noticeForm.querySelector('#address');
  var mainPin = mapWindow.querySelector('.map__pin--main');
  var allFieldsets = noticeForm.querySelectorAll('fieldset');

  /* навешивает обработчик мыши на основной пин*/
  mainPin.addEventListener('mouseup', function () {
    onMainPinMouseup();
  });
  /* навешивает обработчик enter на основной пин*/
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinMouseup();
    }
  });
  /* обработчик enter на крестике*/
  var onCloseElementEnterPress = function (evt, currentOffer) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.popupClose(currentOffer);
    }
  };
  /* обработчик события закрытия попапа по esc*/
  var onPopupEscPress = function (evt, currentOffer) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.popupClose(currentOffer);
    }
  };
  /* функция для обработчика esc*/
  var handleEscListenerFunction = function (evt) {
    onPopupEscPress(evt, document.querySelector('.popup'));
  };
  /* отображение попапа*/
  var popupOpen = function (obj) {
    var cardElement = window.fillCard(obj);
    mapWindow.insertBefore(cardElement, mapFiltersElement);
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      window.popupClose(cardElement);
    });
    cardElement.querySelector('.popup__close').addEventListener('keydown', function (evt) {
      onCloseElementEnterPress(evt, cardElement);
    });
    document.addEventListener('keydown', handleEscListenerFunction);
  };

  /* навешивает обработчики на пины*/
  window.addPinsListeners = function (pins) {
    pins.forEach(function (el, j) {
      el.addEventListener('mouseup', function (evt) {
        window.show.showCard(evt, window.offers[j], popupOpen, window.popupClose);
      });
      el.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.show.showCard(evt, window.offers[j], popupOpen, window.popupClose);
        }
      });
    });
  };
  /* убирает класс hidden у пинов*/
  var displayPins = function (arr) {
    for (var i = 0; i < PIN_MAX_QUANTITY; i++) {
      arr[i].classList.remove('hidden');
    }
  };

  /* показывает пины и навешивает обработчики*/
  window.showPins = function () {
    var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
    displayPins(mapPins);
    window.addPinsListeners(mapPins);
  };

  /* активирует форму и карту, показывает пины*/
  var onMainPinMouseup = function () {
    mapWindow.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < allFieldsets.length; i++) {
      allFieldsets[i].removeAttribute('disabled');
    }
    window.showPins();
  };

  /* Перемещение главного пина*/
  /*  функция перемещения главного пина*/
  var onMainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };


      mainPin.style.left = currentCoords.x + 'px';
      if (currentCoords.y >= MIN_Y && currentCoords.y <= MAX_Y) {
        mainPin.style.top = currentCoords.y + 'px';
      }


      var addressX = Math.round(currentCoords.x - (MAIN_PIN_WIDTH / 2));
      var addressY = currentCoords.y - (MAIN_PIN_HEIGHT + MAIN_TAIL_HEIGHT);
      inputAddress.value = addressX + ', ' + addressY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /* обработчик перемещения главного пина*/
  mainPin.addEventListener('mousedown', onMainPinMousedown);


  /* закрывает попап*/
  window.popupClose = function (currentOffer) {
    var activeMapPin = mapWindow.querySelector('.map__pin--active');
    if (activeMapPin) {
      activeMapPin.classList.remove('map__pin--active');
    }
    currentOffer.querySelector('.popup__close').removeEventListener('click', function () {
      window.popupClose(currentOffer);
    });
    currentOffer.querySelector('.popup__close').removeEventListener('keydown', function (evt) {
      onCloseElementEnterPress(evt, currentOffer);
    });
    document.removeEventListener('keydown', handleEscListenerFunction);
    mapWindow.removeChild(currentOffer);
  };

})();
