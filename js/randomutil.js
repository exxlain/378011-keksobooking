'use strict';

(function() {

    window.randomutil = {
        /*возвращает случайное целое число в указанном промежутке*/
        getRandomInteger: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min + 1);
        },

        /*возвращает случайный элемент массива*/
        getRandomElement: function (arr) {
            var rand = window.randomutil.getRandomInteger(0, arr.length - 1);
            return arr[rand];
        }
    };

})();
