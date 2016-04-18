'use strict';
app.filter('keyFromText', function () {
    return function (text) {
            var words = text.trim().split(/\s+/),
            key = "";
        words.forEach(function (word) {
            var c = word.charAt(0);
            if (c.toLowerCase() != c.toUpperCase()) {
                key += c;
            }
        });
        return key;
    }
});