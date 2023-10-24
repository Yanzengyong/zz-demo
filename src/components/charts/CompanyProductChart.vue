<template>
    <v-chart class="company-product-chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GraphChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

// 图标
import CompanyIcon from '@/assets/images/title_icon.png';
import ProductIcon from '@/assets/images/baseIcon.png';

use([
    CanvasRenderer,
    GraphChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

// provide(THEME_KEY, 'dark');

const option = ref({
    title: {
        text: '产品产供关系',
        textStyle: {
            fontSize: 14,
            color: 'rgba(20,70,141, 1)'
         }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            roam: true,
            label: {
                show: true,
                position: 'bottom'
            },
            force: {
                repulsion: 1300
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 12,
                align: 'center',
                verticalAlign: 'center',
                color: 'rgba(20,70,141, 1)',
                backgroundColor: '#fff',
                borderColor: "rgba(20,70,141, 1)",
                borderType: 'solid',
                borderWidth: 1,
                borderRadius: 20,
                padding: [2, 4]
            },
            data: [
                {
                    name: 'Node 1',
                    symbol: 'image://' + CompanyIcon
                },
                {
                    name: 'Node 2',
                    symbol: 'image://' + ProductIcon
                },
                {
                    name: 'Node 3',
                    symbol: 'image://' + CompanyIcon
                },
                {
                    name: 'Node 4',
                    symbol: 'image://' + CompanyIcon
                }
            ],
            // links: [],
            links: [
                {
                    source: 'Node 1',
                    target: 'Node 2',
                    label: {
                        show: true,
                        formatter: '生产',
                    }
                },
                {
                    source: 'Node 2',
                    target: 'Node 3',
                    label: {
                        show: true,
                        formatter: '供应',
                    }
                },
                {
                    source: 'Node 2',
                    target: 'Node 4',
                    label: {
                        show: true,
                        formatter: '供应',
                    }
                },

            ],
            lineStyle: {
                opacity: 0.9,
                width: 1,
                curveness: 0
            }
        }
    ]
});

defineProps({
    nodes: Array<any>,
    relations: Array<any>
})

</script>

<style lang="scss" scoped>
.company-product-chart {
    background-color: #E9EBF5;
    border-radius: $cardBorderRadius;
}
</style>