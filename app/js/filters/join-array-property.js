'use strict';
app.filter('joinArrayProperty', function () {
    return function (items, input) {
        var result='';
        items.forEach(function (item) {
            result+=eval('item.'+input)+', ';
        });
        return result.slice(0,-2);
    }
});