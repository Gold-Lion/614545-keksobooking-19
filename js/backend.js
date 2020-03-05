'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  var URL_METHOD = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var getHttpRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.NOT_FOUND_ERROR:
          onError('Ошибка. Сервер не может найти запрашиваемый ресурс');
          break;
        case StatusCode.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Ошибка! Статус ошибки: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Ошибка. Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' сек. Пожалуйста перезагрузите страницу!');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = getHttpRequest(onLoad, onError);
    xhr.open('GET', URL_METHOD.GET);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = getHttpRequest(onLoad, onError);
    xhr.open('POST', URL_METHOD.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
