'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  var URL_METHOD = {
    GET: 'https://js.dump.academy/keksobooking/data'
    // POST:
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.NOT_FOUND:
          onError('Ошибка. Сервер не может найти запрашиваемый ресурс');
          break;
        case StatusCode.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Ошибка. Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ошибка. Запрос не успел выполниться за ' + xhr.timeout + ' мс. Пожалуйста перезагрузите страницу!');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_METHOD.GET);
    xhr.send();
  };

  window.backend = {
    load: load,
    // save: save
  };
})();
