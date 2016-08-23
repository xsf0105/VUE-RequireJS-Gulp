/**
 * Created by AllanXu on 7/25/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        _ = require('ajax');

    var app = new Vue({
        el: '#edu',
        data: {
            pageIndex: 1,
            pageCount: 0,
            bottomTxt: '',
            searchMode: false,
            keyWord: '',
            renderObj: {
                listArr: []
            }
        },
        methods: {
            init: function() {
                var _this = this;
                if(_this.keyWord == '')
                    _this.searchMode = false;
                _(Config.SERVICE.EDU.LIST, {
                    "keyword":  this.searchMode ? this.keyWord : "",
                    "page": _this.pageIndex,
                    "rows": 10
                }, function(data) {
                    if(_this.pageIndex == 1){
                        _this.renderObj.listArr = data.data.result.searchData;
                        _this.pageCount = Math.ceil(data.data.result.totalNum/10);
                    }else{
                        app.renderObj.listArr = app.renderObj.listArr.concat(data.data.result.searchData);
                    }
                    _this.pageIndex++;
                });
            },
            goDetails: function(id) {
                location.href = 'edu-details.html?id=' + id;
            },
            srh: function () {
                var _this = this;
                
                _this.searchMode = true;
                _this.pageIndex = 1;
                _this.init();
            }
        }
    });
    app.init();

    window.onscroll = function(){
        var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;

        console.log(scrolltop+clientHeight,document.body.clientHeight);

        if(scrolltop + clientHeight  == document.body.clientHeight){
            if (app.pageIndex <= app.pageCount){
                app.init();
            }else{
                app.bottomTxt = '到底儿了~';
            }
        }
    }

});