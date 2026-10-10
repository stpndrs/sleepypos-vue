<script setup>
import InputDate from './InputDate.vue';

defineProps({
    startDate: String,
    endDate: String,
    label: {
        type: String,
        default: 'Antara tanggal'
    }
});

defineEmits(['update:startDate', 'update:endDate']);
</script>

<template>
    <div class="form-field">
        <label v-if="label">{{ label }}</label>
        <div class="form-group-range">
            <InputDate :modelValue="startDate" @update:modelValue="$emit('update:startDate', $event)"
                placeholder="Tanggal awal" />
            <span class="range-separator">—</span>
            <InputDate :modelValue="endDate" @update:modelValue="$emit('update:endDate', $event)"
                placeholder="Tanggal akhir" />
        </div>
    </div>
</template>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'Poppins', sans-serif;
}

label {
    font-size: 13px;
    color: #4A4A4A;
    font-weight: 500;
}

.form-group-range {
    display: flex;
    align-items: center;
    gap: 8px;
}

.range-separator {
    color: #BFBFBF;
}
</style>