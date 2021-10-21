<template>
    <div class="product-type-param-ratio">
        <ul class="ratio" @click="handleItemClick">
            <li v-for="item in options" :key="item" :data-value="item.name" :class="{ active: selectRatio === item.name }" class="ratio-item">
                <span class="name">{{ item.name }}</span>
                <span class="desc">此处加入款式内容介绍</span>
                <span class="price">¥{{ item.price }}起</span>
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
        return {
            selectRatio,
            handleItemClick
        }
    }
})
</script>
<style lang="less" scoped>
.product-type-param-ratio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    .ratio {
        width: 100%;
        .ratio-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-basis: 100%;
            padding: 10px 0;
            border: solid 2px rgba(237,237,237);
            font-size: 15px;
            line-height: 1.9;
            margin-bottom: 5px;
            .name {
                font-weight: bold;
            }
            .desc {
                line-height: 1.3;
            }
            .price {
                color: #777;
            }
        }
        .active {
            border-color: rgb(83, 117, 221);
        }
    }
}
</style>
