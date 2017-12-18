'use strict';

(function () {
  var PIN_MAX_QUANTITY = 5;

  window.templateutil = {
    /* создает фрагмент для вставки */
    getFragment: function (arr, func) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < Math.min(arr.length, PIN_MAX_QUANTITY); i++) {
        fragment.appendChild(func(arr[i]));
      }
      return fragment;
    },
    /* добавляет элемент в DOM*/
    appendToNode: function (node, fragment) {
      node.appendChild(fragment);
    }
  };

})();
