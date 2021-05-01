/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./platform/themes/stories/assets/js/backend.js ***!
  \******************************************************/
var showError = function showError(message) {
  window.showAlert('alert-danger', message);
};

var showSuccess = function showSuccess(message) {
  window.showAlert('alert-success', message);
};

var handleError = function handleError(data) {
  if (typeof data.errors !== 'undefined' && data.errors.length) {
    handleValidationError(data.errors);
  } else if (typeof data.responseJSON !== 'undefined') {
    if (typeof data.responseJSON.errors !== 'undefined') {
      if (data.status === 422) {
        handleValidationError(data.responseJSON.errors);
      }
    } else if (typeof data.responseJSON.message !== 'undefined') {
      showError(data.responseJSON.message);
    } else {
      $.each(data.responseJSON, function (index, el) {
        $.each(el, function (key, item) {
          showError(item);
        });
      });
    }
  } else {
    showError(data.statusText);
  }
};

var handleValidationError = function handleValidationError(errors) {
  var message = '';
  $.each(errors, function (index, item) {
    if (message !== '') {
      message += '<br />';
    }

    message += item;
  });
  showError(message);
};

window.showAlert = function (messageType, message) {
  if (messageType && message !== '') {
    var alertId = Math.floor(Math.random() * 1000);
    var html = "<div class=\"alert ".concat(messageType, " alert-dismissible\" id=\"").concat(alertId, "\">\n                            <span class=\"close elegant-icon icon_close\" data-dismiss=\"alert\" aria-label=\"close\"></span>\n                            <i class=\"elegant-icon icon_") + (messageType === 'alert-success' ? 'info' : 'error-circle_alt') + " message-icon\"></i>\n                            ".concat(message, "\n                        </div>");
    $('#alert-container').append(html).ready(function () {
      window.setTimeout(function () {
        $("#alert-container #".concat(alertId)).remove();
      }, 6000);
    });
  }
};

$(document).on('click', '.newsletter-form button[type=submit]', function (event) {
  event.preventDefault();
  event.stopPropagation();

  var _self = $(this);

  _self.addClass('button-loading');

  $.ajax({
    type: 'POST',
    cache: false,
    url: _self.closest('form').prop('action'),
    data: new FormData(_self.closest('form')[0]),
    contentType: false,
    processData: false,
    success: function success(res) {
      _self.removeClass('button-loading');

      if (typeof refreshRecaptcha !== 'undefined') {
        refreshRecaptcha();
      }

      if (res.error) {
        showError(res.message);
        return false;
      }

      _self.closest('form').find('input[type=email]').val('');

      showSuccess(res.message);
    },
    error: function error(res) {
      if (typeof refreshRecaptcha !== 'undefined') {
        refreshRecaptcha();
      }

      _self.removeClass('button-loading');

      handleError(res);
    }
  });
});
$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: $('#sidebar-wrapper').data('load-url'),
    success: function success(res) {
      if (res.error) {
        return false;
      }

      $('.sidebar-inner').html(res.data);
    },
    error: function error(res) {
      console.log(res);
    }
  });
});
/******/ })()
;