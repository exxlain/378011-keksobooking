'use strict';

(function () {
  window.getFragment = function (arr, func) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(func(arr[i]));
    }
    return fragment;
  };

})();
