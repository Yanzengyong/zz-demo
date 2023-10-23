<script setup>
import Storey from './components/StoreyComponent.vue'
</script>

<template>
  <main class="main-container">
    <div class="storey-container">
      <Storey />
    </div>
    <div class="chart-container">

    </div>
  </main>
</template>

<style scoped>
.main-container{
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
.storey-container{
  width: 90%;
  height: 80%;
}


</style>
