'use strict';

(function () {
  var activeMapPin = null;
  window.show = {
    showCard: function (evt, obj, callBackOpen, callBackClose) {
      var currentPopup = document.querySelector('.popup');
      if (currentPopup) {
        if (typeof callBackClose === 'function') {
          callBackClose(currentPopup);
          activeMapPin.classList.remove('map__pin--active');
        }
      }
      activeMapPin = evt.currentTarget;
      activeMapPin.classList.add('map__pin--active');

      if (typeof callBackOpen === 'function') {
        callBackOpen(obj);
      }
    }
  };

})();
