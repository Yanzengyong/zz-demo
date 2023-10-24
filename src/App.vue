<script setup lang="ts">
import { reactive, ref } from 'vue';
import Storey from './components/StoreyComponent.vue'
import ZButton from './components/btns/ZButton.vue';
import LiteTable from './components/lite-table/LiteTable.vue';
import { TableHeader } from './components/lite-table/LiteTable';
import TableCard from './components/cards/TableCard.vue';
import PolicyInterpretationCard from './components/cards/PolicyInterpretationCard.vue';
import CompanyProductChart from './components/charts/CompanyProductChart.vue';
import { Policy, Product } from './datatypes';

/*************************** 政策相关 ****************************/

const policyTableHeaders: TableHeader[] = [
  { key: 'title', name: '政策标题', width: '100%' },
  { key: 'region', name: '地区', width: '100px' },
  { key: '操作', name: '操作', width: '80px' }
];

let policyTableData: Policy[] = reactive([{
  title: '集成电路战略性新兴产业集群行动计划',
  region: '广东省'
}, {
  title: '关于加快集成电路产业发展的若干措施',
  region: '深圳市'
}, {
  title: '武汉市加快集成电路产业高质量发展若干政策',
  region: '武汉市'
}, {
  title: '重庆市加快集成电路产业发展若干政策',
  region: '重庆市'
}]);

let currentPolicy: Policy = reactive({
  title: '',
  region: ''
});


let policyVisiable = ref(false);
// 显示政策
const showPolicy = (row: Policy) => {
  currentPolicy.title = row.title;
  currentPolicy.region = row.region;

  policyVisiable.value = true;
}

/*************************** 产品相关 ****************************/

const productTableHeaders: TableHeader[] = [
  { key: 'name', name: '产品名称', width: '100%' },
  { key: '操作', name: '操作', width: '150px' }
];

let productTableData: Product[] = reactive([{
  name: '金属反射镜',
}, {
  name: '介质膜反射镜',
}, {
  name: '宽带介质膜反射镜'
}, {
  name: 'MEMS连续表面可变形反射镜'
}]);

let comparedProductNames: string[] = reactive([]);

// 添加比对
const addCompareProduct = (row: Product) => {
  const idx = comparedProductNames.indexOf(row.name);
  if (idx == -1) {
    if (comparedProductNames.length >= 3) {
      alert('最多添加3个产品进行比对');
      return;
    }

    comparedProductNames.push(row.name);
  } else {
    comparedProductNames.splice(idx, 1)
  }
}

// 比对产品
const compareProduct = () => {
  if (comparedProductNames.length < 2) {
    alert('请选择至少两个产品进行比对');
    return;
  }


}

// 查看产品的关系
let currentProductIndex = ref(0);
let currentProductName = ref('')
const viewRelation = (row: Product, index: number) => {
  currentProductIndex.value = index;
  currentProductName.value = row.name;
}
</script>

<template>
  <main class="main-container">
    <div class="storey-container">
      <Storey />
    </div>
    <div class="chart-container">
      <TableCard title="相关政策">
        <template #body>
          <LiteTable :table-headers="policyTableHeaders" :table-data="policyTableData" height="150px">
            <template v-slot="scope">
              <z-button type="text" @click="showPolicy(scope.row)">查看</z-button>
            </template>
          </LiteTable>
        </template>
      </TableCard>

      <TableCard title="相关产品">
        <template #option>
          <z-button @click="compareProduct">比对({{ comparedProductNames.length }})</z-button>
        </template>
        <template #body>
          <LiteTable :table-headers="productTableHeaders" :table-data="productTableData" :activeIndex="currentProductIndex" height="150px">
            <template v-slot="scope">
              <z-button type="text" @click="viewRelation(scope.row, scope.index)" style="margin-right: 10px;">查看关系</z-button>

              <z-button type="text" @click="addCompareProduct(scope.row)">
                <span v-if="comparedProductNames.indexOf(scope.row.name) == -1">添加比对</span>
                <span v-else style="color: gray;">已比对</span>
              </z-button>
            </template>
          </LiteTable>
        </template>
      </TableCard>

      <div style="height: 200px;">
        <CompanyProductChart :productName="currentProductName"></CompanyProductChart>
      </div>
    </div>

    <PolicyInterpretationCard :title="currentPolicy.title" v-model:visiable="policyVisiable" />
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #C2D8FB 0%, #DEDBEF 48%, #E4D4E7 100%);
  border-radius: 0px 0px 0px 0px;
  position: relative;
  background-image: url('@/assets/images/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.storey-container {
  width: 90%;
  height: 80%;
}

.chart-container {
  @include flex(row, flex-start, flex-start);

  &>div {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
