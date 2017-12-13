'use strict';

(function() {

    window.templateutil = {
        /*создает фрагмент для вставки */
        getFragment: function(arr, func) {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < arr.length; i++) {
                fragment.appendChild(func(arr[i]));
            }
            return fragment;
        },
        /*добавляет элемент в DOM*/
        appendToNode: function(node, fragment) {
            node.appendChild(fragment);
        }
    };

})();
