'use strict';

/*возвращает случайное целое число в указанном промежутке*/
var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
};

/*возвращает случайный элемент массива*/
var getRandomElement = function (arr) {
    var rand = getRandomInteger(0, arr.length - 1);
    return arr[rand];
};

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/*создает массив удобств случайной длины не длиннее изначального массива удобств*/
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

var OFFER_PHOTOS = [];

/*создает массив  объектов заданной длины, описывающих похожие объявления неподалеку*/
var createOffersArray = function (lengthArray) {
    var arr = [];
    for (var i = 0; i < lengthArray; i++) {
        var coordX = getRandomInteger(300, 900);
        var coordY = getRandomInteger(100, 500);
        var autorAvatar = 'img/avatars/user0' + (i + 1) + '.png';
        arr.push({
            author: {
                avatar: autorAvatar,
            },
            offer: {
                title: OFFER_TITLES[i],
                address: coordX + ', ' + coordY,
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
var pinsListElement = mapWindow.querySelector('.map__pins');
var templateElement = document.querySelector('template').content;
var mapPinTemplate = templateElement.querySelector('.map__pin');
var mapCardTemplate = templateElement.querySelector('.map__card');

/*заполняет pin данными*/
var fillPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.style.left = pin.location.x - 20 + 'px';
    pinElement.style.top = pin.location.y - 58 + 'px';

    return pinElement;
};

/*создает фрагмент для вставки */
var getFragment = function (arr, func) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(func(arr[i]));
    }
    return fragment;
};

/*добавляет элемент в DOM*/
var appendToNode = function (node, fragment) {
    node.appendChild(fragment);
};
/*генерируем пины*/
var pins = getFragment(offers, fillPin);

/*создает элемент*/
var createFeature = function (feature) {
    var newLi = document.createElement('li');
    newLi.className = 'feature feature--' + feature;
    return newLi;
};

/*заменяет ангийский на русский в названии удобства*/
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

/*заполняет карточку данными*/
var fillCard = function (card) {
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
    var featureFragment = getFragment(card.offer.features, createFeature);
    featurePlace.appendChild(featureFragment);

    return cardElement;
};

var mapFiltersElement = mapWindow.querySelector('.map__filters-container');

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var noticeForm = document.querySelector('.notice__form');
var mainPin = mapWindow.querySelector('.map__pin--main');
var activeMapPin = null;
var allFieldsets = noticeForm.querySelectorAll('fieldset');

/*навешивает обработчик мыши на основной пин*/
mainPin.addEventListener('mouseup', function() {
    onMainPinMouseup();
});
/*навешивает обработчик enter на основной пин*/
mainPin.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
        onMainPinMouseup();
    }
});
/*отображает пины*/
var pinShow = function () {
    appendToNode(pinsListElement, pins);
};
/*активирует форму и карту, показывает пины, добавляет им обработчики*/
var onMainPinMouseup = function () {
    mapWindow.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < allFieldsets.length; i++) {
        allFieldsets[i].removeAttribute('disabled');
    }
    pinShow();
    var mapPins = mapWindow.querySelectorAll('.map__pin:not(.map__pin--main)');
    /*добавляют события пинам*/
    mapPins.forEach(function(el, i) {
        el.addEventListener('mouseup', function(evt) {
            onPinMouseup(evt, offers[i]) // событие и нужный объект
        })
        el.addEventListener('keydown', function(evt) {
            if (evt.keyCode === ENTER_KEYCODE) {
               onPinMouseup(evt, offers[i]) // событие и нужный объект
            }
        })
    });
};
/* отображение попапа*/
var openPopup = function (obj) {

    var cardElement = fillCard(obj);

    mapWindow.insertBefore(cardElement, mapFiltersElement);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
    popupClose(cardElement)
    });
    cardElement.querySelector('.popup__close').addEventListener('keydown', function (evt) {
      onCloseElementEnterPress(evt, cardElement)
    });
    document.addEventListener('keydown', function (evt) {
      onPopupEscPress(evt, document.querySelector('.popup'))
    });

};
/*активирует пин и вызывает попап*/
var onPinMouseup = function(evt, obj) {
   var currentPopup = document.querySelector('.popup');
if (currentPopup) {
     popupClose(currentPopup);
}
   if (activeMapPin) {
        activeMapPin.classList.remove('map__pin--active');
    }
    activeMapPin = evt.currentTarget;
    activeMapPin.classList.add('map__pin--active');
    openPopup(obj);
};


/*закрывает попап*/
var popupClose = function (currentOffer) {
        mapWindow.querySelector('.map__pin--active').classList.remove('map__pin--active');
        currentOffer.querySelector('.popup__close').removeEventListener('click', function () {
        popupClose(currentOffer)
        });
        currentOffer.querySelector('.popup__close').removeEventListener('keydown', function (evt) {
        onCloseElementEnterPress(evt, currentOffer)
        });
        document.removeEventListener('keydown', function (evt) {
          onPopupEscPress(evt, currentOffer)
         });
        mapWindow.removeChild(currentOffer);
  };
/*обработчик enter на крестике*/
var onCloseElementEnterPress = function (evt, currentOffer) {
    if (evt.keyCode === ENTER_KEYCODE) {
        popupClose(currentOffer);
    }
};
/*обработчик события закрытия попапа по esc*/
var onPopupEscPress = function (evt, currentOffer) {
    if (evt.keyCode === ESC_KEYCODE) {
        popupClose(currentOffer);
    }
};

/*работа с формой*/
var inputTitle = noticeForm.querySelector('#title');
var inputAdress = noticeForm.querySelector('#address');
var houseType = noticeForm.querySelector('#type');
var inputPrice = noticeForm.querySelector('#price');
var timeIn = noticeForm.querySelector('#timein');
var timeOut = noticeForm.querySelector('#timeout');
var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

/*время въезда и выезда*/
var optionsTime = timeIn.querySelectorAll('option');
var optionsTimeOut = timeOut.querySelectorAll('option');
var optionsCapacity = capacity.querySelectorAll('option');
/*функция синхронизации полей*/
var changeOption = function (arr, firstSelect, secondSelect) {
    for (var i = 0; i < arr.length; i++) {
        if (firstSelect.options.selectedIndex === i) {
            secondSelect.options.selectedIndex = i;
        }
    }
};

timeIn.addEventListener('change', function() {
    changeOption(optionsTime, timeIn, timeOut);
});
timeOut.addEventListener('change', function() {
    changeOption(optionsTimeOut, timeOut, timeIn);
});

/*количество комнат связанное с количеством гостей */

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

roomNumber.addEventListener('change', function() {
    changeCapacity();
});

/*поле тип жилья и минимальная цена*/
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
houseType.addEventListener('change', function() {
    changePrice();
});


/*устанавливает цвет рамки*/
var setErrorColor = function(element) {
    element.style.outline = '2px solid red';
};
/*убирает цвет рамки*/
var resetErrorColor = function(element) {
    element.style.outline = '';
}

/*функция проверки валидности поля*/
var checkValidity = function (inputName, validityType, message) {
 if (inputName.validity[validityType]) {
        inputName.setCustomValidity(message);
        setErrorColor(inputName);
    }
};

/*проверка поля заголовок*/
inputTitle.addEventListener('invalid', function(evt) {
  checkValidity(inputTitle, 'tooShort', 'Заголовок объявления быть не менее 30-ти символов');
});

inputTitle.addEventListener('invalid', function(evt) {
  checkValidity(inputTitle, 'valueMissing', 'Обязательное поле');
  });

inputTitle.addEventListener('invalid', function(evt) {
  checkValidity(inputTitle, 'tooLong', 'Заголовок объявления не должнен превышать 100 символов');
    });


/*проверка поля адрес*/
inputAdress.addEventListener('invalid', function(evt) {
  checkValidity(inputAdress, 'valueMissing', 'Обязательное поле');
  });


/*проверка поля цена за ночь*/
inputPrice.addEventListener('invalid', function(evt) {
  checkValidity(inputPrice, 'rangeUnderflow', 'Стоимость ниже рекомендованной');
});

inputPrice.addEventListener('invalid', function(evt) {
  checkValidity(inputPrice, 'rangeOverflow', 'Стоимость выше рекомендованной');
});

inputPrice.addEventListener('invalid', function(evt) {
  checkValidity(inputPrice, 'valueMissing', 'Обязательное поле');
});



