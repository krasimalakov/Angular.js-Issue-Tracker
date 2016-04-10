'use strict';

app.factory('notifyService', function () {

        function showInfo(message) {
            noty({
                    text: message,
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000
                }
            );
        }

        function showError(message, serverError) {
            // Collect errors to display from the server response
            var errors = [];
            if (serverError && serverError.message) {
                errors.push(serverError.message);
            }
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }
            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }
            if (errors.length > 0) {
                message = message + ":<br>" + errors.join("<br>");
            }
            noty({
                    //theme: 'bootstrapTheme',
                    text: message,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 5000
                }
            );
        }

        return {
            showInfo: showInfo,
            showError: showError
        }
    }
);
