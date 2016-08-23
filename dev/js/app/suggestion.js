/**
 * Created by AllanXu on 08/08/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        Config = require('config'),
        _ = require('ajax');

    var app = new Vue({
        el: '#suggestion',
        data: {
            content: '',
            isShow: false
        },
        methods: {
            postAdvise: function(content) {
                if(content!==''){
                    _(Config.SERVICE.SUGGESTION.POST, {
                        "content": content,
                    }, function(data) {
                        app.isShow = true;
                        setTimeout(function () {
                            app.isShow = false;
                            location.href = 'index.html';
                        }, 2000);
                    });
                }
            }
        }
    });
});
