'use strict';
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
};
var getRandomElement = function (arr) {
    var rand = getRandomInteger(0, arr.length - 1);
    return arr[rand];
};

var createAvatarArray = function (lengthArray) {
    var AUTHOR_AVATAR = [];
    for (var i = 1; i <= lengthArray; i++) {
        AUTHOR_AVATAR.push(
            'img/avatars/user0' + i + '.png'
        );
    }
    return AUTHOR_AVATAR;
};
var AUTHOR_AVATAR = createAvatarArray(8);

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var createOfferFeaturesArray = function () {
    var OFFER_FEATURES_ARRAY = [];
    var lengthArray = getRandomInteger(0, 6);
    for (var i = 1; i <= lengthArray; i++) {
        OFFER_FEATURES_ARRAY.push(
            OFFER_FEATURES[i]
        );
    }
    return OFFER_FEATURES_ARRAY;
};
var OFFER_FEATURES_ARRAY = createOfferFeaturesArray();
var OFFER_PHOTOS = [];


var createOffersArray = function (lengthArray) {
    var offers = [];
    for (var i = 1; i <= lengthArray; i++) {
        var coordX = getRandomInteger(300, 900);
        var coordY = getRandomInteger(100, 500);
        offers.push({
            author: {
                avatar: AUTHOR_AVATAR[i],
            },
            offer: {
                title: OFFER_TITLE[i],
                address: 'location.' + coordX + ', location.' + coordY,
                price: getRandomInteger(1000, 1000000),
                type: getRandomElement(OFFER_TYPE),
                rooms: getRandomInteger(1, 5),
                guests: getRandomInteger(1, 10),
                checkin: getRandomElement(OFFER_CHECKIN),
                checkout: getRandomElement(OFFER_CHECKOUT),
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
    return offers;
};
var offers = createOffersArray(8);



var mapWindow = document.querySelector('.map');
mapWindow.classList.remove('map--faded');
var pinsListElement = mapWindow.querySelector('.map__pins');
var pinsElementTemplate = document.querySelector('#similar-offers-template').content.querySelector('.map__pin');
var renderPin = function(pin) {
    var pinElement = pinsElementTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin img').src = pin.author.avatar;
    pinElement.querySelector('.map__pin img').style.left = pin.location.x - 20 + 'px';
    pinElement.querySelector('.map__pin img').style.top = pin.location.y - 40 + 'px';

    return pinElement;
};


var fillFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
    }
    pinsListElement.appendChild(fragment);
};
fillFragment(offers);



var mapFiltersElement = mapWindow.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#similar-offers-template').content.querySelector('.map__card');

var renderCard = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.map__card h3').textContent = card.offer.title;
    cardElement.querySelector('.map__card p small').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').textContent = card.offer.price + String.fromCharCode('&#x20bd') + '/ночь';

    if (card.offer.type = 'flat') {
        cardElement.querySelector('.map__card h4').textContent = 'Квартира';
    } else if (card.offer.type = 'house') {
        cardElement.querySelector('.map__card h4').textContent = 'Дом';
    } else {
        cardElement.querySelector('.map__card h4').textContent = 'Бунгало';
    }

    cardElement.querySelector('.rooms__guests').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.checkin__checkout').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('.description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    mapWindow.insertBefore(cardElement, mapFiltersElement);
};
renderCard(offers[1]);
