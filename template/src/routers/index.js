const index = resolve => require(['pages/index/index/index.vue'], resolve);

export default [{
    path: '/',
    name: 'index',
    component: index
}, {
    path: '*',
    redirect: {name: 'index'}
}];
