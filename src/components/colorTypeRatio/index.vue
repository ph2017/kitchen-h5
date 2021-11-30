<template>
<div class="color-ratio">
    <div><span class="label">{{ labelText }}</span></div>
    <ul class="ratio" @click="handleItemClick"> 
        <li v-for="(item, index) in options" 
            :key="index" 
            :data-value="typeof item === 'string' ? item : item.type" 
            :style="{'background-image': getBgColor(item.type)}"
            class="ratio-item">
            <div class="circle" :class="{ active: selectRatio === item || selectRatio === item.type }" ></div>
            <div class="type">{{ item.type }}</div>
            <div class="price" v-show="item.price > 0">+¥{{ item.price }}</div>
        </li>
    </ul>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { getParentNode } from '../../utils/tool'

export default defineComponent({
    name: 'ColorTypeRatio',
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
        const getBgColor = (color) => {
            const colorMap = {
                '黑色': 'linear-gradient(155deg, #474C4A 0%, #222524 100%)',
                '银色': 'linear-gradient(155deg, #EEEEEE 0%, #CCCCCC 100%)',
                '星耀灰': 'linear-gradient(155deg, #C9C9C9 0%, #575757 100%)'
            }
            return colorMap[color]
        }
        return {
            handleItemClick,
            getBgColor
        }
    }
})
</script>
<style lang="less" scoped>
.color-ratio {
    .label {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #33425E;
        font-weight: 600;
        line-height: 1.4;
    }
    .ratio {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        height: 100px;
        padding: 20px 0;
        box-sizing: content-box;
        font-size: 15px;
        &-item {
            position: relative;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 27px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #33425E;
            text-align: center;
            font-weight: 400;
            border: 1px solid #FFFFFF;
            .circle {
                position: absolute;
                top: -4px;
                left: -4px;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                // background-image: linear-gradient(155deg, #474C4A 0%, #222524 100%);
            }
            .type {
                margin-top: 60px;
            }
            .price {
                color: #6A6F79;
            }
        }
        &-item:nth-of-type(3n+0){margin-right: 0;}
    }
    .active {
        border: 3px solid #216DFF;
    }
}
</style>
