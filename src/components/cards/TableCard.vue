<template>
    <div class="table-card">
        <div class="table-card-header">
            <div class="table-card-title">{{ title }}</div>
            <div class="table-card-option">
                <slot name="option"></slot>
            </div>
        </div>

        <div class="table-card-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: { type: String }
})
</script>

<style lang="scss" scoped>
.table-card {
    background: #E4E6F3;
    border-radius: $cardBorderRadius;
    padding: 5px;

    @include flex(column, flex-start, flex-start);

    &-header {
        @include flex(row, flex-start, center);
        height: 40px;
        width: 100%;
    }

    &-title {
        color: $darkBlue;
        font-weight: bolder;
        width: 200px;
        background-image: url("@/assets/images/table-card-title.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-left: 30px;
    }

    &-option {
        flex: 1;
        @include flex(row, flex-end, center);
    }

    &-body {
        width: 100%;
        flex: 1;
    }
}
</style>