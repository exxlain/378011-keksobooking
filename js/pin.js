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

  window.offer = {
    onHousingTypeChange: function () {},
    onHousingPriceChange: function () {},
    onHousingRoomsChange: function () {},
    onHousingGuestsChange: function () {},
    onFilterWifiChange: function () {},
    onFilterDishwasher: function () {},
    onFilterParking: function () {},
    onFilterWasher: function () {},
    onFilterElevator: function () {},
    onFilterConditioner: function () {}
  };

  /* закрывает попап*/
  window.closeOpenPopup = function () {
    var currentPopup = document.querySelector('.popup');
    if (currentPopup) {
      window.popupClose(currentPopup);
    }
  };
  /* применяется к input при смене значения*/
  var onInputChange = function (filter, func) {
    window.closeOpenPopup();
    func(filter.value);
  };
  /* обработчики на полях*/
  housingType.addEventListener('change', function () {
    onInputChange(housingType, window.offer.onHousingTypeChange);
  });
  housingPrice.addEventListener('change', function () {
    onInputChange(housingPrice, window.offer.onHousingPriceChange);
  });
  housingRooms.addEventListener('change', function () {
    onInputChange(housingRooms, window.offer.onHousingRoomsChange);
  });
  housingGuests.addEventListener('change', function () {
    onInputChange(housingGuests, window.offer.onHousingGuestsChange);
  });

  /* применяется к чекбоксу при смене значения*/
  var onCheckboxChange = function (filter, func) {
    window.closeOpenPopup();
    if (filter.checked) {
      func(filter.value);
    }
  };
  /* обработчики на чекбоксах*/
  filterWifi.addEventListener('change', function () {
    onCheckboxChange(filterWifi, window.offer.onFilterWifiChange);
  });
  filterDishwasher.addEventListener('change', function () {
    onCheckboxChange(filterDishwasher, window.offer.onFilterDishwasher);
  });
  filterParking.addEventListener('change', function () {
    onCheckboxChange(filterParking, window.offer.onFilterParking);
  });
  filterWasher.addEventListener('change', function () {
    onCheckboxChange(filterWasher, window.offer.onFilterWasher);
  });
  filterElevator.addEventListener('change', function () {
    onCheckboxChange(filterElevator, window.offer.onFilterElevator);
  });
  filterConditioner.addEventListener('change', function () {
    onCheckboxChange(filterConditioner, window.offer.onFilterConditioner);
  });

})();
