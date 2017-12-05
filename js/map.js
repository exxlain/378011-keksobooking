'use strict';

/*возвращает случайное целое число в указанном промежутке*/
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
};

/*возвращает случайный элемент массива*/
var getRandomElement = function (arr) {
    var rand = getRandomInteger(0, arr.length - 1);
    return arr[rand];
};

/*создает массив аватарок*/
var createAvatarArray = function (lengthArray) {
    var arr = [];
    for (var i = 1; i <= lengthArray; i++) {
        arr.push(
            'img/avatars/user0' + i + '.png'
        );
    }
    return arr;
};

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AUTHOR_AVATARS = createAvatarArray(OFFER_TITLES.length);
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/*создает массив удобств случайной длины не длиннее изначального массива удобств*/
var createOfferFeaturesArray = function () {
    var arr = [];
    var lengthArray = getRandomInteger(0, OFFER_FEATURES.length - 1);
    for (var i = 0; i <= lengthArray; i++) {
        arr.push(
            OFFER_FEATURES[i]
        );
    }
    return arr;
};

var OFFER_FEATURES_ARRAY = createOfferFeaturesArray();
var OFFER_PHOTOS = [];

/*создает массив  объектов заданной длины, описывающих похожие объявления неподалеку*/
var createOffersArray = function (lengthArray) {
    var arr = [];
    for (var i = 0; i < lengthArray; i++) {
        var coordX = getRandomInteger(300, 900);
        var coordY = getRandomInteger(100, 500);
        arr.push({
            author: {
                avatar: AUTHOR_AVATARS[i],
            },
            offer: {
                title: OFFER_TITLES[i],
                address: coordX + ' ' + coordY,
                price: getRandomInteger(1000, 1000000),
                type: getRandomElement(OFFER_TYPES),
                rooms: getRandomInteger(1, 5),
                guests: getRandomInteger(1, 10),
                checkin: getRandomElement(OFFER_CHECKINS),
                checkout: getRandomElement(OFFER_CHECKOUTS),
                features: createOfferFeaturesArray(),
                description: '',
                photos: OFFER_PHOTOS
            },

            location: {
                x: coordX,
                y: coordY
            }
        });
    }
    return arr;
};
var offers = createOffersArray(8);

var mapWindow = document.querySelector('.map');
var pinsListElement = mapWindow.querySelector('.map__pins');
var templateElement = document.querySelector('template').content;
var mapPinTemplate = templateElement.querySelector('.map__pin');
var mapCardTemplate = templateElement.querySelector('.map__card');

/*заполняет pin данными*/
var fillPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.style.left = pin.location.x - 5 + 'px';
    pinElement.style.top = pin.location.y - 39 + 'px';

    return pinElement;
};

/*создает фрагмент для вставки */
var getFragment = function (arr, func) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(func(arr[i]));
    }
    return fragment;
};

/*добавляет элемент в DOM*/
var appendToNode = function (node, fragment) {
    node.appendChild(fragment);
};

appendToNode(pinsListElement, getFragment(offers, fillPin));

/*создает элемент*/
var createFeature = function (feature) {
    var newLi = document.createElement('li');
    newLi.className = 'feature feature--' + feature;
    return newLi;
};

/*заменяет ангийский на русский в названии удобства*/
var getOfferType = function (type) {
    switch (type) {
        case 'flat':
            return 'Квартира';
            break;
        case 'house':
            return 'Дом';
            break;
        case 'bungalo':
            return 'Бунгало';
            break;
    }
};

/*заполняет карточку данными*/
var fillCard = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.querySelector('h3').textContent = card.offer.title;
    cardElement.querySelector('p small').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').innerHTML = card.offer.price + '<span>&#x20bd;</span>' + '/ночь';
    cardElement.querySelector('h4').textContent = getOfferType(card.offer.type);
    cardElement.querySelector('p:nth-of-type(3)').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('p:last-of-type').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var FeaturePlace = cardElement.querySelector('.popup__features');
    FeaturePlace.innerHTML = '';
    var featureFragment = getFragment(card.offer.features, createFeature);
    FeaturePlace.appendChild(featureFragment);

    return cardElement;
};

var mapFiltersElement = mapWindow.querySelector('.map__filters-container');

/*создает все карточки объявлений*/
var allCardGenerate = function () {
    for (var i = 0; i < offers.length; i++) {
        mapWindow.insertBefore(fillCard(offers[i]), mapFiltersElement);
    }
};
allCardGenerate();

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var noticeForm = document.querySelector('.notice__form');
var mainPin = mapWindow.querySelector('.map__pin--main');
var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
var popups = document.querySelectorAll('.map__card');
var activeMapPin = null;
var closeElements = document.querySelectorAll('.popup__close');
var allFieldsets = noticeForm.querySelectorAll('fieldset');

/*управляет отображением элементов(пины или карточки)*/
var displayItems = function (arr, condition) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].style.visibility = condition;
    }
};
displayItems(mapPins, 'hidden');
displayItems(popups, 'hidden');

/*активирует форму и карту, показывает пины*/
var onMainPinMouseup = function () {
    mapWindow.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    displayItems(mapPins, 'visible');
    for (var i = 0; i < allFieldsets.length; i++) {
        allFieldsets[i].removeAttribute('disabled');
    }
};
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

/* отображение попапа*/
var openPopup = function () {
    for (var i = 0; i < mapPins.length; i++) {
        if (mapPins[i].classList.contains('map__pin--active')) {
            popups[i].style.visibility = 'visible';
            closeElements[i].addEventListener('click', popupClose);
            closeElements[i].addEventListener('keydown', onCloseElementEnterPress);
        }
    }
    document.addEventListener('keydown', onPopupEscPress);
};

/*активирует пин и вызывает попап*/
var onPinMouseup = function (evt) {
    if (activeMapPin) {
        activeMapPin.classList.remove('map__pin--active');
    }
    activeMapPin = evt.currentTarget;
    activeMapPin.classList.add('map__pin--active');
    openPopup();
};

/*закрывает попап*/
var popupClose = function () {
    for (var i = 0; i < popups.length; i++) {
        if (popups[i].style.visibility = 'visible') {
            mapPins[i].classList.remove('map__pin--active');
            popups[i].style.visibility = 'hidden';
            closeElements[i].removeEventListener('click', popupClose);
            closeElements[i].removeEventListener('keydown', onCloseElementEnterPress);
        }
    }
    document.removeEventListener('keydown', onPopupEscPress);
};

/*обработчик enter на пине*/
var onPinEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        onPinMouseup(evt);
    }
};
/*обработчик enter на крестике*/
var onCloseElementEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        popupClose();
    }
};
/*обработчик события закрытия попапа по esc*/
var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        popupClose();
    }
};

/*навешивает обработчики на элементы*/
var allElementsAction = function (arr, action, func) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener(action, func);
    }
};
/*навешивает обработчик мыши на все пины*/
allElementsAction(mapPins, 'mouseup', onPinMouseup);

/*навешивает обработчик enter на все пины*/
allElementsAction(mapPins, 'keydown', onPinEnterPress);


