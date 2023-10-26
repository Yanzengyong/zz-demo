<template>
  <Transition enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut">
     <div class="compare-dialog-box" v-if="visiable">
      <div class="header-box">
        <!-- <h3>{{ title }}</h3> -->
        <!-- <img class="close-img" src="../../assets/images/close.png" alt="关闭" @click="emit('update:visiable', false)"> -->
      </div>
      <div class="content-box">
        <v-chart class="compare-chart" :option="option" autoresize />
      </div>
    </div> 
  </Transition>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  PolarComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide, watch, reactive } from 'vue';

// 图标
import CompanyIcon from '@/assets/images/title_icon.png';
import ProductIcon from '@/assets/images/baseIcon.png';

use([
  CanvasRenderer,
  BarChart,
  PolarComponent,
  LegendComponent,
]);

// provide(THEME_KEY, 'dark');

const props = defineProps({
  title: { type: String },
  data: {
    type: Array,
    data: () => []
  },
  visiable: { type: Boolean }
})
const emit = defineEmits(['update:visiable'])
let series = reactive([])

const option = reactive({
  color: ['#27CDB2', '#13458D', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  angleAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    axisLabel: {
      fontWeight: 'bold',
      color: '#555'
    },
    data: ['直径', 'MPD', '电阻率范围', '螺位错密度（TSD）', '基平面位错密度（BPD）', '总厚度变化（TTV）', '弯曲度（Bow）', '翘曲度（Warp）', '表面粗糙度（Ra）', '厚度']
  },
  radiusAxis: {
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#999'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#999'
      } 
    }
  },
  polar: {},
  series: [],
  legend: {
    bottom: true
  }
});

const getData = (params) => {
  console.log('?????')
  return new Promise((resolve, reject) => {
    const res = {
      code: 200,
      data: []
    }
    setTimeout(() => {
      if (params.company === '天科合达') {
        res.data = [200, 100, 20, 300, 500, 50, 80, 45, 200, 550]
      } else {
        res.data = [150, 200, 60, 150, 250, 80, 40, 90, 100, 350]
      }
      resolve(res)
    }, 500)
  })
}
watch(() => props.data, (newValue) => {
  console.log('newValue====', newValue)

  newValue.forEach(async (item) => {
    const _existIndex = option.series.findIndex((config) => config.company === item.company)
    console.log('_existIndex', _existIndex)
    if (_existIndex === -1) {
      // 不存在，需要添加
      const res = await getData({
        name: item.company
      })
      console.log('resresresres', res)
      if (res && res.code === 200) {
        option.series.push({
          type: 'bar',
          data: res.data,
          coordinateSystem: 'polar',
          name: item.company,
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        })
      }
    } else {
      // option.series.splice(_existIndex, 1)
    }

  })

}, {
  immediate: true
})

</script>

<style lang="scss" scoped>
.compare-chart {
  width: 100%;
  height: 100%;
}
.compare-dialog-box{
  // position: absolute;
  // top: 10%;
  // left: 50%;
  width: 100%;
  height: 100%;
  // border-radius: 8px 8px 8px 8px;
  // opacity: 1;
  // background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
  // border: 1px solid #fff;
  // padding: 32px;
  box-sizing: border-box;
}
.header-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 8px 0;
}
h3{
  font-size: 20px;
  font-family: Source Han Sans SC VF-Heavy, Source Han Sans SC VF;
  font-weight: 800;
  color: #35393F;
  line-height: 16px;
}
.close-img{
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.content-box{
  width: 100%;
  height: calc(100% - 24px);
  background: #E4E6F3;
  border-radius: 8px;
}
</style>
