<template>
    <div class="preview-box">
        <img :src="imgSrc">
        <div>
            长按保存图片
        </div>
    </div>
</template>

<script>
import store from '../store';
export default {
    data() {
        return {
        };
    },
    computed: {
        imgSrc() {
            return store.state.previewImage;
        }
    }
};
</script>

<style lang="less">
    .preview-box {
        min-height: 100vh;
        text-align: center;
        img {
            margin-top: 4vw;
            width: 92vw;
        }
    }
</style>
