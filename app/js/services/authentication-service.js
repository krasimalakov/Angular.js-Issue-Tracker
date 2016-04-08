'use strict';

app.factory('authentication', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, baseUrl) {

        function login(user) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'users/Login', user).then(function (response) {
                sessionStorage['currentUser'] = JSON.stringify(response.data);
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function register(userData) {
            $http.post(baseUrl + 'users/Register', userData).then(function (response) {
                sessionStorage['currentUser'] = JSON.stringify(response.data);

            }, function (error) {

            });
        }

        function logout() {
            delete sessionStorage['currentUser'];
        }

        function isLogged() {
            return sessionStorage['currentUser'] != undefined;
        }

        return {
            login: login,
            register: register,
            logout: logout,
            isLogged: isLogged
        }
    }]);
