'use strict';
(function () {

  var templateElement = document.querySelector('template').content;
  var mapCardTemplate = templateElement.querySelector('.map__card');
  var mapWindow = document.querySelector('.map');
   var mapFiltersElement = mapWindow.querySelector('.map__filters-container');

  /* создает элемент feature*/
 var createFeature = function (feature) {
    var newLi = document.createElement('li');
    newLi.className = 'feature feature--' + feature;
    return newLi;
  };
    /* создает элемент picture*/
 var createPicture = function (picture) {
    var newLi = document.createElement('li');
    newLi.innerHTML = '<img src="' + picture + '">';
    return newLi;
  };

  /* заменяет английский на русский в названии удобства*/
  var getOfferType = function (type) {
    var offerType;
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
    return offerType;
  };


  /* заполняет карточку данными*/
    window.fillCard = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    cardElement.querySelector('h3').textContent = card.offer.title;
    cardElement.querySelector('p small').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').innerHTML = card.offer.price + '<span>&#x20bd;</span>' + '/ночь';
    cardElement.querySelector('h4').textContent = getOfferType(card.offer.type);
    cardElement.querySelector('p:nth-of-type(3)').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('p:last-of-type').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var featurePlace = cardElement.querySelector('.popup__features');
    featurePlace.innerHTML = '';
    var featureFragment = window.templateutil.getFragment(card.offer.features, createFeature);
    featurePlace.appendChild(featureFragment);

    var pictirePlace = cardElement.querySelector('.popup__pictures');
    pictirePlace.innerHTML = '';
/*
    var pictureFragment = window.templateutil.getFragment(card.offer.photos, createPicture);
    pictirePlace.appendChild(pictureFragment);
*/
      return cardElement;
  };


  /* стиль обработчика ошибки*/
  var errorHandlerStyle = function (nodeName) {
    nodeName.style.zIndex = '100';
    nodeName.style.margin = '0 auto';
    nodeName.style.textAlign = 'center';
    nodeName.style.backgroundColor = 'red';
    nodeName.style.position = 'absolute';
    nodeName.style.left = 0;
    nodeName.style.right = 0;
    nodeName.style.fontSize = '30px';
  };

  /* обработчик успеха и ошибки*/
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    errorHandlerStyle(node);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.displayItems = function (arr, condition) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].style.visibility = condition;
    }
  };



  var successHandler = function (data) {
    var cardElement = window.templateutil.getFragment(data, fillCard);
    mapWindow.insertBefore(cardElement, mapFiltersElement);
 /*   var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.displayItems(mapPins, 'hidden');*/
  };

  window.backend.load(successHandler, errorHandler);


})();
