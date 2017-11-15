<template>
    <div>
        <div class="sample-class1">width: 100%; font-size: 50px;</div>
        <div class="sample-class2">width: 750px; font-size: 40px;</div>
        <button @click="sampleClick">请求测试</button>
    </div>
</template>
<script>
import api_sample from 'services/api.sample';
export default {
    name: 'sample',
    data() {
        return {};
    },
    computed: {},
    methods: {
        sampleClick() {
            api_sample.sample({
                'username': '20573',
                'password': 'MTIzNDU2Nzg=',
                'rememberMe': true
            }).then(res => {
                console.log(res);
            });
        }
    },
    components: {},
    mounted() {}
};
</script>
<style lang="less">
@import '~styles/_agile';
.sample-class {
    &1 {
        width: 100%;
        font-size: 50px;
        background-color: @color-primary;
        color: @white;
    }
    &2 {
        // px2rem
        width: 750px;
        font-size: 40px;
        background-color: @color-green;
    }
}
</style>
