'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var apartmentType = noticeForm.querySelector('#type');
  var pricePerNight = document.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var formReset = noticeForm.querySelector('.form__reset');
  /* соответствие  типов недвижимости и минимальной цены*/
  var offerTypePrice = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  /* соответствие  количества комнат и количества гостей*/
  var roomsCapacity = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };

  /* обработчик отправки формы*/
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
      inputAddress.value = '568, 288';
    });
    evt.preventDefault();
  });

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
    inputAddress.value = '568, 288';
  });

  /* функция для создания массивов из значений value*/
  var getArray = function (element) {
    var valuesArray = [];
    valuesArray.forEach.call(element.options, function (item) {
      valuesArray.push(item.value);
    });
    return valuesArray;
  };

  /* Синхронизация полей времени заезда и выезда*/
  /* создание массивов из значений value*/
  var optionsTimeInArr = getArray(timeIn);
  var optionsTimeOutArr = getArray(timeOut);

  /* функция обратного вызова*/
  var syncValues = function (element, value) {
    element.value = value;
  };

  /* синхронизация в одну сторону*/
  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, optionsTimeInArr, optionsTimeOutArr, syncValues);
  });

  /* синхронизация в обратную сторону*/
  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, optionsTimeOutArr, optionsTimeInArr, syncValues);
  });

  /* Синхронизация типа жилья и минимальной цены*/
  /* получение массива типов жилья из значений value*/
  var optionsTypeArr = getArray(apartmentType);

  /* функция получения массива из значений свойств объекта*/
  var getValueObjectArr = function (obj) {
    var valuesArray = Object.values(obj);
    return valuesArray;
  };

  /* получение массива минимальных значений (из объекта)*/
  var minPriceArr = getValueObjectArr(offerTypePrice);

  /* функция обратного вызова*/
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  /* односторонняя синхронизация значения типов недвижимости с минимальным значением поля цены*/
  apartmentType.addEventListener('change', function () {
    window.synchronizeFields(apartmentType, pricePerNight, optionsTypeArr, minPriceArr, syncValueWithMin);
  });

  /* Синхронизация количества комнат с количеством гостей */
  /* получение массива из значений количества комнат из значений value*/
  var roomNumberArr = getArray(roomNumber);

  /* получение массива из значений количества гостей (из объекта) */
  var capacityArr = getValueObjectArr(roomsCapacity);

  /* односторонняя синхронизация */
  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumber, capacity, roomNumberArr, capacityArr, syncValues);
  });

  /* Валидация полей формы*/
  /* устанавливает цвет рамки*/
  var setErrorColor = function (element) {
    element.style.outline = '2px solid red';
  };

  /* убирает ошибку*/
  var resetError = function (element) {
    element.setCustomValidity('');
    element.style.outline = '';
  };

  /* функция проверки валидности поля*/
  var validityCheck = function (inputName, validityType, message) {
    if (inputName.validity[validityType]) {
      inputName.setCustomValidity(message);
      setErrorColor(inputName);
    }
  };

  /* проверка поля заголовок*/
  inputTitle.addEventListener('invalid', function () {
    resetError(inputTitle);
    validityCheck(inputTitle, 'tooShort', 'Заголовок объявления быть не менее 30-ти символов');
    validityCheck(inputTitle, 'tooLong', 'Заголовок объявления не должнен превышать 100 символов');
    validityCheck(inputTitle, 'valueMissing', 'Обязательное поле');
  });

  /* проверка поля адрес*/
  inputAddress.addEventListener('invalid', function () {
    resetError(inputAddress);
    validityCheck(inputAddress, 'valueMissing', 'Обязательное поле');
  });

  /* проверка поля цена за ночь*/
  pricePerNight.addEventListener('invalid', function () {
    resetError(pricePerNight);
    validityCheck(pricePerNight, 'rangeUnderflow', 'Стоимость ниже рекомендованной');
    validityCheck(pricePerNight, 'rangeOverflow', 'Стоимость выше рекомендованной');
    validityCheck(pricePerNight, 'valueMissing', 'Обязательное поле');
  });

})();
