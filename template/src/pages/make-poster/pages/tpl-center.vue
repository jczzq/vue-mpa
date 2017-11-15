<template>
    <div class="template-area" ref="tplChoose" layout="row" layout-align="start center" >
        <div v-show="!tplVisible" class="template-icon" @click.stop="tplVisible = true">
            左
        </div>
        <div v-show="tplVisible" class="template-icon" @click.stop="tplVisible = false">
            右
        </div>
        <div class="template-box"  layout="row" layout-align="start center">
            <div v-for="(item, index) in templateList" @click="chooseTemplate(item)" :key="index" class="template-item">
                <img :src="item.backImg | mSrc(300, 400)"/>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store';
export default {
    data() {
        return {
            tplVisible: false,
            templateList: [{
                id: 1001,
                backImg: 6605612623619825
            }, {
                id: 1002,
                backImg: 6605612625783904
            }, {
                id: 1003,
                backImg: 6605612329765138
            }, {
                id: 1007,
                backImg: 6605612625783904
            }]
        };
    },
    computed: {
        imgSrc() {
            return store.state.previewImage;
        }
    },
    methods: {
        hideToast() {
            this.toast = false;
        },
        // 选择背景
        chooseTemplate(tpl) {
            this.WA.backImg.id = tpl.backImg;
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_style';
    .template-area {
        transition: all .3s ease;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        background-color: white;
        z-index: 20;
        .template-icon {
            line-height: 100px;
            text-align: center;
            padding: 0 10px;
            height: 100px;
            font-size: 30px;
        }
        .template-box {
            height: 100px;
            white-space: nowrap;
            overflow-x: auto;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            .template-item {
                height: 80px;
                margin: 0 1vw;
                img {
                    width: 70px;
                    height: 100%;
                }
            }
        }
    }
</style>
