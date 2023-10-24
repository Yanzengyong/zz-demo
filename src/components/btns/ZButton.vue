<template>
    <button class="z-button" :class="type"><slot></slot></button>
</template>

<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: "default"
    }
})
</script>

<style lang="scss" scoped>
.z-button {
    cursor: pointer;
    font-size: 15px;
    color: $darkBlue;
}
.z-button.text {
    border: none;
    background: none;
    padding: 0 1px;
    &:hover {
        border-bottom: 1px solid $darkBlue;
    }
}

.z-button.default {
    border: 1px solid $darkBlue;
    background: #fff;
    border-radius: 3px;

    &:hover {
        background-color: $darkBlue;
        color: #fff;
    }
}
</style>