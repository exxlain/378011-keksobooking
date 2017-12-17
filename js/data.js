'use strict';
(function () {

  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  /* создает массив удобств случайной длины не длиннее изначального массива удобств*/
  var createOfferFeaturesArray = function () {
    var arr = [];
    var lengthArray = window.randomutil.getRandomInteger(0, OFFER_FEATURES.length - 1);
    for (var i = 0; i <= lengthArray; i++) {
      arr.push(
          OFFER_FEATURES[i]
      );
    }
    return arr;
  };

  var OFFER_PHOTOS = [];

  /* создает массив  объектов заданной длины, описывающих похожие объявления неподалеку*/
  /*window.createOffersArray = function (lengthArray) {
    var arr = [];
    for (var i = 0; i < lengthArray; i++) {
      var coordX = window.randomutil.getRandomInteger(300, 900);
      var coordY = window.randomutil.getRandomInteger(100, 500);
      var autorAvatar = 'img/avatars/user0' + (i + 1) + '.png';
      arr.push({
        author: {
          avatar: autorAvatar,
        },
        offer: {
          title: OFFER_TITLES[i],
          address: coordX + ', ' + coordY,
          price: window.randomutil.getRandomInteger(1000, 1000000),
          type: window.randomutil.getRandomElement(OFFER_TYPES),
          rooms: window.randomutil.getRandomInteger(1, 5),
          guests: window.randomutil.getRandomInteger(1, 10),
          checkin: window.randomutil.getRandomElement(OFFER_CHECKINS),
          checkout: window.randomutil.getRandomElement(OFFER_CHECKOUTS),
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
  };*/

})();
