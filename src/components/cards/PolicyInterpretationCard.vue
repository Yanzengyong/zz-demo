<template>
    <Transition enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut">
        <div class="policy-compare-card" v-show="visiable">
            <div class="close" @click="emit('update:visiable', false)">×</div>
            <div class="policy-name">{{ title }}</div>
            <div class="policy-compare-card-content">
                <div class="policy-card" style="background-color: #E4E6F3;">
                    <div class="policy-card-name">
                        政策原文
                    </div>
                    <div class="policy-card-text">
                        {{ originText }}
                    </div>
                </div>

                <div class="policy-card" style="background-color: #FFFFFF;">
                    <div class="policy-card-name">
                        政策解读
                    </div>
                    <div class="policy-card-text">
                        {{ interpretation }}
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps({
    title: { type: String },
    originText: { type: String },
    interpretation: { type: String },
    visiable: { type: Boolean }
})

const emit = defineEmits(['update:visiable'])
</script>

<style lang="scss" scoped>
.policy-compare-card {
    position: fixed;
    width: 80%;
    height: 80%;
    top: 10%;
    padding: 20px;
    background-color: aqua;
    border-radius: $cardBorderRadius;

    @include flex(column, flex-start, flex-start);

    .close {
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 28px;
        width: 40px;
        height: 40px;
        line-height: 34px;
        text-align: center;
        font-weight: bolder;
        cursor: pointer;
        &:hover {
            transform: rotate(360deg);
            transition-duration: 1s;
        }
    }

    .policy-name {
        width: 100%;
        height: 50px;
        color: #000;
        font-weight: bolder;
        font-size: 20px;
    }

    &-content {
        @include flex(row, flex-start, flex-start);
        width: 100%;
        flex: 1;
    }

    .policy-card {
        @include scrollBar;
        padding: 10px;
        flex: 1;
        height: 100%;
        overflow-y: auto;

        &-name {
            color: $darkBlue;
            font-weight: bolder;
        }

        border-radius: 10px;
    }
}
</style>