<template>
    <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            transitionName: 'slide-right'
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        '$route'(to, from) {
            const toLevel = to.meta.level;
            const fromLevel = from.meta.level;
            // 控制路由切换过渡动画
            if (fromLevel < toLevel) {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = 'slide-right';
            }
        }
    },
    methods: {
        handleResize() {
            var w = document.documentElement.clientWidth;
            document.getElementsByTagName('html')[0].style['font-size'] = Math.min((w / 10).toFixed(1), 1080 / 10) + 'px';
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_style';
    html,body{ margin:0; background-color:@bg-gray; min-height: 100vh; 
        .ctrl {
            font-size: 14px !important;
            height: 50px !important;
        }
    }
</style>
