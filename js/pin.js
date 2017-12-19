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

  var mapWindow = document.querySelector('.map');
  var mapPinsContainer = mapWindow.querySelector('.map__pins');
  var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');

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
  var getRank = function (offer) {
    var rank = 0;
    if (offer.type === typeValue) {
      rank += 1;
    }
    if (getPriceInterval(offer.price) === priceValue) {
      rank += 1;
    }
    if (offer.rooms === roomsValue) {
      rank += 1;
    }
    if (offer.guests === guestsValue) {
      rank += 1;
    }
    var featuresItem;
    for (var i = 0; i < offer.features.length; i++) {
      featuresItem = offer.features[i];
      if (featuresItem === wifiValue || featuresItem === dishwasherValue || featuresItem === parkingValue || featuresItem === washerValue || featuresItem === elevatorValue || featuresItem === conditionerValue) {
        rank += 1;
      }
    }

    return rank;
  };

  /* обработчики на полях*/
  housingType.addEventListener('change', function () {
    typeValue = housingType.value;
    updateOffers();
  });
  housingPrice.addEventListener('change', function () {
    priceValue = housingPrice.value;
    updateOffers();
  });
  housingRooms.addEventListener('change', function () {
    roomsValue = housingRooms.value;
    updateOffers();
  });
  housingGuests.addEventListener('change', function () {
    guestsValue = housingGuests.value;
    updateOffers();
  });
  /* поверка чекбокса */
  var getCheckboxValue = function (checkboxName, checkboxValue) {
    if (checkboxName.checked) {
      checkboxValue = checkboxName.value;
    }
    return checkboxValue;
  };
  /* обработчики на чекбоксах*/
  filterWifi.addEventListener('change', function () {
    getCheckboxValue(filterWifi, wifiValue);
    updateOffers();
  });
  filterDishwasher.addEventListener('change', function () {
    getCheckboxValue(filterDishwasher, dishwasherValue);
    updateOffers();
  });
  filterParking.addEventListener('change', function () {
    getCheckboxValue(filterParking, parkingValue);
    updateOffers();
  });
  filterWasher.addEventListener('change', function () {
    getCheckboxValue(filterWasher, washerValue);
    updateOffers();
  });
  filterElevator.addEventListener('change', function () {
    getCheckboxValue(filterElevator, elevatorValue);
    updateOffers();
  });
  filterConditioner.addEventListener('change', function () {
    getCheckboxValue(filterConditioner, conditionerValue);
    updateOffers();
  });

  /* обработчик успеха*/
  window.offers = [];
  var successHandler = function (data) {
    window.offers = data;
    window.render(window.offers);
  };
  /* как сделано в демке:
  var updateOffers = function () {
      window.render(offers.sort(function (left, right) {
        return getRank(right) - getRank(left);
      }));
    };*/
  /*  сортировка массива offers*/
  window.sortedOffers =[];
  var updateOffers = function () {
    window.sortedOffers = window.offers.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });
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
