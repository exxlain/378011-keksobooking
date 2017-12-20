'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var filterWifi = housingFeatures.querySelector('#filter-wifi');
  var filterDishwasher = housingFeatures.querySelector('#filter-dishwasher');
  var filterParking = housingFeatures.querySelector('#filter-parking');
  var filterWasher = housingFeatures.querySelector('#filter-washer');
  var filterElevator = housingFeatures.querySelector('#filter-elevator');
  var filterConditioner = housingFeatures.querySelector('#filter-conditioner');

  var typeValue;
  var priceValue;
  var roomsValue;
  var guestsValue;
  var wifiValue;
  var dishwasherValue;
  var parkingValue;
  var washerValue;
  var elevatorValue;
  var conditionerValue;

  /* получение значения интервала для цены*/
  var getPriceInterval = function (price) {
    var priceValueInterval;
    if (price <= 10000) {
      priceValueInterval = 'low';
    } else if (price > 10000 && price <= 50000) {
      priceValueInterval = 'middle';
    } else {
      priceValueInterval = 'high';
    }
    return priceValueInterval;
  };

  /* система сравнения*/
  var getRank = function (currentOffer) {
    var rank = 0;
    if (currentOffer.offer.type === typeValue) {
      rank += 1;
    }
    if (getPriceInterval(currentOffer.offer.price) === priceValue) {
      rank += 1;
    }
    if (String(currentOffer.offer.rooms) === roomsValue) {
      rank += 1;
    }
    if (String(currentOffer.offer.guests) === guestsValue) {
      rank += 1;
    }

    var featuresItem;
    for (var i = 0; i < currentOffer.offer.features.length; i++) {
      featuresItem = currentOffer.offer.features[i];
      if (currentOffer.offer.features[i] === wifiValue || featuresItem === dishwasherValue || featuresItem === parkingValue || featuresItem === washerValue || featuresItem === elevatorValue || featuresItem === conditionerValue) {
        rank += 1;
      }
    }
    return rank;
  };

  /* дополнительная сортировка по имени*/
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  /* сортировка массива offers*/
  window.sortedOffers = [];
  var updateOffers = function () {
    window.sortedOffers = window.offers.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    window.render(window.sortedOffers);
    window.showPins();
  };


  /* закрывает попап*/
  window.closeOpenPopup = function () {
    var currentPopup = document.querySelector('.popup');
    if (currentPopup) {
      window.popupClose(currentPopup);
    }
  };

  /* обработчики на полях*/
  housingType.addEventListener('change', function () {
    window.closeOpenPopup();
    typeValue = housingType.value;
    window.debounce(updateOffers);
  });
  housingPrice.addEventListener('change', function () {
    window.closeOpenPopup();
    priceValue = housingPrice.value;
    window.debounce(updateOffers);
  });
  housingRooms.addEventListener('change', function () {
    window.closeOpenPopup();
    roomsValue = housingRooms.value;
    window.debounce(updateOffers);
  });
  housingGuests.addEventListener('change', function () {
    window.closeOpenPopup();
    guestsValue = housingGuests.value;
    window.debounce(updateOffers);
  });


  /* обработчики на чекбоксах*/
  filterWifi.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterWifi.checked) {
      wifiValue = filterWifi.value;
    }
    window.debounce(updateOffers);
  });
  filterDishwasher.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterDishwasher.checked) {
      dishwasherValue = filterDishwasher.value;
    }
    window.debounce(updateOffers);
  });
  filterParking.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterParking.checked) {
      parkingValue = filterParking.value;
    }
    window.debounce(updateOffers);
  });
  filterWasher.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterWasher.checked) {
      washerValue = filterWasher.value;
    }
    window.debounce(updateOffers);
  });
  filterElevator.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterElevator.checked) {
      elevatorValue = filterElevator.value;
    }
    window.debounce(updateOffers);
  });
  filterConditioner.addEventListener('change', function () {
    window.closeOpenPopup();
    if (filterConditioner.checked) {
      conditionerValue = filterConditioner.value;
    }
    window.debounce(updateOffers);
  });


  /* обработчик успеха*/
  window.offers = [];
  var successHandler = function (data) {
    window.offers = data;
    window.render(window.offers);
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

  /* обработчик ошибки*/
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    errorHandlerStyle(node);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
