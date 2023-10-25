<template>
  <el-row class="all-areaPicker-container">
    <el-row class="selected-result-box">
      <b>选中：</b>
      <el-tag
        v-if="resultName"
        size="mini"
        closable
        :disable-transitions="false"
        @close="resultName = ''"
      >
        {{ resultName }}
      </el-tag>
    </el-row>
    <el-row align="top" class="areaPicker-container">
      <el-col class="areaPicker-left">
        地域：
      </el-col>
      <el-col class="areaPicker-right">
        <el-row :gutter="15" class="areabox">
          <el-col v-for="(item) in areaData" :key="item.code" class="areaItem">
            <el-popover
              v-if="item.children && item.children.length > 0"
              placement="bottom"
              trigger="hover"
              width="400"
            >
              <el-row :gutter="15" class="municipalbox">
                <el-col v-for="(municipal) in item.children" :key="municipal.code" class="municipalItem">
                  <div class="areaMunicipal" @click="selectedArea(municipal.name, municipal)">
                    {{ municipal.name }}
                  </div>
                </el-col>
              </el-row>
              <div slot="reference" class="areaProvince" @click="selectedArea(item.name, item)">
                {{ item.name }}
              </div>
            </el-popover>
            <div v-else class="areaProvince" @click="selectedArea(item.name, item)">
              {{ item.name }}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script setup>
import { watch, reactive } from 'vue'
import areaData from './areadata.js'

const emit = defineEmits(['onChange'])

const state = reactive({
  introduceData: [
    { title: '发文机构', title2: '主题分类' },
    { title: '成文日期', title2: '发布日期' }
  ],
  areaData,
  resultName: ''
})

watch(() => state.resultName, (newValue, ) => {
  emit('onChange', newValue)
})
const selectedArea = (name) => {
  this.resultName = name
}
</script>

<style lang="scss" scoped>
.all-areaPicker-container{
  width: 100;
  .selected-result-box{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
  }
}
.areaPicker-container{
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .areaPicker-left{
    width: 50px;
    font-size: 16px;
    font-weight: 700;
  }
  .areaPicker-right{
    width: calc(100% - 50px);
    .areabox{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .areaItem{
        width: auto;
        .areaProvince{
          width: auto;
          cursor: pointer;
          position: relative;
          margin-bottom: 8px;
          &:hover{
            color: #518cf3;
          }
        }
      }
    }
  }
}
.municipalbox{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .municipalItem{
    width: auto;
    .areaMunicipal{
      width: auto;
      cursor: pointer;
      position: relative;
      &:hover{
        color: #518cf3;
      }
    }
  }
}
</style>
