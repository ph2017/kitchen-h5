<template>
  <div class="goods">
    <!-- <van-nav-bar
      title="定制我的智能家电"
      class="nav-bar"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onNavBack"
    /> -->
    <!-- <van-swipe class="goods-swipe" :autoplay="0">
      <van-swipe-item v-for="item in thumb" :key="item">
        <img :src="item" />
      </van-swipe-item>
    </van-swipe> -->
    <div class="goods-swipe">
      <img :src="thumb[0]">
    </div>
    <product-tab v-show="isFirstStage" class="goods-tab" :tabs="tabs" :activeTab="activeTab" @change="handleTabChange"/>
    <div class="goods-content">
      
      <div v-show="isFirstStage">
        <div class="step-one" v-show="activeTab === tabs[0]">
          <product-type-ratio class="goods-product-type" :options="productTypeOptions" :selectRatio="customData.model" @change="handleProductTypeChange"/>
        </div>
        <div class="step-two" v-show="activeTab === tabs[1]">
          <type-ratio class="goods-product-type" :options="gasOptions" labelText="选择气源类型" :selectRatio="customData.gasType" @change="handleGasChange"/>
          <type-ratio class="goods-product-type pt15" :options="cleanOptions" labelText="选择清洁类型" :selectRatio="customData.cleanType" @change="handleCleanChange"/>
          <type-ratio class="goods-product-type pt15" :options="controlOptions" labelText="选择机台造型" :selectRatio="customData.controlType" @change="handleControlChange"/>
        </div>
        <div class="step-three" v-show="activeTab === tabs[2]">
          <type-ratio class="goods-product-type" :options="knobOptions" labelText="选择旋钮造型" :selectRatio="customData.knob.type" @change="handleKnobChange"/>
          <color-type-ratio class="goods-product-type pt15" :options="knobColorOptions" labelText="选择旋钮颜色" :selectRatio="customData.knobColor.type" @change="handleKnobColorChange"/>
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
      :disabled="false"
      button-text="下一步"
      @submit="onNext"
    />
    
    <div class="bottom-total-price">
      <span class="money">¥</span>
      {{toThousands(totalPriceTemp)}}
    </div>

    <van-action-bar v-show="!isFirstStage">
      <div class="van-submit-bar__text">
        <!-- <span>合计：</span>
        <span class="van-submit-bar__price">
          ¥
          <span class="van-submit-bar__price-integer">
            {{totalPriceTemp}}
          </span>
        </span> -->
      </div>
      <van-action-bar-button type="warning" text="返回定制" @click="handleBackToSelect"/>
      <van-action-bar-button type="danger" text="我要预订" @click="handleSubmit" />
    </van-action-bar>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ProductTab from '../../components/product-tab'
import ProductTypeRatio from '../../components/productTypeRatio'
import TypeRatio from '../../components/typeRatio'
import PartList from '../../components/partList'
import ColorTypeRatio from '../../components/colorTypeRatio'
import productCategroy from '../../productJson/productCategroy'
import product from '../../productJson/product'
import part from '../../productJson/part'
// import img1 from '../../../public/10211.webp'
// import img2 from '../../../public/10212.webp'
import box1 from '../../../public/box1.png'
import box2 from '../../../public/box2.png'
import box3 from '../../../public/box3.png'
import box4 from '../../../public/box4.png'
import box5 from '../../../public/box5.png'
const TABS = ['款式', '功能', '外观']
const priceKeys = ['knob', 'knobColor', 'door', 'trestle', 'board']
const boxImgs = [box1, box2, box3, box4, box5]


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
    PartList,
    ColorTypeRatio
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
      // img1, img2
      box1
    ])
    const productTypeOptions = computed(() => {
      return Object.keys(productCategroyData.value).map(name => {
        const matchProduct = productData.value.filter(item => item.model === name).sort((a, b) => a.price - b.price)
        const result = {
          name,
          desc: productCategroyData.value[name].desc
        }
        if (matchProduct.length > 0) {
          result.price = matchProduct[0].price
        } else {
          result.price = ''
        }
        return result
      })
    })
    watch(productTypeOptions, (newVal) => {
      if (!customData.model) {
        customData.model = newVal[0].name
      }
    }, {
      immediate: true
    })
    const totalPriceTemp = computed(() => {
      const total = matchModel.value ?  matchModel.value.price : typeof customData.price === 'number' ? customData.price : 0
      return priceKeys.reduce((accu, curr) => {
        if (customData[curr].type) {          
          accu += customData[curr].price
        }
        return accu = parseFloat(accu.toFixed(2))
      }, total)
    })
    const totalPriceDisplay = computed(() => totalPriceTemp.value * 100)
    const handleProductTypeChange = ({value}) => {
      // console.log('value = ', value)
      customData.model = value.name
      customData.price = value.price
      const matchIndex = productTypeOptions.value.findIndex(item => item.name === value.name)
      thumb.value = [boxImgs[matchIndex]]
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
    watch(gasOptions, (newVal) => {
      customData.gasType = newVal[0]
    }, {
      immediate: true
    })

    const cleanOptions = computed(() => {
      if (customData.model) {
        return productCategroyData.value[customData.model].cleanTypes
      }
      return []
    })
    watch(cleanOptions, (newVal) => {
      customData.cleanType = newVal[0]
    }, {
      immediate: true
    })

    const controlOptions = computed(() => {
      if (customData.model) {
        return productCategroyData.value[customData.model].controlTypes[customData.cleanType]
      }
      return []
    })
    watch(controlOptions, (newVal) => {
      customData.controlType = newVal[0]
    }, {
      immediate: true
    })

    partData.value.knobs.sort((a, b) => a.price - b.price)
    const knobOptions = computed(() => {
      return partData.value.knobs.filter(item => item.detail === 'style')
    })
    watch(knobOptions, (newVal) => {
      if (!customData.knob.type) {
        customData.knob = newVal[0]
      }
    }, {
      immediate: true
    })

    const knobColorOptions = computed(() => {
      return partData.value.knobs.filter(item => item.detail === 'color')
    })
    watch(knobColorOptions, (newVal) => {
      if (!customData.knobColor.type) {
        customData.knobColor = newVal[0]
      }
    }, {
      immediate: true
    })

    partData.value.doors.sort((a, b) => a.price - b.price)
    const doorOptions = computed(() => {
      return partData.value.doors
    })
    watch(doorOptions, (newVal) => {
      if (!customData.door.type) {
        customData.door = newVal[0]
      }
    }, {
      immediate: true
    })

    partData.value.trestles.sort((a, b) => a.price - b.price)
    const trestleOptions = computed(() => {
      return partData.value.trestles
    })
    watch(trestleOptions, (newVal) => {
      if (!customData.trestle.type) {
        customData.trestle = newVal[0]
      }
    }, {
      immediate: true
    })

    const boardOptions = computed(() => {
      return partData.value.boards
    })
    watch(boardOptions, (newVal) => {
      if (!customData.board.type) {
        customData.board = newVal[0]
      }
    }, {
      immediate: true
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
    const handleTabChange = (param) => {
      if (activeTab.value) {
        const activeIndex = tabs.value.indexOf(activeTab.value)
        const nextIndex = tabs.value.indexOf(param.value)
        if (activeIndex === 0) {
          if (nextIndex > activeIndex) {
            if (!customData.model) {
              Toast('请先选择款式')
              return
            }
          }
        } else if (activeIndex === 1) {
          if (nextIndex > activeIndex) {
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
          }
        }
      }
      activeTab.value = param.value
    }
    const isFirstStage = computed(() => {
      return !!activeTab.value
    })
    const matchModel = computed(() => {
      const match = productData.value.find(item => item.model === customData.model && item.cleanType === customData.cleanType && item.gasType === customData.gasType && item.controlType === customData.controlType)
      // console.log('match = ', match)
      return match
    })
    const priceDetails = computed(() => {
      const prices = []
      if (matchModel.value) {
        prices.push({
          name: '型号',
          value: matchModel.value.type,
          price: `${matchModel.value.price}`
        })
      }
      if (customData.knob) {
        prices.push({
          name: '旋钮造型&颜色',
          value: `${customData.knob.type}&${customData.knobColor.type}`,
          price: `${customData.knob.price + customData.knobColor.price}`
        })
      }
      if (customData.door) {
        prices.push({
          name: '门体',
          value: customData.door.type,
          price: `${customData.door.price}`
        })
      }
      if (customData.trestle) {
        prices.push({
          name: '锅支架',
          value: customData.trestle.type,
          price: `${customData.trestle.price}`
        })
      }
      if (customData.board) {
        prices.push({
          name: '前装饰板',
          value: customData.board.type,
          price: `${customData.board.price}`
        })
      }
      return prices
    })
    const noProcess = () => {
      Toast('暂无处理')
    }
    const handleBackToSelect = () => {
      activeTab.value = tabs.value[0]
    }
    const handleSubmit = () => {
      router.push({
        path: '/result'
      })
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
      handleTabChange,
      isFirstStage,
      matchModel,
      priceDetails,
      noProcess,
      handleBackToSelect,
      handleSubmit,
      toThousands
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
    display: flex;
    justify-content: center;
    // padding-top: 46px;
    img {
      height: 230px;
      // height: 100%;
      // width: 100%;
      display: block;
    }
  }

  &-tab {
    
  }
  &-content {
    background: #fff;
    // height: calc(~'100vh - 380px');
    // overflow: auto;
    padding: 20px;
    &-product-type {
      // padding: 10px;
    }
    .pt15 {
      padding-top: 15px;
    }
    .match-model {
      display: flex;
      align-items: center;
      padding: 9px 20px 7px 23px;
      font-family: MicrosoftYaHei;
      .code {
        font-size: 20px;
        color: #33425E;
        text-align: center;
        font-weight: 400;
        padding-right: 22px;
      }
      .model-name {
        font-size: 14px;
        color: #6A6F79;
        font-weight: 400;
      }
    }
    .price-detail {
      margin-top: 10px;
      padding: 5px;
    }
  }
  .van-submit-bar__bar {
    height: 60px;
    border-top: 1px solid rgba(237,237,237);
    .van-submit-bar__text {
      text-align: left;
      .van-submit-bar__price {
        color: #000;
      }
    }
  }
  .van-action-bar {
    height: 60px;
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
      color: #6A6F79;
      border: 1px solid #216DFF;
    }
  }
  .bottom-total-price {
    position: fixed;
    bottom: 15px;
    left: 20px;
    z-index: 100;
    font-family: Avenir-Heavy;
    font-size: 20px;
    color: #33425E;
    line-height: 28px;
    font-weight: 800;
    text-align: center;
    .money {
      width: 20px;
    }
  }
}
</style>
