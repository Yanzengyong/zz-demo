<template>
    <div class="lite-table" :style="`height: ${height}`">
        <div class="lite-table-header">
            <div class="lite-table-header-item" v-for="header in tableHeaders" :key="header.key"
                :style="widthFilter(header.width)">
                {{ header.name }}
            </div>

        </div>
        <div class="lite-table-body">
            <div class="lite-table-body-row" v-for="row, i in tableData" :key="i" :class="{'active-row': i == activeIndex}">
                <div class="lite-table-body-item" v-for="value, key, keyIndex in row" :key="key + i"
                    :style="widthFilter(tableHeaders[keyIndex].width)">
                    {{ value }}
                </div>

                <div class="lite-table-body-item" :style="widthFilter(tableHeaders[tableHeaders.length - 1].width)">
                    <slot :row="row" :index="i"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lite-table {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    $headerHeight: 30px;


    &-header {
        @include flex(row, flex-start, center);
        position: absolute;
        height: $headerHeight;
        width: 100%;

        &-item {
            font-weight: bolder;
            padding: 5px;
            border-left: 1px solid #fff;
            border-top: 1px solid #fff;
            background-color: #fff;
            color: $darkBlue;

            &:last-child {
                border-right: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }
        }
    }

    &-body {
        @include flex(column, flex-start, center);
        @include scrollBar;
        overflow-y: auto;
        height: 100%;
        padding-top: $headerHeight;

        &-row {
            width: 100%;
            @include flex(row, flex-start, center);
            border-top: 1px solid #fff;

            &:last-child {
                border-bottom: 1px solid #fff;
            }

            &.active-row {
                background-color: #98d4c0;
            }
        }

        &-item {
            padding: 0 5px;
            border-left: 1px solid #fff;
            color: $darkBlue;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;

            &:last-child {
                border-right: 1px solid #fff;

            }
        }
    }
}
</style>


<script setup lang="ts">
import { TableHeader } from './LiteTable';
defineProps({
    tableData: Array<any>,
    tableHeaders: {
        type: Array<TableHeader>,
        required: true,
        default: () => {
            return [];
        }
    },
    activeIndex: {
        type: Number,
        default: -1
    },
    height: {
        type: String,
        default: '100%'
    }
})

const widthFilter = (width: string) => {
    return width === '100%' ? 'flex: 1;' : `width: ${width};`;
}
</script>