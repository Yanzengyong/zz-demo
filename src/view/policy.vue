<script setup lang="ts">
import { reactive, ref } from 'vue';
import ZButton from '../components/btns/ZButton.vue';
import LiteTable from '../components/lite-table/LiteTable.vue';
import { TableHeader } from '../components/lite-table/LiteTable';
import AreaPicker from '../components/areaPicker/index.vue'
import { Policy, Product } from '../datatypes'
import PolicyInterpretationCard from '../components/cards/PolicyInterpretationCard.vue';
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

</script>

<template>
  <div class="policy-container">
    <AreaPicker />
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
