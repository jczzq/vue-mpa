<template>
    <mt-popup class="chooseBank popup-right" :value="show" @input="(val) => {$emit('update:show', val)}" position="right">
        <div class="bank-list">
            <div class="search">
                <input type="text" v-model="kw_bank" placeholder="搜索银行">
            </div>
            <div class="result">
                <div class="inline-load text-center" v-show="showBankListLoading">
                    <mt-spinner type="triple-bounce" color="#854399"></mt-spinner>
                </div>
                <p class="no-data" v-if="!bankRstList || bankRstList.length == 0">
                    没有数据...
                    <a v-show="!bankList || bankList.length == 0" @click="initBankList">点击刷新</a>
                </p>
                <div class="rstItem" :class="{choose:item.code == value}" v-for="item in bankRstList" :key="item.code">
                    <p @click="chooseBank(item)">
                        
                    </p>
                </div>
            </div>
        </div>
    </mt-popup>
</template>

<script>
    import apiInitConfig from 'services/api.initConfig.js';
    export default {
        name: 'm-bank',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            value: {
            }
        },
        data() {
            return {
                showBankListLoading: false,
                kw_bank: '',
                bankList: []
            };
        },
        created() {
            // 加载数据
            this.initBankList();
            window.$bankList = this.bankList;
        },
        watch: {
            value(newVal, val) {
                if (newVal) {
                    let currentBank = this.bankList.find(y => {return y.code == newVal;});
                    this.$emit('change', currentBank);
                }
            }
        },
        computed: {
            // 银行搜索结果
            bankRstList() {
                if (this.bankList) {
                    return this.bankList.filter(x => {
                        return x.name.includes(this.kw_bank);
                    });
                } else {
                    return [];
                }
            }
        },
        methods: {
            initBankList() {
                let banks = JSON.parse(window.localStorage.getItem('bank-list') || null);
                if (banks && typeof banks === 'object' && banks.length && banks.length > 0) {
                    this.bankList = banks;
                    console.log('☆ get bankData from localStorage success');
                } else {
                    this.showBankListLoading = true;
                    apiInitConfig.getBankList().then(res => {
                        this.showBankListLoading = false;
                        this.bankList = res.data;
                        window.localStorage.setItem('bank-list', JSON.stringify(this.bankList));
                    }, err => {
                        this.showBankListLoading = false;
                        window.localStorage.removeItem('bank-list');
                    });
                }
            },
            // 选银行
            chooseBank(bank) {
                this.$emit('update:value', bank.code);
                this.$emit('update:show', false);
            }
        }
    };
</script>

<style lang="less">
    @import '~styles/business-regist/index.less';
    .chooseBank {
        .bank-list{
            height:100%;
            overflow-y:auto;
            .choose {background-color:@color-primary; color:white; }
            .search{
                position:absolute;
                top:0;
                padding: 5px;
                height: 50px;
                box-sizing:border-box;
                background-color:@color-primary;
                text-align:center;
                width: 100%;
                input{
                    background-color:white;
                    margin:0;
                    font-size: 14px;
                    padding:0 20px;
                    height: 40px;
                    line-height: 40px;
                    width:90%;
                    border-radius: 25px;
                    box-sizing:border-box;
                    border:1px solid @gray;
                }
            }
            .result{
                margin-top: 50px;
                .rstItem{
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                    padding:0 15px;
                    overflow:hidden;
                    border-bottom:1px solid @border-gay;
                }
                .no-data {
                    text-align: center;
                    padding: 10px;
                }
            }
            
        }
    }
</style>
