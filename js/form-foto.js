'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fotoContainer = document.querySelector('.form__photo-container');
  var fileChooser = fotoContainer.querySelector('.form__photo-container #images');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      var newImg = document.createElement('img');
      newImg.style.width = '142px';
      fotoContainer.appendChild(newImg);

      reader.addEventListener('load', function () {
        newImg.src = reader.result;
      });

      reader.readAsDataURL(file);

    }
  });

})();
