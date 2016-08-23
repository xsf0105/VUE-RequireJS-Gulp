/**
 * Created by Wenwu on 7/19/2016.
 */
define(function (require) {

    var Spinner = require('spinner');

    var spinner = new Spinner();

    return function (url, params, callback, errorCallback) {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp != null) {
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    spinner.stop();
                    if (xmlhttp.status == 200) {
                        if (typeof(callback) != 'undefined') {
                            callback(JSON.parse(xmlhttp.responseText));
                        }
                    } else {
                        if (typeof(errorCallback) != 'undefined') {
                            errorCallback(JSON.parse(xmlhttp.responseText));
                        }
                    }
                }
            };
            spinner.start();
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
            xmlhttp.send(JSON.stringify(params));
        } else {
            console.log("Your browser does not support XMLHTTP.");
        }
    }
});