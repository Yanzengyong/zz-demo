<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import ZButton from '../components/btns/ZButton.vue';
import LiteTable from '../components/lite-table/LiteTable.vue';
import { TableHeader } from '../components/lite-table/LiteTable';
import AreaPicker from '../components/areaPicker/index.vue'
import { Policy, Product } from '../service/index'
import PolicyInterpretationCard from '../components/cards/PolicyInterpretationCard.vue';
/*************************** 政策相关 ****************************/

const policyTableHeaders: TableHeader[] = [
  { key: 'title', name: '政策标题', width: '100%' },
  { key: 'region', name: '地区', width: '100px' },
  { key: 'fileType', name: '文件类型', width: '100px' },
  { key: '操作', name: '操作', width: '80px' }
];

let apiData = [
  {
    fileType: "pdf",
    region: "税务局",
    title: "享受增值税加计抵减政策的集成电路企业条件"
  },
  {
    fileType: "docx",
    region: "深圳市",
    title: "关于加快集成电路产业发展的若干措施"
  },
  {
    fileType: "pdf",
    region: "税务局",
    title: "加计抵减 财税2023 17"
  },
  {
    fileType: "docx",
    region: "广东省",
    title: "广东省培育半导体及集成电路战略性新兴产业集群行动计划（2021-2025年）"
  },
  {
    fileType: "docx",
    region: "武汉市",
    title: "武汉市加快集成电路产业高质量发展若干政策"
  },
  {
    fileType: "docx",
    region: "深圳市",
    title: "深圳市进一步推动集成电路产业发展行动计划（2019-2023）"
  },
  {
    fileType: "docx",
    region: "重庆市",
    title: "重庆市加快集成电路产业发展若干政策"
  }
]


let policyTableData = ref<Array<Policy>>([]);

let currentPolicy: Policy = reactive({
  title: '',
  region: '',
  fileType: ''
});

onMounted(() => {
  onAreaPick('');
});

// 选择地区
const onAreaPick = function (area) {
  policyTableData.value = apiData.filter(policy => policy.region.indexOf(area) > -1);
}


let policyVisiable = ref(true);
// 显示政策
const showPolicy = (row: Policy) => {
  currentPolicy.title = row.title;
  currentPolicy.region = row.region;

  policyVisiable.value = true;
}

</script>

<template>
  <div class="policy-container">
    <AreaPicker @on-change="onAreaPick" />
    <LiteTable style="marginTop: 20px;" :table-headers="policyTableHeaders" :table-data="policyTableData" height="550px">
      <template v-slot="scope">
        <z-button type="text" @click="showPolicy(scope.row)">查看</z-button>
      </template>
    </LiteTable>
    <PolicyInterpretationCard :title="currentPolicy.title" v-model:visiable="policyVisiable" />
  </div>
</template>

<style scoped>
.policy-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #C2D8FB 0%, #DEDBEF 48%, #E4D4E7 100%);
  border-radius: 0px 0px 0px 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 80px;
}
</style>
