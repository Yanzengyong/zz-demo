<template>
  <v-chart class="compare-chart" :option="option" autoresize />
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
import { ref, provide, watch } from 'vue';

// 图标
import CompanyIcon from '@/assets/images/title_icon.png';
import ProductIcon from '@/assets/images/baseIcon.png';

use([
  CanvasRenderer,
  BarChart,
  // TitleComponent,
  // TooltipComponent,
  PolarComponent,
  LegendComponent,
]);

// provide(THEME_KEY, 'dark');

const props = defineProps({
  nodes: Array<any>,
  relations: Array<any>,
  data: {
    type: Array,
    data: () => []
  }
})

let series
watch(() => props.data, (newValue) => {
  series = newValue.map((item) => {
    return {
      type: 'bar',
      data: item.data,
      coordinateSystem: 'polar',
      name: item.name,
      stack: 'a',
      emphasis: {
        focus: 'series'
      }
    }
  })
}, {
  immediate: true
})

const option = ref({
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
    data: ['厚度', '电阻率', '直径', '弯曲度', '表面粗糙度']
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
  series: series,
  legend: {
    bottom: true
  }
});


</script>

<style lang="scss" scoped>
.compare-chart {
  width: 100%;
  height: 100%;
}
</style>
