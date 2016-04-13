'use strict';

app.factory('userService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, baseUrl) {
        function login(user) {
            var deferred = $q.defer(),
                data = "grant_type=password&username=" + user.username + "&password=" + user.password;
            $http.defaults.headers.ContentType = 'application/x-www-form-urlencoded';
            $http.post(baseUrl + 'api/Token', data).then(function (response) {
                initUserData(response.data);
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function register(userData) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'api/Account/Register', userData).then(function (response) {
                initUserData(response.data);
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            setAuthorizationHeaders();
            $http.post(baseUrl + 'api/Account/Logout', null).then(function (response) {
                deferred.resolve(response.data);
                delete sessionStorage['currentUser'];
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function setAdminPermission(userId) {
            console.log(userId);
            setAuthorizationHeaders();
            var deferred = $q.defer();
            $http.put(baseUrl + 'users/makeadmin', {UserId: userId}).then(function (response) {
                initUserData();
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function isAdmin() {
            return JSON.parse(sessionStorage['currentUser']).isAdmin;
        }

        function isLogged() {
            return sessionStorage['currentUser'] != undefined;
        }

        function getCurrentUser() {
            return JSON.parse(sessionStorage['currentUser']);
        }

        function setAuthorizationHeaders() {
            var currentUser = getCurrentUser();
            if (currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + currentUser.access_token;
                $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
            }
        }

        function initUserData(login_response) {
            if (login_response){
                sessionStorage['currentUser'] = JSON.stringify({access_token: login_response.access_token});
            }
            setAuthorizationHeaders();
            var deferred = $q.defer();
            $http.get(baseUrl + 'users/me').then(function (response) {
                var currentUser = JSON.parse(sessionStorage['currentUser']);
                currentUser['isAdmin'] = response.data.isAdmin;
                currentUser['id'] = response.data.Id;
                currentUser['username'] = response.data.Username;
                sessionStorage['currentUser'] = JSON.stringify(currentUser);
                console.log(currentUser);
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function changePassword(userData) {
            setAuthorizationHeaders();
            var deferred = $q.defer();
            $http.post(baseUrl + 'api/Account/ChangePassword', userData).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getAllUsers() {
            setAuthorizationHeaders();
            var deferred = $q.defer();
            $http.get(baseUrl + 'users').then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        return {
            login: login,
            register: register,
            logout: logout,
            setAdminPermission: setAdminPermission,
            isAdmin: isAdmin,
            isLogged: isLogged,
            changePassword: changePassword,
            getCurrentUser: getCurrentUser,
            getAllUsers: getAllUsers
        }
    }]);