'use strict';
(function () {
  window.synchronizeFields = function (element1, element2, arr1, arr2, callBack) {
    var index = arr1.indexOf(element1.value);
    var value = arr2[index];
    if (typeof callBack === 'function') {
      callBack(element2, value);
    }
  };
})();
