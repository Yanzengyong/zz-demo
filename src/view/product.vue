<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { TableHeader } from '../components/lite-table/LiteTable';
import TableCard from '../components/cards/TableCard.vue';
import LiteTable from '../components/lite-table/LiteTable.vue';
import ZButton from '../components/btns/ZButton.vue';
import Message from 'vue-m-message'
import CompareChart from '../components/charts/CompareChart.vue';
import { Policy, Product } from '../service/index';


defineProps({
  msg: {
    type: String,
    required: true
  }
})

/*************************** 产品相关 ****************************/

const productTableHeaders: TableHeader[] = [
  { key: 'name', name: '产品名称', width: '100%' },
  { key: 'company', name: '生产公司', width: '100%' },
  { key: '操作', name: '操作', width: '150px' }
];

let productTableData: Product[] = reactive([{
  name: '8英寸碳化硅衬底',
  company: '天科合达'
}, {
  name: '8英寸碳化硅衬底',
  company: '重庆三安'
}]);

let comparedProducts: Product[] = reactive([]);

// 添加比对
const addCompareProduct = (row: Product) => {
  const idx = comparedProducts.indexOf(row);
  if (idx == -1) {
    if (comparedProducts.length >= 3) {
      Message.info('最多添加3个产品进行比对')
      return;
    }

    comparedProducts.push(row);
  } else {
    comparedProducts.splice(idx, 1)
  }
  console.log('add ', comparedProducts);
}

const compareVisible = ref(true)

// 比对产品
const compareProduct = () => {

  if (comparedProducts.length < 2) {
    Message.info('请选择至少两个产品进行比对')
    return;
  }

  compareVisible.value = true
}

</script>



<template>
  <div class="product-container">
    <div class="product-list">
      <LiteTable :table-headers="productTableHeaders" :table-data="productTableData">
        <template v-slot="scope">
          <z-button type="text" @click="addCompareProduct(scope.row)">
            <span v-if="comparedProducts.indexOf(scope.row) == -1">添加比对</span>
            <span v-else style="color: gray;">取消比对</span>
          </z-button>
        </template>
      </LiteTable>
    </div>
    <div class="compare-area">
      <CompareChart title="产品对比" :data="comparedProducts" v-model:visiable="compareVisible" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #C2D8FB 0%, #DEDBEF 48%, #E4D4E7 100%);
  border-radius: 0px 0px 0px 0px;
  position: relative;
  padding: 20px;
  @include flex(column, flex-start, flex-start);
}

.product-list {
  width: 50%;
}

.compare-area {
  width: 100%;
  flex: 1;
}
</style>
