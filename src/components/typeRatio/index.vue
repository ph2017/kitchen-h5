<template>
<div class="product-param-ratio">
    <div><span class="label">{{ labelText }}</span></div>
    <ul class="ratio" @click="handleItemClick">
        <li v-for="(item, index) in options" :key="index" :data-value="typeof item === 'string' ? item : item.type" :class="{ active: selectRatio === item || selectRatio === item.type }" class="ratio-item" :style="{width: itemWidth}">
            <span v-if="typeof item === 'string'">
                {{ item }}
            </span>
            <div v-else class="part-box">
                <span>{{ item.type }}</span>
                <span>+¥{{ item.price }}</span>
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
            return props.options.length === 1 ? '100%' : props.options.length >= 3 ? 'calc((100% - 16px) / 3)' : 'calc((100% - 16px) / 2)';
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
        font-size: 13px;
    }
    .ratio {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 8px 0;
        font-size: 15px;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 3px;
            text-align: center;
            border: 2px solid rgb(5, 5, 5);
            margin: 8px 8px 0 0;
            box-sizing: border-box;
            .part-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
        &-item:nth-of-type(3n+0){margin-right: 0;}
    }
    .active {
        border-color: rgb(83, 117, 221);
    }
}
</style>
