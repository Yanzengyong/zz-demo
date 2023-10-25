<template>
    <div class="company-product-chart">
        <v-chart :option="charOption" autoresize />
    </div>
</template>

<script setup lang="ts">
import { watch, reactive, onMounted } from 'vue';
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
import { IProductRelations, getProductRelations } from '../../service/index';

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


onMounted(async () => {
    getRelations(props.productName);
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
        text: props.productName,
        textStyle: {
            fontSize: 20,
            color: 'rgba(20,70,141, 1)'
        }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'force',
            symbolSize: 60,
            roam: true,
            label: {
                show: true,
                position: 'bottom',
                fontSize: 20
            },
            force: {
                repulsion: 10000
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [0, 15],
            edgeLabel: {
                fontSize: 20,
                align: 'center',
                verticalAlign: 'center',
                color: 'rgba(20,70,141, 1)',
                backgroundColor: '#fff',
                borderColor: "rgba(20,70,141, 1)",
                borderType: 'solid',
                borderWidth: 1,
                borderRadius: 30,
                padding: [5, 10]
            },
            data: [],
            links: [],
            lineStyle: {
                opacity: 1,
                width: 1,
                curveness: 0
            }
        }
    ]
});

const getRelations = async function (productName) {
    if (!productName) {
        return;
    }

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
                backgroundColor: 'rgba(20,70,141, 1)',
                color: '#fff'
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