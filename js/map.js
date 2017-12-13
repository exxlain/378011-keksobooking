'use strict';
(function() {

    var offers = window.createOffersArray(8);

    var ENTER_KEYCODE = 13;
    var ESC_KEYCODE = 27;
    var mapWindow = document.querySelector('.map');
    var mapFiltersElement = mapWindow.querySelector('.map__filters-container');
    var noticeForm = document.querySelector('.notice__form');
    var inputAddress = noticeForm.querySelector('#address');
    var mainPin = mapWindow.querySelector('.map__pin--main');
    var activeMapPin = null;
    var allFieldsets = noticeForm.querySelectorAll('fieldset');
    var pinsOverlay = document.querySelector('.map__pinsoverlay');

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

/* перемещение главного пина*/
/*ограничения перемещения главного пина по высоте*/
var minY = 100;
var maxY = 500;
/*размер хвостика главного пина*/
var MAIN_TAIL_HEIGHT = 22;

/* Функция для определения координат острого кончика главного пина*/
var getCoordinates = function (element, container) {
    var elementBox = element.getBoundingClientRect();
    var overlayBox = container.getBoundingClientRect();
    return Math.round((elementBox.left - overlayBox.left + elementBox.width / 2)) + ', ' + Math.round((elementBox.bottom + pageYOffset + MAIN_TAIL_HEIGHT));
};

/*внесение координат в поле адрес*/
var getAddress = function () {
    inputAddress.value = getCoordinates(mainPin, pinsOverlay);
};

/*  функция перемещения главного пина*/
var onMainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX,
        y: evt.clientY
    };
    var onMouseMove = function(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        if ((mainPin.offsetTop - shift.y) >=
            (minY) && (mainPin.offsetTop - shift.y) <= (maxY)) {
            mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }
    };
    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        getAddress();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

/*перемещение главного пина*/
mainPin.addEventListener('mousedown', onMainPinMousedown);
})();
