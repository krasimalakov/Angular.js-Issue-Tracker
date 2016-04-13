app.filter('getLastWord', function () {
    return function (input) {
        if (input!=undefined){
            return input.trim().split(/\s*,\s*/).pop();
        }
    }
});