<template>
    <div class="part-list">
        <div class="title">{{ titleText }}</div>
        <ul class="list-ul" @click="handleItemClick">
            <li v-for="(item, index) in options" :key="index" class="list-li">
                <div class="left">
                    <span class="name">{{ item.name }}</span>
                    <span class="value">{{ item.value }}</span>
                </div>
                <div class="right">
                    <span class="price">
                        <span v-show="index > 0">+</span>¥{{ toThousands(item.price) }}
                    </span>
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getParentNode } from '../../utils/tool'

export default defineComponent({
    name: 'ProductTypeRatio',
    components: {
        
    },
    props: {
        titleText: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    emits: ['change'],
    setup(props, context) {
        const selectRatio = ref('')
        const handleItemClick = (event) => {
            const node = getParentNode(event.target, 'ratio-item')
            if (node) {
                selectRatio.value = node.attributes['data-value'].value
                context.emit('change', {
                    value: props.options.find(item => item.name === selectRatio.value)
                })
            }
        }
        const toThousands = (num) => {
            let result = [], counter = 0;
            num = (num || 0).toString().split('');
            for (let i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0 && num.length > 3) { result.unshift(','); }
            }
            return result.join('');
        }
        return {
            selectRatio,
            handleItemClick,
            toThousands
        }
    }
})
</script>
<style lang="less" scoped>
.part-list {
    width: 100%;
    box-sizing: border-box;
    .title {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #FFF;
        font-weight: 600;
    }
    .list-ul {
        padding-top: 21px;
        padding-bottom: 11px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        .list-li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #3E3F41;
            line-height: 1.5;
            .left {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                .name {
                    color: #9E9FA1;
                    font-weight: 400;
                }
                .value {
                    margin-top: 8px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #FFF;
                    font-weight: 400;
                }
            }
            .right {
                .price {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #FFF;
                    text-align: right;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>
