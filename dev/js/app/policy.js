/**
 * Created by AllanXu on 7/21/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        _ = require('ajax');

    var app = new Vue({
        el: '#policy',
        data: {
            showType: 0,

            pageIndex: 1,
            pageCount: 0,
            bottomTxt: '',
            searchMode: false,
            keyWord: '',
            renderObj: {
                listArr: []
            },

            pageIndex2: 1,
            pageCount2: 0,
            bottomTxt2: '',
            searchMode2: false,
            keyWord2: '',
            renderObj2: {
                listArr: []
            }
        },
        methods: {
            init: function() {
                var _this = this;

                _(Config.SERVICE.POLICY.LIST, {
                    "keyword": this.searchMode ? this.keyWord : "",
                    "page": _this.pageIndex,
                    "rows": 10
                }, function(data) {
                    if(_this.pageIndex == 1){
                        _this.renderObj.listArr = data.data.result.searchData;
                        _this.pageCount = Math.ceil(data.data.result.totalNum/10);
                        //console.log(_this.pageCount);
                    }else{
                        app.renderObj.listArr = app.renderObj.listArr.concat(data.data.result.searchData);
                    }
                    _this.pageIndex++;
                });
            },

            matchOnline: function () {
                _(Config.SERVICE.POLICY.MATCHONLINE, {
                    "disableType":"2,1",
                    "disableLevel":"2"
                }, function(data) {
                    console.log(JSON.parse(JSON.stringify(data)));
                    if(app.pageIndex2 == 1){
                        app.renderObj2.listArr = data.data.result.searchData;
                        app.pageCount2 = Math.ceil(data.data.result.totalNum/10);
                    }else{
                        app.renderObj2.listArr = app.renderObj2.listArr.concat(data.data.result.searchData);
                    }
                    app.pageIndex2++;

                });
            },
            goDetails: function(id) {
                console.log(id);
                location.href = 'policy-details.html?id=' + id;
            },
            srh: function () {
                console.log(11);
                var _this = this;

                if(_this.showType==0){
                    _this.searchMode = true;
                    _this.pageIndex = 1;
                    _this.init();
                }else{
                    _this.searchMode2 = true;
                    _this.pageIndex2 = 1;
                    _this.matchOnline();
                }
            },
            typeSwitch: function(i){
                app.showType = i;
                console.log(app.showType);
                if(i == 1){
                    app.matchOnline();
                }
            }
        }
    });
    app.init();
    
    window.onscroll = function(){
        var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        console.log(1,scrolltop);
        console.log(2,clientHeight);
        console.log(3,document.body.clientHeight);

        if(scrolltop + clientHeight  == document.body.clientHeight+10){
            console.log(21);

            if(app.showType==0){
                if (app.pageIndex <= app.pageCount){
                    app.init();
                    console.log(31);
                }else{
                    app.bottomTxt = '到底儿了~';
                    console.log(1);
                }
            }else{
                if (app.pageIndex2 <= app.pageCount2){
                    app.matchOnline();
                    console.log(31111);
                }else{
                    app.bottomTxt2 = '到底儿了~';
                    console.log(11111);
                }
            }

        }
    }
});
