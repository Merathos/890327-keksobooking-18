'use strict';

(function () {
  var STATUS_OK = 200;

  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    return xhr;
  };

  var load = function (url, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  var onError = function (errorMsg) {
    var errorTemplate = document.querySelector('#error')
      .content;
    var error = errorTemplate.cloneNode(true);
    var errorBody = error.querySelector('.error');
    var message = error.querySelector('.error__message');
    var errorButton = error.querySelector('.error__button');
    message.textContent = errorMsg;
    document.body.insertAdjacentElement('afterbegin', errorBody);
    errorButton.addEventListener('click', function () {
      errorBody.remove();
      window.map.deactivatePage();
    });
  };

  window.backend = {
    load: load,
    save: save,
    onError: onError
  };
})();
