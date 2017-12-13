'use strict';
(function() {

    var offers = window.createOffersArray(8);

    var ENTER_KEYCODE = 13;
    var ESC_KEYCODE = 27;
    var mapWindow = document.querySelector('.map');
    var mapFiltersElement = mapWindow.querySelector('.map__filters-container');
    var noticeForm = document.querySelector('.notice__form');
    var mainPin = mapWindow.querySelector('.map__pin--main');
    var activeMapPin = null;
    var allFieldsets = noticeForm.querySelectorAll('fieldset');

    /*навешивает обработчик мыши на основной пин*/
    mainPin.addEventListener('mouseup', function() {
        onMainPinMouseup();
    });
    /*навешивает обработчик enter на основной пин*/
    mainPin.addEventListener('keydown', function(evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
            onMainPinMouseup();
        }
    });

    /*активирует форму и карту, показывает пины, добавляет им обработчики*/
    var onMainPinMouseup = function () {
        mapWindow.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        for (var i = 0; i < allFieldsets.length; i++) {
            allFieldsets[i].removeAttribute('disabled');
        }
        window.pinShow();
        var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
        /*добавляют события пинам*/
        mapPins.forEach(function(el, i) {
            el.addEventListener('mouseup', function(evt) {
                onPinMouseup(evt, offers[i]) // событие и нужный объект
            })
            el.addEventListener('keydown', function(evt) {
                if (evt.keyCode === ENTER_KEYCODE) {
                    onPinMouseup(evt, offers[i]) // событие и нужный объект
                }
            })
        });
    };
    /* отображение попапа*/
    var popupOpen = function (obj) {

        var cardElement = window.fillCard(obj);

        mapWindow.insertBefore(cardElement, mapFiltersElement);

        cardElement.querySelector('.popup__close').addEventListener('click', function() {
            popupClose(cardElement)
        });
        cardElement.querySelector('.popup__close').addEventListener('keydown', function(evt) {
            onCloseElementEnterPress(evt, cardElement)
        });
        document.addEventListener('keydown', function(evt) {
            onPopupEscPress(evt, document.querySelector('.popup'))
        });

    };
    /*активирует пин и вызывает попап*/
    var onPinMouseup = function (evt, obj) {
        var currentPopup = document.querySelector('.popup');
        if (currentPopup) {
            popupClose(currentPopup);
            activeMapPin.classList.remove('map__pin--active');
        }
        activeMapPin = evt.currentTarget;
        activeMapPin.classList.add('map__pin--active');
        popupOpen(obj);
    };


    /*закрывает попап*/
    var popupClose = function (currentOffer) {
        mapWindow.querySelector('.map__pin--active').classList.remove('map__pin--active');
        currentOffer.querySelector('.popup__close').removeEventListener('click', function() {
            popupClose(currentOffer)
        });
        currentOffer.querySelector('.popup__close').removeEventListener('keydown', function(evt) {
            onCloseElementEnterPress(evt, currentOffer)
        });
        document.removeEventListener('keydown', function(evt) {
            onPopupEscPress(evt, currentOffer)
        });
        mapWindow.removeChild(currentOffer);
    };
    /*обработчик enter на крестике*/
    var onCloseElementEnterPress = function(evt, currentOffer) {
        if (evt.keyCode === ENTER_KEYCODE) {
            popupClose(currentOffer);
        }
    };
    /*обработчик события закрытия попапа по esc*/
    var onPopupEscPress = function(evt, currentOffer) {
        if (evt.keyCode === ESC_KEYCODE) {
            popupClose(currentOffer);
        }
    };
})();
