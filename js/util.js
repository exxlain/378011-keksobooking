'use strict';

(function () {
  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    }
  };
})();
