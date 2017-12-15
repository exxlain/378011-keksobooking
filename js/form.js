'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');
  var houseType = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  /* время въезда и выезда*/
  var optionsTime = timeIn.querySelectorAll('option');
  var optionsTimeOut = timeOut.querySelectorAll('option');

  /* функция синхронизации полей*/
  var changeOption = function (arr, firstSelect, secondSelect) {
    for (var i = 0; i < arr.length; i++) {
      if (firstSelect.options.selectedIndex === i) {
        secondSelect.options.selectedIndex = i;
      }
    }
  };

  timeIn.addEventListener('change', function () {
    changeOption(optionsTime, timeIn, timeOut);
  });
  timeOut.addEventListener('change', function () {
    changeOption(optionsTimeOut, timeOut, timeIn);
  });

  /* количество комнат связанное с количеством гостей */
  var changeCapacity = function () {
    switch (roomNumber.options[roomNumber.selectedIndex].value) {
      case '1':
        capacity.options.selectedIndex = '2';
        break;
      case '2':
        capacity.options.selectedIndex = '1';
        break;
      case '3':
        capacity.options.selectedIndex = '0';
        break;
      case '100':
        capacity.options.selectedIndex = '3';
        break;
    }
  };

  roomNumber.addEventListener('change', function () {
    changeCapacity();
  });

  /* поле тип жилья и минимальная цена*/
  var changePrice = function () {
    switch (houseType.options[houseType.selectedIndex].value) {
      case 'bungalo':
        inputPrice.min = '0';
        break;
      case 'flat':
        inputPrice.min = '1000';
        break;
      case 'house':
        inputPrice.min = '5000';
        break;
      case 'palace':
        inputPrice.min = '10000';
        break;
    }
  };
  houseType.addEventListener('change', function () {
    changePrice();
  });

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
  inputPrice.addEventListener('invalid', function () {
    resetError(inputPrice);
    validityCheck(inputPrice, 'rangeUnderflow', 'Стоимость ниже рекомендованной');
    validityCheck(inputPrice, 'rangeOverflow', 'Стоимость выше рекомендованной');
    validityCheck(inputPrice, 'valueMissing', 'Обязательное поле');
  });

})();
