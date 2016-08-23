/**
 * Created by AllanXu on 7/19/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        utilities = require('utilities'),
        _ = require('ajax');

    var fr = utilities.getParameterByName('fr');

    var app = new Vue({
        el: '#labour',
        data: {
            showType: 1,

            /*************** Type == 0 ************/
            pageIndex: 1,
            pageCount: 0,
            bottomTxt: '',
            renderObj: {
                listArr: []
            },
            searchMode: false,
            keyWord: '',
            /*************** Type == 1 ************/
            matchPageIndex: 1,
            matchPageCount: 0,
            matchBottomTxt: '',
            matchRenderObj: {
                listArr: []
            },
            matchSearchMode: false,
            matchKeyWord: '',
            /*************** Type == 3 ************/
            associationPageIndex: 1,
            associationPageCount: 0,
            associationBottomTxt: '',
            associationName: {
                listArr:[]
            },
            associationSearchMode: false,
            associationKeyWord: '',
            /*************** Type == 2 ************/
            quarters: '',
            workArea: '',
            wages: '',
            vitae: '',
            areaCode: '',
            vitaeExtend: '',
            isDialogShow: false,
            labelArr: [],
            labels: [{
                name: "自信大方",
                checked: false
            },{
                name: "诚实谦虚",
                checked: false
            },{
                name: "热情开朗",
                checked: false
            },{
                name: "乐观向上",
                checked: false
            },{
                name: "认真负责",
                checked: false
            },{
                name: "适应力强",
                checked: false
            }],
            showBtn: false,
        },
        methods: {
            init: function() {
                var _this = this;
                _this.showType = 0;
                _(Config.SERVICE.LABOUR.LIST, {
                    "keyword": _this.searchMode ? this.keyWord : "",
                    "page": _this.pageIndex,
                    "rows": 10
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
                // if(fr == 'frAssociationDetails'){
                //    app.recruit();
                //    app.showType = 3;
                // }
            },
            jobMatch: function () {
                var _this = this;
                _this.showType = 1;
                _(Config.SERVICE.LABOUR.MATCHLIST, {
                    "disableType":"2,3",
                    "disableLevel":"2,3",
                    "keyword":  _this.matchSearchMode ? this.matchKeyWord : "",
                    "page": _this.matchPageIndex,
                    "rows": 10
                }, function(data) {
                    console.log(JSON.parse(JSON.stringify(data)),22222);

                    if(_this.matchPageIndex == 1){
                        _this.matchRenderObj.listArr = data.data.result.searchData;
                        _this.matchPageCount = Math.ceil(data.data.result.totalNum/10);
                        //console.log(2222,_this.associationPageCount);
                        //app.$log();
                    }else{
                        _this.matchRenderObj.listArr = app.matchRenderObj.listArr.concat(data.data.result.searchData);
                        app.$log();
                    }
                    _this.matchPageIndex++;
                });
            },
            association: function () {
                var _this = this;
                _this.showType = 3;
                _(Config.SERVICE.LABOUR.RECRUITLIST, {
                    "associationName": this.associationSearchMode ? this.associationKeyWord : "",
                    "page": 1,
                    "rows": 10
                }, function(data) {
                    if(_this.associationKeyWord == '')
                        _this.associationSearchMode = false;
                    if(_this.associationPageIndex == 1){
                        _this.associationName.listArr = data.data.result.searchData;
                        _this.associationPageCount = Math.ceil(data.data.result.totalNum/10);
                    }else{
                        _this.associationName.listArr = app.associationName.listArr.concat(data.data.result.searchData);
                        app.$log();
                    }
                    _this.associationPageIndex++;
                });
            },
            jobIntend: function () {
                var _this = this;
                _this.showType = 2;
                _(Config.SERVICE.LABOUR.JOBAPPLY, {
                    "quarters": app.quarters,
                    "workArea": app.workArea,
                    "wages": app.wages,
                    "vitae": app.vitae,
                    "areaCode": app.areaCode,
                    "vitaeExtend": app.vitaeExtend
                }, function(data) {
                    console.log(JSON.parse(JSON.stringify(data)));
                });
            },
            choiseLabel: function(label,index){
                app.labels[index].checked = !app.labels[index].checked;
            },
            showDialog: function () {
                app.isDialogShow = true;
            },
            delLabel: function(label,index){
                for(var i=0;i<app.labels.length;i++){
                    if(app.labels[i].name==label){
                        app.labels[i].checked = false;   /*labels要根据对应的name来删除*/
                        app.labelArr.splice(index,1);   /*labelArr可以根据下标来删除*/
                    }
                }
                //app.labelArr.splice(index,1);   /*labelArr可以根据下标来删除*/
                console.log(JSON.parse(JSON.stringify(app.labelArr)));
            },
            submitLabels: function(){
                var _this = this;
                _this.isDialogShow = false;
                for(var i= 0;i<_this.labels.length;i++){
                    if(_this.labels[i].checked){
                        _this.labelArr.push(_this.labels[i].name);
                        console.log(_this.labelArr);
                    }else{
                        console.log("11133311");
                        for(var j=0;j<_this.labelArr.length;j++){
                            if(_this.labels[i].name ==_this.labelArr[j]){
                                console.log("11");
                                app.labelArr.splice(j,1);
                            }
                        }
                    }
                }
                _this.vitae = _this.labelArr.join(",");
                console.log(_this.vitae);
            },

            goDetails: function(id) {
                if(app.showType==0){
                    location.href = 'labour-details.html?id=' + id;
                }else if(app.showType==1){
                    location.href = 'jobmatch-details.html?id=' + id;
                }else if(app.showType==3){
                    location.href = 'association-details.html?id=' + id;
                }
            },
            srh: function () {
                var _this = this;
                if(app.showType==0){

                    console.log("app.showType==0");
                    _this.searchMode = true;
                    _this.pageIndex = 1;
                    _this.init();
                }else if(app.showType==1){

                    console.log("app.showType==1");
                    _this.matchSearchMode = true;
                    _this.matchPageIndex = 1;
                    _this.jobMatch();
                }else if(app.showType==3){
                    console.log("app.showType==3");
                    _this.associationSearchMode = true;
                    _this.associationPageIndex = 1;
                    _this.association();
                }
            },

            submitFeature: function(){

            },
            selectFeature: function(){

            }
        }
    });
    app.init();

    window.onscroll = function(){
        var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        if(scrolltop + clientHeight  == document.body.clientHeight){

            if(app.showType == 0){
                if (app.pageIndex <= app.pageCount){
                    app.init();
                }else{
                    console.log("招聘会列表到底儿了!");
                    app.bottomTxt = '到底儿了~';
                }
            }else if(app.showType == 1){

                if (app.matchPageIndex <= app.matchPageCount){
                    app.jobMatch();
                }else{
                    console.log("没有更多岗位了!");
                    app.matchBottomTxt = '没有更多岗位了！~';
                }

            }else if(app.showType == 2){

            }else if(app.showType == 3){
                if (app.associationPageIndex <= app.associationPageCount){
                    app.association();
                }else{
                    console.log("就业指导列表到底儿了!");
                    app.associationBottomTxt = '到底儿了~';
                }
            }

        }
    }


});
