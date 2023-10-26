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
                    <div class="policy-card-text" id="policyOriginText">
                        <VueOfficeDocx src="http://127.0.0.1:5000/static/policy/原文---广东省培育半导体及集成电路战略性新兴产业集群行动计划（2021-2025年）---广东省.docx" @render="rendered" />
                    </div>
                </div>

                <div class="policy-card" style="background-color: #FFFFFF;">
                    <div class="policy-card-name">
                        政策解读
                    </div>
                    <div class="policy-card-text" id="policyInterpretation">
                        <VueOfficeDocx src="http://127.0.0.1:5000/static/policy/解读---广东省培育半导体及集成电路战略性新兴产业集群行动计划（2021-2025年）---广东省.docx" @render="rendered" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css'

defineProps({
    title: { type: String },
    originText: { type: String },
    interpretation: { type: String },
    visiable: { type: Boolean }
})

const emit = defineEmits(['update:visiable'])

const rendered = function() {
    console.log('rendered')
}

</script>

<style lang="scss" scoped>
.vue-office-docx {
    overflow-y: auto !important;
}
.vue-office-docx-main {
    overflow-y: auto !important;
}
.policy-compare-card {
    position: fixed;
    width: 80%;
    height: 80%;
    top: 10%;
    padding: 20px;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
    border-radius: $cardBorderRadius;

    @include flex(column, flex-start, flex-start);

    &-content {
        overflow-y: auto;
    }

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

        &-text {
            height: 100%;
            overflow-y: auto;
        }
    }
}
</style>