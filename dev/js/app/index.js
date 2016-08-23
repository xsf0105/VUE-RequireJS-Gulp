/**
 * Created by AllanXu on 7/25/2016.
 */
define(function(require) {
    var Vue = require('vue'),
        VueSwipe = require('vueSwipe');
    
    var app = new Vue({
        el: '#index',
        components: {
            'swipe': VueSwipe.Swipe,
            'swipe-item': VueSwipe.SwipeItem
        }
    });

});