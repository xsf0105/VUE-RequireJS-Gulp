/**
 * Created by allanXu on 7/21/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        _ = require('ajax');

    var app = new Vue({
        el: '#safaguard',
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
                _(Config.SERVICE.SAFEGUARD.LIST, {
                    "keyword": this.searchMode ? this.keyWord : '',
                    "page":1,
                    "rows":10
                }, function(data) {
                    if(_this.keyWord == '')
                        _this.searchMode = false;

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
                console.log(id);
                location.href = 'safeguard-details.html?id=' + id;
            },
            goHome: function(){
                location.href = 'index.html';
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
    window.onscroll = function () {
        var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        if (scrolltop + clientHeight == document.body.clientHeight) {
            if (app.pageIndex <= app.pageCount) {
                app.init();console.log(app.pageCount,6);
            } else {
                app.bottomTxt = '到底儿了~'; console.log(app.pageIndex,3);
            }
        }
    }
});
