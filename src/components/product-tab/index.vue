<template>
    <ul class="product-tab">
        <li v-for="item in tabs" :key="item" :class="{ active: activeTab === item }">{{ item }}</li>        
    </ul>
</template>

<script>
import { defineComponent } from 'vue'


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
    setup() {
        
    }
})
</script>
<style lang="less" scoped>
.product-tab {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    .active {
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
