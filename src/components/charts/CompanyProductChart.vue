<template>
    <div class="company-product-chart">
        <v-chart :option="charOption" autoresize />
    </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
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
import CompanyIcon from '@/assets/images/node-icon-company.svg';
import ProductIcon from '@/assets/images/node-icon-product.svg';

// api
import { IProductRelations, getProductRelations } from '../../api/index';

use([
    CanvasRenderer,
    GraphChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

const props = defineProps({
    productName: String
});


watch(() => props.productName, (newVal, oldVal) => {
    getRelations(newVal);
})

interface Node {
    name: string,
    symbol: string
}

const charOption = reactive({
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
            data: [],
            links: [],
            lineStyle: {
                opacity: 0.9,
                width: 1,
                curveness: 0
            }
        }
    ]
});

const getRelations = async function (productName) {
    const productRelation: IProductRelations = await getProductRelations(productName);
    charOption.series[0].data = [];
    charOption.series[0].links = []

    charOption.series[0].data.push({
        name: productName,
        symbol: 'image://' + ProductIcon,
    });

    for (let company of productRelation.produceCompanies) {
        charOption.series[0].data.push({
            name: company,
            symbol: 'image://' + CompanyIcon
        })
        charOption.series[0].links.push({
            source: company,
            target: productName,
            label: {
                show: true,
                formatter: '生产',
            }
        })
    }

    for (let company of productRelation.supplyCompanies) {
        charOption.series[0].data.push({
            name: company,
            symbol: 'image://' + CompanyIcon
        })
        charOption.series[0].links.push({
            source: productName,
            target: company,
            label: {
                show: true,
                formatter: '供给',
            }
        })
    }
}


</script>

<style lang="scss" scoped>
.company-product-chart {
    width: 100%;
    height: 100%;
    background-color: #E9EBF5;
    border-radius: $cardBorderRadius;
}
</style>