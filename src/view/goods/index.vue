<template>
  <div class="goods">
    <van-nav-bar
      title="定制我的智能家电"
      class="nav-bar"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onNavBack"
    />
    <van-swipe class="goods-swipe" :autoplay="0">
      <van-swipe-item v-for="item in thumb" :key="item">
        <img :src="item" />
      </van-swipe-item>
    </van-swipe>
    <product-tab v-show="isFirstStage" class="goods-tab" :tabs="tabs" :activeTab="activeTab"/>
    <div class="goods-content">
      
      <div v-show="isFirstStage">
        <div class="step-one" v-show="activeTab === tabs[0]">
          <product-type-ratio class="goods-product-type" :options="productTypeOptions" @change="handleProductTypeChange"/>
        </div>
        <div class="step-two" v-show="activeTab === tabs[1]">
          <type-ratio class="goods-product-type" :options="gasOptions" labelText="选择气源类型" :selectRatio="customData.gasType" @change="handleGasChange"/>
          <type-ratio class="goods-product-type pt15" :options="cleanOptions" labelText="选择清洁类型" :selectRatio="customData.cleanType" @change="handleCleanChange"/>
          <type-ratio class="goods-product-type pt15" :options="controlOptions" labelText="选择机台造型" :selectRatio="customData.controlType" @change="handleControlChange"/>
        </div>
        <div class="step-three" v-show="activeTab === tabs[2]">
          <type-ratio class="goods-product-type" :options="knobOptions" labelText="选择旋钮造型" :selectRatio="customData.knob.type" @change="handleKnobChange"/>
          <type-ratio class="goods-product-type pt15" :options="knobColorOptions" labelText="选择旋钮颜色" :selectRatio="customData.knobColor.type" @change="handleKnobColorChange"/>
          <type-ratio class="goods-product-type pt15" :options="doorOptions" labelText="选择门体" :selectRatio="customData.door.type" @change="handleDoorChange"/>
          <type-ratio class="goods-product-type pt15" :options="trestleOptions" labelText="选择锅架" :selectRatio="customData.trestle.type" @change="handleTrestleChange"/>
          <type-ratio class="goods-product-type pt15" :options="boardOptions" labelText="选择前装饰板" :selectRatio="customData.board.type" @change="handleBoardChange"/>
        </div>
      </div>

      <div v-show="!isFirstStage">
        <div class="match-model">
          <span class="code">
            {{matchModel && matchModel.typeShortName}}
          </span>
          <span class="model-name">
            {{matchModel && matchModel.desc}}
          </span>
        </div>
      </div>

      <part-list class="price-detail" v-show="!isFirstStage" :options="priceDetails" titleText="集成灶配置"/>

    </div>
    <van-submit-bar
      v-show="isFirstStage"
      :price="totalPriceDisplay"
      :disabled="false"
      button-text="下一步"
      @submit="onNext"
    />
    <van-action-bar v-show="!isFirstStage">
      <div class="van-submit-bar__text">
        <span>合计：</span>
        <span class="van-submit-bar__price">
          ¥
          <span class="van-submit-bar__price-integer">
            {{totalPriceTemp}}
          </span>
        </span>
      </div>
      <van-action-bar-button type="warning" text="加入心愿单" @click="noProcess"/>
      <van-action-bar-button type="danger" text="我要预订" @click="noProcess" />
    </van-action-bar>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductTab from '../../components/product-tab'
import ProductTypeRatio from '../../components/productTypeRatio'
import TypeRatio from '../../components/typeRatio'
import PartList from '../../components/partList'
import productCategroy from '../../productJson/productCategroy'
import product from '../../productJson/product'
import part from '../../productJson/part'
import img1 from '../../../public/10211.webp'
import img2 from '../../../public/10212.webp'
// import part from '../../productJson/part'
const TABS = ['款式', '功能', '外观']
const priceKeys = ['knob', 'knobColor', 'door', 'trestle', 'board']

import {
  Swipe,
  SwipeItem,
  SubmitBar,
  NavBar,
  Toast,
  ActionBar,
  ActionBarButton
} from 'vant';

export default defineComponent({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [ActionBar.name]: ActionBar,
    [ActionBarButton.name]: ActionBarButton,
    ProductTab,
    ProductTypeRatio,
    TypeRatio,
    PartList
  },

  setup() {
    const router = useRouter()
    const activeTab = ref(TABS[0])
    const tabs = ref(TABS)
    const productCategroyData = ref(productCategroy)
    const productData = ref(product)
    const partData = ref(part)
    const customData = reactive({
      model: '',
      gasType: '',
      cleanType: '',
      controlType: '',
      knob: {},
      knobColor: {},
      door: {},
      trestle: {},
      board: {}
    })
    const thumb = ref([
      img1, img2
    ])
    const productTypeOptions = computed(() => {
      return Object.keys(productCategroyData.value).map(name => {
        const matchProduct = productData.value.filter(item => item.model === name).sort((a, b) => a.price - b.price)
        const result = {
          name,
        }
        if (matchProduct.length > 0) {
          result.price = matchProduct[0].price
        } else {
          result.price = ''
        }
        return result
      })
    })
    const totalPriceTemp = computed(() => {
      return priceKeys.reduce((accu, curr) => {
        if (customData[curr].type) {
          accu += customData[curr].price
        }
        return accu = parseFloat(accu.toFixed(2))
      }, typeof customData.price === 'number' ? customData.price : 0)
       
    })
    const totalPriceDisplay = computed(() => totalPriceTemp.value * 100)
    const handleProductTypeChange = ({value}) => {
      console.log('value = ', value)
      customData.model = value.name
      customData.price = value.price
      // console.log('customData = ', customData.model)
    }
    const onNext = () => {
      const currentIndex = tabs.value.indexOf(activeTab.value)
      if (currentIndex === 0) {
        if (!customData.model) {
          Toast('请先选择款式')
          return
        }
      } else if (currentIndex === 1) {
        if (!customData.gasType) {
          Toast('请先选择气源类型')
          return
        }
        if (!customData.cleanType) {
          Toast('请先选择清洁类型')
          return
        }
        if (!customData.controlType) {
          Toast('请先选择机台类型')
          return
        }
      } else if (currentIndex === 2) {
        if (!customData.knob.type) {
          Toast('请先选择旋钮造型')
          return
        }
        if (!customData.knobColor.type) {
          Toast('请先选择旋钮颜色')
          return
        }
        if (!customData.door.type) {
          Toast('请先选择门体')
          return
        }
        if (!customData.trestle.type) {
          Toast('请先选择锅架')
          return
        }
        if (!customData.board.type) {
          Toast('请先选择前装饰板')
          return
        }
      }
      if (currentIndex + 1 >= tabs.value.length) {
        activeTab.value = ''
      } else {
        activeTab.value = tabs.value[currentIndex + 1]
      }
      // console.log('next activeTab = ', activeTab.value)
    }
    const onNavBack = () => {
      router.go(-1)
    }
    const gasOptions = computed(() => {
      // console.log('customData = ', customData)
      // console.log('productCategroyData = ', productCategroyData.value)
      if (customData.model) {
        return productCategroyData.value[customData.model].gasTypes
      }
      return []
    })
    const cleanOptions = computed(() => {
      if (customData.model) {
        return productCategroyData.value[customData.model].cleanTypes
      }
      return []
    })
    const controlOptions = computed(() => {
      if (customData.model) {
        return productCategroyData.value[customData.model].controlTypes
      }
      return []
    })
    const knobOptions = computed(() => {
      return partData.value.knobs.filter(item => item.detail === 'style')
    })
    const knobColorOptions = computed(() => {
      return partData.value.knobs.filter(item => item.detail === 'color')
    })
    const doorOptions = computed(() => {
      return partData.value.doors
    })
    const trestleOptions = computed(() => {
      return partData.value.trestles
    })
    const boardOptions = computed(() => {
      return partData.value.boards
    })

    const handleGasChange = (param) => {
      customData.gasType = param.data.value
    }
    const handleCleanChange = (param) => {
      customData.cleanType = param.data.value
    }
    const handleControlChange = (param) => {
      customData.controlType = param.data.value
    }
    const handleKnobChange = (param) => {
      customData.knob = knobOptions.value.find(item => item.type === param.data.value)
    }
    const handleKnobColorChange = (param) => {
      customData.knobColor = knobColorOptions.value.find(item => item.type === param.data.value)
    }
    const handleDoorChange = (param) => {
      customData.door = doorOptions.value.find(item => item.type === param.data.value)
    }
    const handleTrestleChange = (param) => {
      customData.trestle = trestleOptions.value.find(item => item.type === param.data.value)
    }
    const handleBoardChange = (param) => {
      customData.board = boardOptions.value.find(item => item.type === param.data.value)
    }
    const isFirstStage = computed(() => {
      return !!activeTab.value
    })
    const matchModel = computed(() => {
      const match = productData.value.find(item => item.model === customData.model && item.cleanType === customData.cleanType && item.gasType === customData.gasType && item.controlType === customData.controlType)
      console.log('match = ', match)
      return match
    })
    const priceDetails = computed(() => {
      const prices = []
      if (matchModel.value) {
        prices.push({
          name: '型号',
          value: matchModel.value.type,
          price: matchModel.value.price
        })
      }
      if (customData.knob) {
        prices.push({
          name: '旋钮造型&颜色',
          value: `${customData.knob.type}&${customData.knobColor.type}`,
          price: `+¥${customData.knob.price + customData.knobColor.price}`
        })
      }
      if (customData.door) {
        prices.push({
          name: '门体',
          value: customData.door.type,
          price: `+¥${customData.door.price}`
        })
      }
      if (customData.trestle) {
        prices.push({
          name: '锅支架',
          value: customData.trestle.type,
          price: `+¥${customData.trestle.price}`
        })
      }
      if (customData.board) {
        prices.push({
          name: '前装饰板',
          value: customData.board.type,
          price: `+¥${customData.board.price}`
        })
      }
      return prices
    })
    const noProcess = () => {
      Toast('暂无处理')
    }

    return {
      activeTab,
      tabs,
      thumb,
      customData,
      productTypeOptions,
      handleProductTypeChange,
      onNext,
      onNavBack,
      totalPriceTemp,
      totalPriceDisplay,
      gasOptions,
      cleanOptions,
      controlOptions,
      knobOptions,
      knobColorOptions,
      doorOptions,
      trestleOptions,
      boardOptions,
      handleGasChange,
      handleCleanChange,
      handleControlChange,
      handleKnobChange,
      handleKnobColorChange,
      handleDoorChange,
      handleTrestleChange,
      handleBoardChange,
      isFirstStage,
      matchModel,
      priceDetails,
      noProcess
    }
  },
})
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border: none;
  }
  &-swipe {
    // height: 230px;
    padding-top: 46px;
    img {
      height: 100%;
      width: 100%;
      display: block;
    }
  }

  &-tab {
    padding: 10px;
  }
  &-content {
    background: #fff;
    // height: calc(~'100vh - 380px');
    // overflow: auto;
    padding: 0 5px;
    &-product-type {
      padding: 10px;
    }
    .pt15 {
      padding-top: 15px;
    }
    .match-model {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-top: 1px solid rgba(237,237,237);
      border-bottom: 1px solid rgba(237,237,237);
      margin-top: 5px;
      .code {
        font-weight: bold;
        padding: 0 20px 0 15px;
      }
      .model-name {
        text-align: center;
      }
    }
    .price-detail {
      margin-top: 10px;
      padding: 5px;
    }
  }
  .van-submit-bar__bar {
    border-top: 1px solid rgba(237,237,237);
    .van-submit-bar__text {
      text-align: left;
      .van-submit-bar__price {
        color: #000;
      }
    }
  }
  .van-action-bar {
    border-top: 1px solid rgba(237,237,237);
    .van-submit-bar__text {
      flex: 2;
      text-align: left;
      padding-left: 15px;
    }
    .van-submit-bar__price {
      color: #000;
    }
    .van-action-bar-button--warning {
      background: #fff;
      color: #000;
      border: 1px solid #000;
    }
  }
}
</style>
