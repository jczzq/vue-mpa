import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    // 生成图
    previewImage: null,
    // 工作区
    WA: {
        // 视图
        view: {
            width: 0,
            height: 0
        },
        // 画布
        backImg: {
            id: null,
            base64: null,
            width: 0,
            height: 0
        },
        // 图片列表
        pictures: [],
        // 当前操作图片
        currentPicture: null,
        // 文本列表
        texts: [],
        // 当前操作文本
        currentText: null
    }
};
const mutations = {
    // 更新预览图
    updatePreviewImage(state, base64) {
        state.previewImage = base64;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
