<template>
    <div class="edit-text-box">
        <p>字体大小 {{currentText.fontSize}}px</p>
        <mu-slider v-model="currentText.fontSize" :min="0" :max="50" :step="1" class="demo-slider" />
        <p>字体颜色</p>
        <div class="color-box" layout="row" layout-align="start center" flex-wrap="wrap">
            <div flex="20" class="text-center"  v-for="item in colorList">
                <span class="color-item"  :style="{backgroundColor: item}" @click="currentText.color = item"></span>
            </div>
        </div>
        <p class="title">字体样式</p>
        <div class="font-box" layout="row" layout-align="start center" @click="fontWeight">
            <div class="font-icon bold" :class="{active: currentText.fontBold}"><m-icon xlink="#icon-bold"></m-icon></div>
            <div class="font-icon italic" :class="{active: currentText.fontItalic}"><m-icon xlink="#icon-italic"></m-icon></div>
            <div class="font-icon through" :class="{active: currentText.fontLineThrough}"><m-icon xlink="#icon-line-through"></m-icon></div>
        </div>
        <div class="direct-box">
            <div class="text-center">
                <m-icon xlink="#icon-jiantou" @click.native="currentText.top -= 1"></m-icon>
            </div>
            <div layout="row" layout-align="space-between center">
                <div class="text-left rotation"><m-icon xlink="#icon-jiantou"  @click.native="currentText.left -= 1"></m-icon></div>
                <div class="text-right rotation"><m-icon xlink="#icon-sharp-arrow"  @click.native="currentText.left += 1"></m-icon></div>
            </div>
            <div class="text-center">
                <m-icon xlink="#icon-sharp-arrow" @click.native="currentText.top += 1"></m-icon>
            </div>
        </div>
        <span class="btn-block" @click.stop="$emit('remove')">移除</span>
    </div>
</template>

<script>
// require('plugin/miniColor/miniColor.css');
// require('plugin/miniColor/miniColor.js');
import $ from 'jquery';
export default {
    name: 'edit-text',
    components: {
    },
    props: {
        currentText: {
            type: Object
        }
    },
    data() {
        return {
            colorList: ['#58B7FF', '#13CE66', '#FF4949', '#1F2D3D', '#FFFFFF']
        };
    },
    mounted() {
        // let self = this;
        // $('.color').minicolors({
        //     control: $(this).attr('data-control') || 'hue',
        //     defaultValue: $(this).attr('data-defaultValue') || '',
        //     inline: $(this).attr('data-inline') === 'true',
        //     letterCase: $(this).attr('data-letterCase') || 'lowercase',
        //     opacity: true,
        //     position: $(this).attr('data-position') || 'bottom left',
        //     change: function(hex, opacity) {
        //         if (!hex || !hex.includes('#')) return;
        //         if (!opacity) opacity = 1;
        //         try {
        //             self.currentText.color = self.hexToRgba(hex, opacity);
        //         } catch (e) { }
        //     }
        // });
    },
    methods: {
        hexToRgba(hex, opacity) {
            return 'rgba(' + parseInt('0x' + hex.slice(1, 3), 16) + ',' + parseInt('0x' + hex.slice(3, 5), 16) + ',' + parseInt('0x' + hex.slice(5, 7), 16) + ',' + opacity + ')';
        },
        fontWeight(event) {
            let dom = $(event.target).closest('.font-icon');
            if (dom.hasClass('bold')) {
                this.currentText.fontBold = !this.currentText.fontBold;
            } else if (dom.hasClass('italic')) {
                this.currentText.fontItalic = !this.currentText.fontItalic;
            } else if (dom.hasClass('through')) {
                this.currentText.fontUnderline = false;
                this.currentText.fontLineThrough = !this.currentText.fontLineThrough;
            } else if (dom.hasClass('underline')) {
                this.currentText.fontLineThrough = false;
                this.currentText.fontUnderline = !this.currentText.fontUnderline;
            }
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_style';
    .edit-text-box {
        width: 100%;
        padding: 15px;
        color: white;
        max-height: 80vh;
        padding-bottom: 20px;
        .current-text {
            .text-overflow;
        }
        .color {
            color: white;
        }
        .title {
            margin-top: 5px;
        }
        .font-box {
            height: 40px;
            margin-top: 5px;
            margin-bottom: 15px;
            .font-icon {
                border: 1px dashed white;
                box-sizing: border-box;
                width: 40px;
                height: 40px;
                margin-right: 10px;
                text-align: center;
                .icon {
                    height: 40px;
                    width: 20px;
                    line-height: 40px;
                }
                &.active {
                    border: 1px solid white;
                }
            }
            
        }
        .btn-block {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
            padding: 8px 0;
            border-radius: 50px;
            background-color: #148df6;
            background: -webkit-linear-gradient(left,fade(#148df6,50%),#a744ae);
            background: linear-gradient(90deg,fade(#148df6,50%),#a744ae);
            color: white;
            border: none;
        }
        .color-box {
            margin-top: 10px;
            div{
                height: 50px;
            }
            .color-item {
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .direct-box {
            width: 150px;
            height: 150px;
            background-color: #148df6;
            background: -webkit-linear-gradient(left, fade(#148df6,80%), fade(#a744ae,50%));
            background: linear-gradient(90deg, fade(#148df6,80%), fade(#a744ae,50%));
            margin: 0 auto;
            border-radius: 50%;
            div {
                height: 50px;
                .icon {
                    height: 40px;
                    width: 40px;
                    margin: 5px;
                }
                .rotation {
                    width:50px;
                    height: 50px;
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
