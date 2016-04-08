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
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function register(userData) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'users/Register', userData).then(function (response) {
                sessionStorage['currentUser'] = JSON.stringify(response.data);
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            delete sessionStorage['currentUser'];
            deferred.resolve('User is logout !');
            return deferred.promise;
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
