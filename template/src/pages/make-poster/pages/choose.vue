<template>
    <div class="choose-box" layout="column" layout-align="space-around center">
        <div layout="column" layout-align="center center" @click="goTplCenter">
            <p>选择模板</p>
        </div>
        <div layout="column" layout-align="center center" @click="toast = true">
            <p>新建画布</p>
        </div>
        <mu-popup popupClass="toast-box" :open="toast" @close="toast = false">
            <p layout="row" layout-align="space-between center">
                <mu-text-field v-model.number="width" label="画布宽" type="number" labelFloat required/>
                <span class="text-center" flex="20">px</span>
            </p>
            <p layout="row" layout-align="space-between center">
                <mu-text-field v-model.number="height" label="画布高" type="number" labelFloat required/>
                <span class="text-center" flex="20">px</span>
            </p>
            <mu-raised-button label="创 建" class="mgtb-10" labelClass="label-class" fullWidth @click="createPicture"/>
        </mu-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            toast: false,
            width: window.innerWidth,
            height: window.innerWidth
        };
    },
    computed: {
    },
    methods: {
        goTplCenter() {
            this.$router.push({name: 'tplCenter'});
        },
        createPicture() {
            this.toast = false;
            this.$router.push({
                name: 'index',
                params: {
                    width: this.width,
                    height: this.height
                }
            });
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_style';
    .mgtb-10 {
        margin: 10px 0;
    }
    .choose-box {
        padding: 30px 0;
        min-height: 100vh;
        div {
            width: 70vw;
            height: 35vh;
            border-radius: 5px;
            // background-color: fade(#148df6, 50);
            // background: -webkit-linear-gradient(left, fade(#148df6, 80), fade(#a744ae, 90));
            // background: linear-gradient(90deg, fade(#148df6, 80), fade(#a744ae, 90));
            // color: white;
            overflow: hidden;
            p {
                font-size: 18px;
            }
        }
    }
    .toast-box {
        border-radius: 5px;
        overflow: hidden;
        padding: 20px;
        color: #333;
        font-size: 20px;
        width: 70vw;
        .label-class {
            font-size: 16px;
        }
    }
</style>
