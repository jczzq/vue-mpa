require('vendor/polyfill.js');

import Vue from 'vue';
import App from './app';
import VueRouter from 'vue-router';
import routes from 'routers/make-poster.js';
// muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

// import attachFastClick from 'fastclick';
// attachFastClick.attach(document.body);

import 'filter/filter';
import 'directives/directive.js';
import 'styles/fonts/make-poster.js';
import touch from 'directives/touch';
import mIcon from 'components/m-icon';

// 图标组件
Vue.component('m-icon', mIcon);

Vue.use(touch);
Vue.use(VueRouter);

Vue.config.errorHandler = function(err, vm) {
    var componentName = Vue.util.formatComponentName(vm);
    var propsData = vm.$options.propsData;

    fundebug.notifyError(err, {     // eslint-disable-line
        metaData: {
            componentName: componentName,
            propsData: propsData
        }
    });
};

const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
window.$router = router;
router.beforeEach((to, from, next) => {
    next();
});

new Vue({ // eslint-disable-line
    el: '#app',
    router,
    render: h => h(App)
});
