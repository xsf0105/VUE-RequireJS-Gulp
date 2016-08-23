/**
 * Created by Wenwu on 7/19/2016.
 */
requirejs.config({
    baseUrl: 'lib',
    paths: {
        'jquery': 'jquery/dist/jquery.min',

        'vue': 'vue/dist/vue.min',
        'config': '../js/common/config',
        'spinner': '../js/common/spinner',

        'ajax': '../js/common/ajax',
        'utilities': '../js/common/utilities',
        'storeToaster': '../js/common/store-toaster',
        'vueSwipe' : '../lib/vue-swiper/dist/vue-swipe',
    },
    shim: {
        'ajax': 'spinner',
        'loadmore': 'vue'
    }
});