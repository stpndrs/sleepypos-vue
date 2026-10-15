<script setup>
import { computed } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const tableColumns = computed(() => {
    if (props.items && props.items.length > 0) {
        return Object.keys(props.items[0]);
    }
    return [];
});
</script>

<template>
    <div class="table-border">
        <table>
            <thead>
                <tr>
                    <th v-for="col in tableColumns" :key="col">
                        {{ col.toUpperCase() }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in items" :key="index">
                    <td v-for="col in tableColumns" :key="col">
                        {{ row[col] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-border {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 8px 16px;
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
    text-transform: uppercase;
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
</style>
