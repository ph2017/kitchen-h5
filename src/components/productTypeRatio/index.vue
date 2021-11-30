<template>
    <div class="product-type-param-ratio">
        <ul class="ratio" @click="handleItemClick">
            <li v-for="item in options" :key="item" :data-value="item.name" :class="{ active: selectRatio === item.name }" class="ratio-item">
                <span class="name">{{ item.name }}</span>
                <span class="desc">{{ item.desc }}</span>
                <span class="price">¥{{ toThousands(item.price) }}起</span>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getParentNode } from '../../utils/tool'

export default defineComponent({
    name: 'ProductTypeRatio',
    components: {
        
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        selectRatio: {
            value: String,
            required: true
        }
    },
    emits: ['change'],
    setup(props, context) {
        const handleItemClick = (event) => {
            const node = getParentNode(event.target, 'ratio-item')
            if (node) {
                context.emit('change', {
                    value: props.options.find(item => item.name === node.attributes['data-value'].value)
                })
            }
        }
        const toThousands = (num) => {
            let result = [ ], counter = 0;
            num = (num || 0).toString().split('');
            for (let i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0) { result.unshift(','); }
            }
            return result.join('');
        }
        return {
            handleItemClick,
            toThousands
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
            align-items: flex-start;
            justify-content: flex-start;
            flex-basis: 100%;
            padding: 24px;
            border: 1px solid #E5E7EE;
            border-radius: 8px;
            font-size: 15px;
            margin-bottom: 10px;
            line-height: 1.4;
            .name {
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #33425E;
                font-weight: 600;
            }
            .desc {
                padding-top: 4px;
                font-size: 14px;
                color: #6A6F79;
                font-weight: 400;
            }
            .price {
                padding-top: 19px;
                font-family: Avenir-Heavy;
                font-size: 20px;
                color: #33425E;
                font-weight: 800;
            }
        }
        .active {
            .name {
                color: #216DFF;
            }
        }
        .active {
            border: 3px solid #216DFF;
            border-radius: 8px;
        }
    }
}
</style>
