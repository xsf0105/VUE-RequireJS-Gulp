/**
 * Created by AllanXu on 7/29/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        _ = require('ajax');

    var app = new Vue({
        el: '#guide',
        data: {
            renderObj: {},
            guideType: '1',
            typeList: [{
                name: "证件办理",
                guideType: '1'
            },{
                name: "升级",
                guideType: "2"
            },{
                name: "补办",
                guideType: '3'
            },{
                name: "换新",
                guideType: '4'
            },{
                name: "迁移",
                guideType: '5'
            },{
                name: "鉴定",
                guideType: '6'
            }],
        },
        methods: {
            init: function() {
                var _this = this;
                _(Config.SERVICE.CARDGUIDE.LIST, {
                    "guideType": app.guideType,
                    "areaCode":"33"
                }, function(data) {
                    _this.renderObj = data.data.result;
                    console.log(JSON.parse(JSON.stringify(data.data.result)));
                });
            },
            switch: function(index){
                app.guideType = index;
                app.init();
            }
        }
    });
    app.init();
});