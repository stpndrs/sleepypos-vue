<script setup>
import { computed } from 'vue';

const props = defineProps({
    head: {
        type: Array,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    hide: {
        type: Array,
        default: () => [],
    },
});

const tableColumns = computed(() => {
    if (props.items && props.items.length > 0) {
        return Object.keys(props.items[0]).filter((key) => !props.hide.includes(key));
    }
    return [];
});
</script>

<template>
    <div class="table-border">
        <table>
            <thead>
                <tr>
                    <th v-for="(label, index) in head" :key="index">
                        {{ label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="items.length === 0">
                    <td :colspan="head.length" class="empty-row">Belum ada data</td>
                </tr>
                <tr v-for="(row, index) in items" :key="index">
                    <td v-for="col in tableColumns" :key="col">
                        <slot :name="`cell-${col}`" :row="row" :value="row[col]">
                            {{ row[col] }}
                        </slot>
                    </td>
                    <td v-if="$slots.aksi">
                        <slot name="aksi" :row="row" :index="index" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-border {
    /* border: 1px solid #e0e0e0; */
    /* border-radius: 12px; */
    /* padding: 8px 16px; */
    overflow-x: auto;
    width: 100%;
}

table,
th,
td {
    font-family: 'Poppins', sans-serif;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    /* table-layout: fixed; */
}

th {
    border-bottom: 1px solid #d0d0d0;
    padding: 10px;
    text-align: center;
    font-weight: normal;
}

td {
    border-bottom: 1px solid #d9d9d9;
    padding: 10px;
    text-align: center;
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    font-weight: 500;
}

tbody tr:last-child td {
    border-bottom: none;
}

.empty-row {
    color: #8a8a8a;
    font-weight: normal;
}
</style>
