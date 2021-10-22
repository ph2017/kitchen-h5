<template>
    <van-nav-bar
      title="预定成功"
      class="nav-bar"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onNavBack"
    />
    <div class="result-tips-box">
        <div class="result-tips-box-result">
            <div class="logo">
                <i class="iconfont iconduigou"></i>
            </div>
            <div class="result-tips-box-msg">
                预定成功
            </div>
        </div>
        <van-button type="primary" class="complete-btn" @click="onNavBack">再来一单</van-button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
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
            onNavBack
        }
    },
})
</script>

<style lang="less">
.result-tips-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 93vh;

    &-result {
        .logo {
            height: 94px;
            width: 94px;
            margin-top: 17vh;
            background-color: #7EDB42;
            border-radius: 50%;
            text-align: center;
            .iconfont {
                color: #fff;
                font-size: 41px;
                line-height: 2.2;
            }
        }
    }
    &-msg {
        margin-top: 13px;
        font-size: 20px;
        color: #333;
        letter-spacing: 0.49px;
        text-align: center;
    }

    .complete-btn {
        width: 335px;
        margin-bottom: 20px;
        // background-color: @mideaPurple;
        // border-color: @mideaPurple;
    }
}
</style>