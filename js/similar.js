'use strict';
(function () {

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
  window.offers = [];
  window.sortedOffers = [];


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
    if (currentOffer.offer.rooms === +roomsValue) {
      rank += 1;
    }
    if (currentOffer.offer.guests === +guestsValue) {
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

  window.offer.onHousingTypeChange = function (value) {
    typeValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onHousingPriceChange = function (value) {
    priceValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onHousingRoomsChange = function (value) {
    roomsValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onHousingGuestsChange = function (value) {
    guestsValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterWifiChange = function (value) {
    wifiValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterDishwasher = function (value) {
    dishwasherValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterParking = function (value) {
    parkingValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterWasher = function (value) {
    washerValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterElevator = function (value) {
    elevatorValue = value;
    window.debounce(updateOffers);
  };
  window.offer.onFilterConditioner = function (value) {
    conditionerValue = value;
    window.debounce(updateOffers);
  };

  /* обработчик успеха*/
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
