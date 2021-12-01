<template>
<div class="product-param-ratio">
    <div><span class="label">{{ labelText }}</span></div>
    <ul class="ratio" @click="handleItemClick">
        <li v-for="(item, index) in options" :key="index" :data-value="typeof item === 'string' ? item : item.type" :class="{ active: selectRatio === item || selectRatio === item.type, 'column-two': options.length === 2 }" class="ratio-item" :style="{width: itemWidth}">
            <span v-if="typeof item === 'string'" class="type">
                {{ item }}
            </span>
            <div v-else class="part-box">
                <span class="type">{{ item.type }}</span>
                <span class="price">+¥{{ item.price }}</span>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { getParentNode } from '../../utils/tool'

export default defineComponent({
    name: 'ProductTypeRatio',
    components: {
        
    },
    props: {
        labelText: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        selectRatio: {
            type: String,
            required: true
        }
    },
    emits: ['change'],
    setup(props, context) {
        const handleItemClick = (event) => {
            const node = getParentNode(event.target, 'ratio-item')
            if (node) {
                const data = {
                    value: node.attributes['data-value'].value
                }
                context.emit('change', {
                    data
                })
            }
        }
        const itemWidth = computed(() => {
            return props.options.length === 1 ? 'calc((100% - 16px) / 2)' : props.options.length >= 3 ? 'calc((100% - 16px) / 3)' : 'calc((100% - 16px) / 2)';
        })
        return {
            handleItemClick,
            itemWidth
        }
    }
})
</script>
<style lang="less" scoped>
.product-param-ratio {
    .label {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #FFF;
        font-weight: 600;
        line-height: 1.4;
    }
    .ratio {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 10px 0 20px 0;
        font-size: 15px;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 0;
            text-align: center;
            border: 1px solid #E5E7EE;
            border-radius: 8px;
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #FFF;
            font-weight: 600;
            margin: 10px 8px 0 0;
            box-sizing: border-box;
            height: 70px;
            .part-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .price {
                    margin-top: 2px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #9E9FA1;
                    font-weight: 400;
                }
            }
        }
        &-item:nth-of-type(3n+0){margin-right: 0;}
    }
    .column-two.ratio-item:nth-of-type(2n+0){margin-right: 0;}
    .active {
        border: 3px solid #AF6437;
        .type {
            color: #AF6437;
        }
    }
}
</style>
