/**
 * Created by allanXu on 7/19/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        utilities = require('utilities'),
        _ = require('ajax');

    var StoreToaster = require('storeToaster');
    var storeToaster = new StoreToaster ();

    var id = utilities.getParameterByName('id');

    var app = new Vue({
        el: '#safeguard-details',
        data: {
            artInfo: {},
            isActive: false,
            isShare: false
        },
        methods: {
            init: function() {
                var _this = this;
                _(Config.SERVICE.SAFEGUARD.DETAILS, {
                    "id": id,
                }, function(data) {
                    console.log(JSON.parse(JSON.stringify(data)));
                    app.artInfo = data.data.result;
                    console.log(JSON.parse(JSON.stringify(app.artInfo)));
                });
            },
            store: function() {
                if(!app.isActive){
                    _(Config.SERVICE.SAFEGUARD.STORE, {
                        "socialSecurityId": id
                    }, function(data) {
                        storeToaster.store();
                        app.isActive = !app.isActive;
                        console.log("收藏!");
                        console.log(JSON.parse(JSON.stringify(data)));
                    });
                }else{
                    _(Config.SERVICE.SAFEGUARD.UNSTORE, {
                        "socialSecurityId": id
                    }, function(data) {
                        storeToaster.unstore();
                        app.isActive = !app.isActive;
                        console.log("取消收藏!");
                        console.log(JSON.parse(JSON.stringify(data)));
                    });
                }
            },
            share: function () {
                if(!this.isShare){
                    _(Config.SERVICE.SAFEGUARD.SHARE, {
                        "socialSecurityId": id,
                        "shareTarget": 0
                    }, function(data) {
                        app.isShare = !app.isShare;
                        console.log("分享啦~");
                        console.log(JSON.parse(JSON.stringify(data)));
                    });
                }
            }
        }
    });
    app.init();

});
