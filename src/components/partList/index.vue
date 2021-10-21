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
                    <span class="price">{{ item.price }}</span>
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
        return {
            selectRatio,
            handleItemClick
        }
    }
})
</script>
<style lang="less" scoped>
.part-list {
    width: 100%;
    box-sizing: border-box;
    .title {
        font-weight: bold;
    }
    .list-ul {
        .list-li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid rgba(237,237,237);
            line-height: 1.5;
            .left {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                .name {
                    color: #777;
                    font-size: 14px;
                }
                .value {
                    font-size: 15px;
                }
            }
            .right {

            }
        }
    }
}
</style>
