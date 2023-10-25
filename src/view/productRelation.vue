<script lang="ts" setup>
import {  ref } from 'vue';
import CompanyProductChart from '../components/charts/CompanyProductChart.vue';

let currentProductName = ref('1.64μm高透大功率激光焊接机窗口镜片')
</script>



<template>
    <CompanyProductChart :productName="currentProductName"></CompanyProductChart>
</template>


