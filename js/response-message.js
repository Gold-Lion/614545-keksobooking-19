'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var submitFormBtn = document.querySelector('.ad-form__submit');
  var newSuccessTemplate = successTemplate.cloneNode(true);
  var newErrorTemplate = errorTemplate.cloneNode(true);
  var button = newErrorTemplate.querySelector('.error__button');

  var setDefultBtnSubmit = function () {
    submitFormBtn.textContent = 'Опубликовать';
    submitFormBtn.disabled = false;
  };

  var preloaderBtnSubmit = function () {
    submitFormBtn.textContent = 'Данные отправляются...';
    submitFormBtn.disabled = true;
  };

  var onCloseMessageEscPress = function (evt) {
    window.util.isEscEvent(evt, closeMessage);
  };

  var closeMessage = function () {
    newErrorTemplate.remove();
    newSuccessTemplate.remove();

    document.removeEventListener('keydown', onCloseMessageEscPress);
  };

  var showSuccessMessage = function () {
    window.form.resetForm();
    setDefultBtnSubmit();
    main.appendChild(newSuccessTemplate);
    newSuccessTemplate.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onCloseMessageEscPress);
  };

  var showErrorMessage = function (errorMessage) {
    newErrorTemplate.querySelector('.error__message').textContent = errorMessage;

    setDefultBtnSubmit();
    main.appendChild(newErrorTemplate);
    button.addEventListener('click', closeMessage);
    newErrorTemplate.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onCloseMessageEscPress);
  };


  window.responseMessage = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage,
    preloaderBtnSubmit: preloaderBtnSubmit
  };
})();
