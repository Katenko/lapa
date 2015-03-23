function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

String.prototype.repeat = function (num) {
    return new Array(num + 1).join(this);
};

function getUriParamsPathFromObject(obj) {
    return Object.keys(obj).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}
