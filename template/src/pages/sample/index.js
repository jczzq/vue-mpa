import Vue from 'vue';
import App from './app';
import 'styles/_style.less';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import FastClick from 'fastclick';
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 路由
import routes from 'routers/sample';
const router = new VueRouter({
    routes
});

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    render: h => h(App)
});
