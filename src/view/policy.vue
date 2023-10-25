<script setup>
import AreaPicker from '../components/areaPicker/index.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="policy-container">
    <AreaPicker />
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
