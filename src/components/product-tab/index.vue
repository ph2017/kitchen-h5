<template>
    <ul class="product-tab" @click="handleItemClick">
        <li v-for="item in tabs" :key="item" :data-value="item" :class="{ active: activeTab === item }" class="ratio-item">{{ item }}</li>        
    </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { getParentNode } from '../../utils/tool'

export default defineComponent({
    components: {
        
    },
    props: {
        activeTab: {
            type: String,
            required: true
        },
        tabs: {
            type: Array,
            default: () => []
        }
    },
    emits: ['change'],
    setup(props, context) {
        const handleItemClick = (event) => {
            const node = getParentNode(event.target, 'ratio-item')
            if (node) {
                context.emit('change', {
                    value: node.attributes['data-value'].value
                })
            }
        }
        return {
            handleItemClick
        }
    }
})
</script>
<style lang="less" scoped>
.product-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 54px;
    font-size: 16px;
    color: #6A6F79;
    font-family: MicrosoftYaHei;
    text-align: center;
    font-weight: 400;
    .ratio-item {
        padding: 10px;
    }
    .active {
        font-size: 20px;
        color: #33425E;
        font-weight: 600;
    }
}
</style>
