<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Storey from './components/StoreyComponent.vue'
import ZButton from './components/btns/ZButton.vue';
import LiteTable from './components/lite-table/LiteTable.vue';
import { TableHeader } from './components/lite-table/LiteTable';
import TableCard from './components/cards/TableCard.vue';
import PolicyInterpretationCard from './components/cards/PolicyInterpretationCard.vue';
import CompanyProductChart from './components/charts/CompanyProductChart.vue';
import CompareChart from './components/charts/CompareChart.vue';
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
  data: [2000, 1500, 3000, 2000, 3600, 5000, 1000]
}, {
  name: '介质膜反射镜',
  data: [2000, 4000, 6000, 1000, 3000, 2000, 1000]
}, {
  name: '宽带介质膜反射镜',
  data: [3000, 2500, 1000, 6000, 2600, 3000, 4000]
}, {
  name: 'MEMS连续表面可变形反射镜',
  data: [1000, 4500, 2000, 2900, 5600, 2800, 2000]
}]);

let comparedProductNames: string[] = reactive([]);
const comparedProductList = computed(() => {
  return comparedProductNames.map((item) => {
    return productTableData.find((prod) => {
      return prod.name === item
    })
  })
})

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

const compareVisible = ref(false)

// 比对产品
const compareProduct = () => {

  if (comparedProductNames.length < 2) {
    alert('请选择至少两个产品进行比对');
    return;
  }

  compareVisible.value = true
}

// 查看产品的关系
let currentProductIndex = ref(0);
let currentProductName = ref('')
const viewRelation = (row: Product, index: number) => {
  currentProductIndex.value = index;
  currentProductName.value = row.name;
}

/*************************** storey上部分层级展开显示 ****************************/

const treeData = ref([
  {
    id: 1,
    label: '光学部件',
    children: [
      {
        id: 2,
        label: '激光类',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 3,
        label: '光源',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 4,
        label: '镜片类',
        icon: 'src/assets/images/baseIcon.png',
        children: [
          {
            id: 7,
            label: '透射镜片'
          }, 
          {
            id: 8,
            label: '反射镜片',
            children: [
              {
                id: 12,
                label: '平面反射镜片'
              },
              {
                id: 13,
                label: '球面反射镜片'
              },
              {
                id: 14,
                label: '非球面反射镜片',
                children: [
                  {
                    id: 16,
                    label: '紫外光非球面3D高反射率反射镜'
                  }
                ]
              },
              {
                id: 15,
                label: '半反射镜片'
              }
            ]
          }, 
          {
            id: 9,
            label: '折射镜'
          }, 
          {
            id: 10,
            label: '定位镜'
          }, 
          {
            id: 11,
            label: '声光偏转器'
          }
        ]
      }, 
      {
        id: 5,
        label: '光学仪器',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 6,
        label: '光学器件',
        icon: 'src/assets/images/baseIcon.png'
      }
    ]
  }
])
</script>

<template>
  <main class="main-container">
    <div class="storey-container">
      <Storey :treeData="treeData"/>
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
                <span v-else style="color: gray;">取消比对</span>
              </z-button>
            </template>
          </LiteTable>
        </template>
      </TableCard>

      <div style="height: 200px;">
        <CompanyProductChart :productName="currentProductName"></CompanyProductChart>
      </div>
    </div>

    <div class="compare-dialog-box" v-if="compareVisible">
      <div class="header-box">
        <h3>产品对比</h3>
        <img class="close-img" src="./assets/images/close.png" alt="关闭" @click="compareVisible = false">
      </div>
      <div class="content-box">
        <CompareChart :data="comparedProductList"/>
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

.compare-dialog-box{
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 600px;
  border-radius: 8px 8px 8px 8px;
  opacity: 1;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
  border: 1px solid #fff;
  padding: 32px;
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
