/**
 * Created by AllanXu on 7/19/2016.
 */
define(function (require) {
    var Vue = require('vue'),
        Config = require('config'),
        utilities = require('utilities'),
        _ = require('ajax');

    var app = new Vue({
        el: '#index-news',
        data: {
            typeList: [],
            showType: 0,
            pageIndex: 1,
            pageCount: 0,
            bottomTxt: '',
            searchMode: false,
            keyWord: '',
            typeValue: '',
        },
        methods: {
            newsType: function () {
                var app = this;
                _(Config.SERVICE.NEWS.NEWSTYPE, {
                    "parentId": Config.DICTIONARY.newsType
                }, function (data) {
                    app.typeList = data.data.result['9d6eb935bd274e09b9b07c08e1f6e489'];    /* 获取newsType数据存绑到data */
                    app.typeValue = data.data.result['9d6eb935bd274e09b9b07c08e1f6e489'][0].lable;      /* newsType赋值(默认显示第一个类型的列表) */
                    console.log(JSON.parse(JSON.stringify(data.data.result['9d6eb935bd274e09b9b07c08e1f6e489'])));
                    console.log(JSON.parse(JSON.stringify(data.data.result['9d6eb935bd274e09b9b07c08e1f6e489'][0].lable)));

                    app.init();     /* 刷新列表 */
                });
            },
            init: function () {
                var app = this;
                var _index = utilities.findWithAttr(app.typeList, 'value', app.typeValue);
                _(Config.SERVICE.NEWS.LIST, {
                    "newsType": app.typeValue,
                    "page": app.pageIndex,
                    "rows": 10,
                    "keyword": this.searchMode ? this.keyWord : ''
                }, function (data) {
                    if(app.keyWord == '')
                        app.searchMode = false;
                    
                    if (app.pageIndex == 1) {
                        app.pageCount = Math.ceil(data.data.result.totalNum / 10);
                        app.$set('typeList[' + _index + '].newsList', data.data.result.searchData);

                        console.log("请求到的数据是: ",JSON.parse(JSON.stringify(data.data.result)));
                    } else {
                        utilities.findElement(app.typeList, 'value', app.typeValue).newsList = utilities.findElement(app.typeList, 'value', app.typeValue).newsList.concat(data.data.result.searchData);
                    }
                    app.pageIndex++;
                    //app.$log()
                });
            },
            switchTab: function (index,value) {
                console.log(index);
                app.pageIndex = 1;
                app.showType = index;
                app.typeValue = value;

                app.init();
            },
            goDetails: function (id) {
                console.log(id);
                location.href = 'news-details.html?id=' + id;
            },
            srh: function () {
                app.searchMode = true;
                app.pageIndex = 1;
                app.init();
            }
        }
    });


    app.newsType();
    //app.init();

    window.onscroll = function () {
        var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        console.log(1,scrolltop+clientHeight);
        console.log(11,document.body.clientHeight+10)
        if (scrolltop + clientHeight == document.body.clientHeight+10) {
            console.log("hi")
            if (app.pageIndex <= app.pageCount) {
                app.init();console.log(app.pageCount,6);
            } else {
                app.bottomTxt = '到底儿了~'; console.log(app.pageIndex,3);
            }
        }
    }
});
