<template>
    <div style="padding-bottom: 60px; min-height:100vh;">
        <mu-popup position="top" :overlay="false" popupClass="toast-button" :open="toast" @close="hideToast">
            {{toastMessage}}
        </mu-popup>
        <!-- 工作区 -->
        <div class="work-area" layout="row" layout-align="center start">
            <div id="workArea" ref="workArea" :style="{height: WA.view.height+'px'}">
                <img class="work-area-back" :src="WA.backImg | fileSrc" :style="{
                '-webkit-filter': 'blur(' + WA.backImg.blur + 'px) brightness('+ WA.backImg.brightness +'%)', 
                'filter': 'blur(' + WA.backImg.blur + 'px) brightness('+ WA.backImg.brightness +'%)'}"/>
                <file-slice v-show="canEditBackImg" id="backImgRef" @click="canEditBackImg = false" :value="WA.backImg" :proportion="backImgProportion"> </file-slice>

                 <!-- 图片 -->
                <div v-for="(pic,index) in WA.pictures" class="dynamic-pic-box" :key="index" :data-index="index" 
                v-touch:move="move" v-touch:end="end" v-touch:scale="scale" :ref="'pictures_'+index" 
                :style="{zIndex: index+1, width: pic.width+'px', height: pic.height+'px', left: pic.left+'px', 
                top: pic.top+'px', borderRadius: pic.borderRadius+'%'}" @keyup.down="aa">
                    <div class="box-relative">
                        <img class="dynamic-pic" :src="pic | fileSrc" v-show="pic.base64" 
                        :style="{borderRadius: pic.borderRadius+'%'}" />
                        <file-slice :value="pic" :proportion="{w:1, h:1}"> </file-slice>
                        <m-icon v-if="canEdit" @click.native.stop="editPic(index)" xlink="#icon-edit-back"></m-icon>
                    </div>
                </div>
                <!-- 文本 -->
                <div v-for="(txt,index) in WA.texts" class="dynamic-text-box" :key="index" :data-index="index" 
                v-touch:move="textMove" v-touch:end="end" :ref="'texts_'+index" 
                :style="{zIndex: index+1, width: txt.width+'px', height: txt.height+'px', left: txt.left+'px', top: txt.top+'px', 
                'border-color': canEdit?'rgba(0, 0, 0, 0.5)':'transparent'}" 
                >
                    <div class="box-relative">
                        <textarea v-model="txt.value" :style="{'color': txt.color,'font-size': txt.fontSize + 'px', 'line-height':(txt.fontSize+4)+'px', 'font-weight': txt.fontBold?'bold':'normal',
                        'text-decoration': txt.fontUnderline ? 'underline':(txt.fontLineThrough?'line-through':'none'), 
                        'font-style': txt.fontItalic ? 'italic': 'normal'}"></textarea>
                        <m-icon v-if="canEdit" v-touch:move="textWH" v-touch:end="end" :ref="'texts_icon_'+index"  @click.native.stop="editText(index)" xlink="#icon-edit-back"></m-icon>
                    </div>
                </div>
            </div>
        </div>

        <!-- 操作栏 -->
        <div class="nav-area" layout="row" layout-align="space-between center">
            <div class="add-picture" flex="20" @click="addPic">
                <m-icon xlink="#icon-add-pic"></m-icon>
                <p>添加图片</p>
            </div>
            <div class="remove-picture" flex="20" @click="addText">
                <m-icon xlink="#icon-add-text"></m-icon>
                <p>添加文字</p>
            </div>
            <div class="make-picture" >
                <div class="make-picture-btn" @click="preview" layout="column" layout-align="center center">
                    <m-icon xlink="#icon-kuaizhao"></m-icon>
                </div>
            </div>
            <div class="more-tpl" flex="20">
                <m-icon xlink="#icon-tpl-center"></m-icon>
                <p>更多模板</p>
            </div>
            <div class="edit-back" flex="20" @click="editBackVisible = true">
                <m-icon xlink="#icon-edit-back"></m-icon>
                <p>编辑背景</p>
            </div>
        </div>

        <!-- 编辑图片 -->
        <mu-popup position="bottom" popupClass="edit-back-popup" overlayColor="transparent" :open="editPictureVisible" @close="editPictureVisible=false">
            <edit-picture  ref="editPicture" :current-picture="WA.currentPicture" @remove="removePic"></edit-picture>
        </mu-popup>

        <!-- 编辑文本 -->
        <mu-popup position="bottom" popupClass="edit-back-popup" overlayColor="transparent" :open="editTextVisible" @close="editTextVisible=false">
            <edit-text  ref="editText" :current-text="WA.currentText" @remove="removeText"></edit-text>
        </mu-popup>

        <!-- 编辑背景 -->
        <mu-popup position="bottom" popupClass="edit-back-popup" overlayColor="transparent" :open="editBackVisible" @close="editBackVisible=false">
            <div class="edit-back-box">
                <mu-switch label="更换背景" labelLeft labelClass="color-white" v-model="canEditBackImg" class="demo-switch" />
            </div>
        </mu-popup>
    </div>
</template>
<script>
import $ from 'jquery';
import HtmlCuter from 'plugin/HtmlCuter';
import fileSlice from 'components/file-slice';
import editPicture from './edit-picture';
import editText from './edit-text';
import Picture from '../model/picture';
import Text from '../model/text';
import store from '../store';
export default {
    components: {
        fileSlice,
        [editPicture.name]: editPicture,
        [editText.name]: editText
    },
    data() {
        return {
            WA_Width: 0,
            canEditBackImg: true,
            canEdit: true,
            toast: false,
            toastMessage: '',
            editBackVisible: false,
            editPictureVisible: false,
            editTextVisible: false,
            firstTouch: {
                top: null,
                left: null,
                height: 0,
                width: 0
            },
            point1: null, // 触控点1
            point2: null // 触控点2
        };
    },
    watch: {
    },
    computed: {
        // 工作区
        WA() {
            return store.state.WA;
        },
        // 宽高比
        backImgProportion() {
            return {
                w: this.$route.params.width * 1,
                h: this.$route.params.height * 1
            };
        }
    },
    methods: {
        aa(event) {
            console.info(event.which);
        },
        showToast(msg) {
            this.toastMessage = msg;
            this.toast = true;
            if (this.toastTimer) clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => { this.toast = false; }, 2000);
        },
        hideToast() {
            this.toast = false;
            if (this.toastTimer) clearTimeout(this.toastTimer);
        },
        // 添加图
        addPic() {
            if (this.WA.pictures.length > 2) {
                this.showToast('最多添加9张图');
            } else {
                var obj = new Picture({
                    index: this.WA.pictures.length,
                    left: (this.WA.pictures.length % 3) * 110 + 20,
                    top: Math.floor(this.WA.pictures.length / 3) * 110 + 20
                });
                this.WA.pictures.push(obj);
            }
        },
        // 编辑图片
        editPic(index) {
            this.editPictureVisible = true;
            this.WA.currentPicture = this.WA.pictures[index];
        },
        // 移除图
        removePic() {
            this.editPictureVisible = false;
            let index = this.WA.currentPicture.index;
            this.WA.pictures = this.WA.pictures.filter(t => {return t.index != index;});
        },
        // 添加文本
        addText() {
            if (this.WA.texts.length < 9) {
                var obj = new Text(this.WA.texts.length);
                this.WA.texts.push(obj);
            } else {
                this.showToast('最多添加9张图片');
            }
        },
        // 移除文本
        removeText() {
            this.editTextVisible = false;
            let index = this.WA.currentText.index;
            this.WA.texts = this.WA.texts.filter(t => {return t.index != index;});
        },
        // 编辑文本
        editText(index) {
            this.editTextVisible = true;
            this.WA.currentText = this.WA.texts[index];
        },
        // 预览
        preview() {
            var self = this;
            self.canEdit = false;
            self.$nextTick(function() {
                HtmlCuter.htmlToCanvas(document.querySelector('#workArea'), function(img) {
                    store.commit('updatePreviewImage', img);
                    self.$router.push({name: 'preview'});
                });
            });
        },
        // ------------------------------------------------------------------------------
        initViewSize() {
            this.WA.view.width = this.$refs.workArea.clientWidth;
            this.WA.view.height = this.WA.view.width / this.backImgProportion.w * this.backImgProportion.h;
        },
        // 图像移动
        move(evt) {
            let index = $(evt.target).closest('.dynamic-pic-box').attr('data-index');
            let dynamicBox = this.$refs['pictures_' + index][0];
            let eventTouch = evt.touches[0];
            if (!this.firstTouch.top || !this.firstTouch.left) {
                this.firstTouch.top = eventTouch.clientY;
                this.firstTouch.left = eventTouch.clientX;
                this.firstTouch.height = this.firstTouch.top - dynamicBox.offsetTop;
                this.firstTouch.width = this.firstTouch.left - dynamicBox.offsetLeft;
            }
            this.WA.pictures[index].top = eventTouch.clientY - this.firstTouch.height;
            this.WA.pictures[index].left = eventTouch.clientX - this.firstTouch.width;
            this.checkPosition(index);
            evt.stopPropagation();
            evt.preventDefault();
        },
        // 文本移动
        textMove(evt) {
            let index = $(evt.target).closest('.dynamic-text-box').attr('data-index');
            let dynamicBox = this.$refs['texts_' + index][0];
            let eventTouch = evt.touches[0];
            if (!this.firstTouch.top || !this.firstTouch.left) {
                this.firstTouch.top = eventTouch.clientY;
                this.firstTouch.left = eventTouch.clientX;
                this.firstTouch.height = this.firstTouch.top - dynamicBox.offsetTop;
                this.firstTouch.width = this.firstTouch.left - dynamicBox.offsetLeft;
            }
            this.WA.texts[index].top = eventTouch.clientY - this.firstTouch.height;
            this.WA.texts[index].left = eventTouch.clientX - this.firstTouch.width;
            this.checkTextPosition(index);
            evt.preventDefault();
        },
        // 文本宽高
        textWH(evt) {
            let index = $(evt.target).closest('.dynamic-text-box').attr('data-index');
            let eventTouch = evt.touches[0];
            if (!this.firstTouch.top || !this.firstTouch.left) {
                this.firstTouch.top = eventTouch.clientY;
                this.firstTouch.left = eventTouch.clientX;
                this.firstTouch.width = this.WA.texts[index].width;
                this.firstTouch.height = this.WA.texts[index].height;
            }
            if (this.checkTextIconPosition(eventTouch, index)) {
                this.WA.texts[index].height = this.firstTouch.height + (eventTouch.clientY - this.firstTouch.top);
                this.WA.texts[index].width = this.firstTouch.width + (eventTouch.clientX - this.firstTouch.left);
            }
            evt.stopPropagation();
            evt.preventDefault();
        },
        end() {
            this.firstTouch.top = null;
            this.firstTouch.left = null;
            this.firstTouch.width = 0;
            this.firstTouch.height = 0;
        },
        // 缩放
        scale(evt) {
            let index = $(evt.target).closest('.dynamic-pic-box').attr('data-index');
            let dynamicBox = this.$refs['pictures_' + index][0];
            if (this.point1 && this.point2) {
                let scale = this.distance(evt.touches);
                let oldSize = {
                    width: this.WA.pictures[index].width,
                    height: this.WA.pictures[index].height
                };
                let newSize = {
                    width: oldSize.width * scale,
                    height: oldSize.height * scale
                };
                this.WA.pictures[index].width = newSize.width;
                this.WA.pictures[index].height = newSize.height;

                this.WA.pictures[index].left = dynamicBox.offsetLeft - ((newSize.width - oldSize.width) / 2);
                this.WA.pictures[index].top = dynamicBox.offsetTop - ((newSize.height - oldSize.height) / 2);
            };
            this.point1 = JSON.stringify(evt.touches[0]).length < 3 ? evt.touches[0] : JSON.parse(JSON.stringify(evt.touches[0]));
            this.point2 = JSON.stringify(evt.touches[1]).length < 3 ? evt.touches[1] : JSON.parse(JSON.stringify(evt.touches[1]));
        },
        distance(touches) {
            let oldVal = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
            let newVal = Math.sqrt(Math.pow(this.point1.clientX - this.point2.clientX, 2) + Math.pow(this.point1.clientY - this.point2.clientY, 2));
            let scale = oldVal / newVal;
            return scale;
        },
        // 文本移动校验
        checkTextPosition(index) {
            if (this.WA.texts[index].top < 0) { // top 校验
                this.WA.texts[index].top = 0;
            } else if (this.WA.texts[index].top + this.WA.texts[index].height > this.WA.view.height) {
                this.WA.texts[index].top = this.WA.view.height - this.WA.texts[index].height;
            };
            if (this.WA.texts[index].left < 0) { // left 校验
                this.WA.texts[index].left = 0;
            } else if (this.WA.texts[index].left + this.WA.texts[index].width > this.WA.view.width) {
                this.WA.texts[index].left = this.WA.view.width - this.WA.texts[index].width;
            };
        },
        // 文本操作按钮移动校验
        checkTextIconPosition(eventTouch, index) {
            if (eventTouch.clientY < this.WA.texts[index].top) { // top 校验
                return false;
            } else if (eventTouch.clientY > this.WA.view.height) {
                return false;
            };
            if (eventTouch.clientX < this.WA.texts[index].left) { // top 校验
                return false;
            } else if (eventTouch.clientX > this.WA.view.width) {
                return false;
            };
            return true;
        },
        // 图片移动校验
        checkPosition(index) {
            if (this.WA.pictures[index].top < 0) { // top 校验
                this.WA.pictures[index].top = 0;
            } else if (this.WA.pictures[index].top + this.WA.pictures[index].height > this.WA.view.height) {
                this.WA.pictures[index].top = this.WA.view.height - this.WA.pictures[index].height;
            };
            if (this.WA.pictures[index].left < 0) { // left 校验
                this.WA.pictures[index].left = 0;
            } else if (this.WA.pictures[index].left + this.WA.pictures[index].width > this.WA.view.width) {
                this.WA.pictures[index].left = this.WA.view.width - this.WA.pictures[index].width;
            };
        }
    },
    // 组件首次挂载 钩子函数
    mounted() {
        this.initViewSize();
    },
    // 组件激活 钩子函数
    activated() {
        this.canEdit = true;
    }
};
</script>
<style lang="less">
    @import '~styles/_style';
    body {
        min-height: 100vh;
        font-size: 16px;
    }
    .toast-button {
        top: 0;
        border-radius: 0;
    }
    .work-area {
        #workArea {
            width: 100vw;
            height: 500px;
            box-sizing: border-box;
            position: relative;
            img.work-area-back {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 0;
            }
            .dynamic-pic-box {
                position: absolute;
                background-color: fade(white, 70%);
                .icon {
                    border-radius: 50%;
                    position: absolute;
                    bottom: -15px;
                    right: -15px;
                    height: 30px;
                    width: 30px;
                    padding: 2px;
                    color: white;
                    background-color: fade(black, 50%);
                    z-index: 10
                }
            }
            div.box-relative {
                box-sizing: border-box;
                height: 100%;
                position: relative;
                textarea {
                    width: 100%;
                    height: 100%;
                    background-color: transparent;
                    font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei';
                }
            }
            .dynamic-text-box {
                position: absolute;
                background-color: transparent;
                border: 1px dashed rgba(0,0,0,.5);
                .icon {
                    border-radius: 50%;
                    position: absolute;
                    bottom: -15px;
                    right: -15px;
                    height: 30px;
                    width: 30px;
                    padding: 2px;
                    color: white;
                    background-color: fade(black, 50%);
                    z-index: 10
                }
            }
        }
    }
    .nav-area {
        transition: all .3s ease;
        color: @dark-gray;
        background-color: #148df6;
        background: -webkit-linear-gradient(left,#148df6,#a744ae);
        background: linear-gradient(90deg,#148df6,#a744ae);
        color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        z-index: 10;
        text-align: center;
        box-shadow: 0 -1px 10px 1px #eee;
        div{
            .icon {
                font-size: 28px;
            }
            p {
                font-size: 12px;
                margin-top: 0;
            }
        }
        .make-picture {
            position: relative;
            height: 60px;
            width: 60px;
            .make-picture-btn {
                .box-shadow(0 0 10px fade(@color-primary, 50));
                position: absolute;
                width: 60px;
                height: 60px;
                top: -20px;
                background-color: @color-primary;
                background: -webkit-linear-gradient(left, #337EE7, #914FB9);
                background: -moz-linear-gradient(left, #337EE7, #914FB9);
                background: -o-linear-gradient(left, #337EE7, #914FB9);
                background: linear-gradient(90deg, #337EE7, #914FB9);
                color: white;
                align-self: flex-start;
                .rounded(50%);
                p {
                    font-size: 12px;
                }
            }
        }
    }
    .edit-back-popup {
        width: 100vw;
        overflow-x: hidden;
        color: white;
        background-color: fade(#000, 30%);
        background: -webkit-linear-gradient(top, fade(#000,60%), fade(#000,30%));
        background: linear-gradient(0, fade(#000,60%), fade(#000,30%));
    }
    .choose-back-img {
        position: relative;
        display: inline-block;
    }
    .color-white {
        color: white;
    }
    .edit-back-box {
        color: white;
        padding: 20px;
    }
</style>
