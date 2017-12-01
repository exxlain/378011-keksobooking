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
mapWindow.classList.remove('map--faded');

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
mapWindow.insertBefore(fillCard(offers[0]), mapFiltersElement);
