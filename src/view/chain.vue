<script setup lang="ts">
import { ref } from 'vue';
import Storey from '../components/StoreyComponent.vue'

/*************************** storey上部分层级展开显示 ****************************/

const treeData = ref([
  {
    id: 1,
    label: '光学部件',
    children: [
      {
        id: 2,
        label: '激光类'
      }, 
      {
        id: 3,
        label: '光源'
      }, 
      {
        id: 4,
        label: '镜片类',
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
        label: '光学仪器'
      }, 
      {
        id: 6,
        label: '光学器件'
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


    </div>

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



</style>
