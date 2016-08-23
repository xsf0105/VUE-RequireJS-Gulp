/**
 * Created by Wenwu on 7/19/2016.
 */
define(function(require){

    var $ = require('jquery');

    function Spinner(){
        $('body').append('<div id="loadingToast" class="weui_loading_toast" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><!-- :) --><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">数据加载中</p></div></div>');
        this.el = $('#loadingToast');
    }

    Spinner.prototype = {
        start: function () {
            $(document.body).css('overflow', 'hidden');
            this.el.show();
        },
        stop: function () {
            $(document.body).css('overflow', 'auto');
            this.el.hide();
        }
    };

    return Spinner;
});