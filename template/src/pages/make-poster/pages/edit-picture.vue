<template>
    <div class="edit-back-box">
        <p>圆角</p>
        <mu-slider v-model="currentPicture.borderRadius" :min="0" :max="50" class="demo-slider"/>
        <div class="direct-box">
            <div class="text-center">
                <m-icon xlink="#icon-jiantou" @click.native="currentPicture.top -= 1"></m-icon>
            </div>
            <div layout="row" layout-align="space-between center">
                <div class="text-left rotation"><m-icon xlink="#icon-jiantou"  @click.native="currentPicture.left -= 1"></m-icon></div>
                <div class="text-right rotation"><m-icon xlink="#icon-sharp-arrow"  @click.native="currentPicture.left += 1"></m-icon></div>
            </div>
            <div class="text-center">
                <m-icon xlink="#icon-sharp-arrow" @click.native="currentPicture.top += 1"></m-icon>
            </div>
        </div>
        <span class="btn-block" @click.stop="$emit('remove')">移除</span>
    </div>
</template>

<script>
export default {
    name: 'edit-picture',
    props: {
        currentPicture: {
            type: Object
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_style';
    .edit-back-box {
        width: 100%;
        padding: 15px;
        color: white;
        .btn-block {
            margin-top: 20px;
            text-align: center;
            padding: 8px 0;
            border-radius: 50px;
            background-color: #148df6;
            background: -webkit-linear-gradient(left,fade(#148df6,50%),#a744ae);
            background: linear-gradient(90deg,fade(#148df6,50%),#a744ae);
            color: white;
            border: none;
        }
        .direct-box {
            width: 180px;
            height: 180px;
            background-color: fade(#148df6,50%);
            margin: 0 auto;
            border-radius: 50%;
            div {
                height: 60px;
                .icon {
                    height: 40px;
                    width: 40px;
                    margin: 10px;
                }
                .rotation {
                    width:60px;
                    height: 60px;
                    .icon {
                        .rotation(-90deg);
                    }
                    .icon.active {
                        color: #eee;
                    }
                }
            }
        }
    }
</style>
