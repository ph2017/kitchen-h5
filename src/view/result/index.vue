<template>
    <!-- <van-nav-bar
      title="预定成功"
      class="nav-bar"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onNavBack"
    /> -->
    <div class="result-tips-box">
        <div class="result-tips-box-result">
            <div class="logo">
                <!-- <i class="iconfont iconduigou"></i> -->
                <img :src="successPng" alt="">
            </div>
            <div class="result-tips-box-msg">
                预定成功
            </div>
        </div>
        <van-button type="primary" round class="complete-btn" @click="onNavBack">再来一单</van-button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import successPng from '@/assets/success.png'
import {
  NavBar,
  Button
} from 'vant';

export default defineComponent({
    name: 'Result',
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
    },
    setup() {
        const router = useRouter()
        const onNavBack = () => {
            router.replace({
                path: '/goods'
            })
        }
        return {
            onNavBack,
            successPng
        }
    },
})
</script>

<style lang="less">
.result-tips-box {
    position: relative;
    height: 100vh;

    &-result {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%,-50%);
        .logo {
            
        }
    }
    &-msg {
        margin-top: 10px;
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        color: #33425E;
        font-weight: 600;
    }

    .complete-btn {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 335px;
    }
}
</style>