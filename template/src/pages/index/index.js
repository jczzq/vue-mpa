require('es6-promise').polyfill();
import 'vendor/polyfill.js';
import Vue from 'vue';
import App from './app';
import 'styles/_style.less';

import knife from 'vendor/knife.js';
Vue.prototype.$knife = Vue.$knife = knife;

import FastClick from 'fastclick';
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
console.log('process.env.DATA_ENV', process.env.DATA_ENV);  // => test
console.log('process.env.NODE_ENV', process.env.NODE_ENV);  // => development

// Vuex
import store from 'store/index';

// 路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from 'routers/index';
const router = new VueRouter({
    routes
});

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    store,
    render: h => h(App)
});
