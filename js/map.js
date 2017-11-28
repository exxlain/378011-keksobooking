'use strict';
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
};
var getRandomElement = function (arr) {
    var rand = getRandomInteger(0, arr.length - 1);
    return arr[rand];
};

var createAvatarArray = function (lengthArray) {
    var arr = [];
    for (var i = 0; i <= lengthArray; i++) {
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


var createOffersArray = function (lengthArray) {
    var arr = [];
    for (var i = 1; i <= lengthArray; i++) {
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
var pinsElementTemplate = document.querySelector('template').content.querySelector('.map__pin');

var fillPin = function (pin) {
    var pinElement = pinsElementTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin img').src = pin.author.avatar;
    pinElement.style.left = pin.location.x - 20 + 'px';
    pinElement.style.top = pin.location.y - 40 + 'px';

    return pinElement;
};

var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(fillPin(arr[i]));
    }
    pinsListElement.appendChild(fragment);
};
renderPins(offers);

var mapFiltersElement = mapWindow.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var fillCard = function(card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.querySelector('.map__card h3').textContent = card.offer.title;
    cardElement.querySelector('.map__card p small').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').innerHTML = card.offer.price + '<span>&#x20bd;</span>' + '/ночь';

    var getOfferType = function (type) {
        var offerType = cardElement.querySelector('.map__card h4').textContent;
        switch (type) {
            case 'flat':
                offerType = 'Квартира';
                break;
            case 'house':
                offerType = 'Дом';
                break;
            case 'bungalo':
                offerType = 'Бунгало';
                break;
        }
    };
    getOfferType(card.offer.type);

    cardElement.querySelector('.map__card p:nth-of-type(3)').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('.map__card p:last-of-type').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';

    var renderFearures = function (arr) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < arr.length; i++) {
            var newLi = document.createElement('li');
            newLi.className = 'feature feature--' + arr[i];
            fragment.appendChild(newLi);
        }
        featuresList.appendChild(fragment);
    };
    renderFearures(card.offer.features);

    mapWindow.insertBefore(cardElement, mapFiltersElement);
};
fillCard(offers[1]);
