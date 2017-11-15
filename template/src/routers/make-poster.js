const index = resolve => require(['pages/make-poster/pages/index'], resolve);
const choose = resolve => require(['pages/make-poster/pages/choose'], resolve);
const tplCenter = resolve => require(['pages/make-poster/pages/tpl-center'], resolve);
const preview = require('pages/make-poster/pages/preview');

export default [{
    path: '/index/:width/:height',
    name: 'index',
    component: index,
    meta: {level: 1}
}, {
    path: '/choose',
    name: 'choose',
    component: choose,
    meta: {level: 0}
}, {
    path: '/preview',
    name: 'preview',
    component: preview,
    meta: {level: 2}
}, {
    path: '/tplcenter',
    name: 'tplCenter',
    component: tplCenter,
    meta: {level: 1}
}, {
    path: '*',
    redirect: {name: 'choose'}
}];
