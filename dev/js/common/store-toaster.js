/**
 * Created by AllanXu on 7/31/2016.
 */
define(function(require){

    var $ = require('jquery');

    function StoreToaster(){
        $('body').append('<div id="toast" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">已收藏</p></div>');
        this.el = $('#toast');
        
        $('body').append('<div id="cancelStore" style="display:none;"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">取消收藏</p></div>');
        this.el.cancel = $('#cancelStore');
    }

    StoreToaster.prototype = {
        store: function () {
            var _this = this.el;
            _this.css('display', 'block');
            setTimeout(function () {
                _this.css('display', 'none');
            }, 2000);
        },
        unstore: function () {
            var _this = this.el.cancel;
            _this.css('display', 'block');
            setTimeout(function () {
                _this.css('display', 'none');
            }, 2000);
        }
    };

    return StoreToaster;
});