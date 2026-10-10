<script setup>
defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: 'Pilih status'
    },
    options: {
        type: Array,
        default: () => []
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="form-field field-status">
        <div class="input-group select-wrapper">
            <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
                <option value="">{{ placeholder }}</option>
                <option v-for="(item, index) in options" :key="index"
                    :value="typeof item === 'object' ? item.value : item">
                    {{ typeof item === 'object' ? item.label : item }}
                </option>
            </select>
            <i class="bi bi-chevron-down"></i>
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

.field-status {
    width: 160px;
}

.input-group {
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
    border-radius: 10px;
    padding: 10px 14px;
    gap: 10px;
    border: 1px solid transparent;
    transition: all 0.2s;
}

.input-group:focus-within {
    border-color: #FF5C00;
    background-color: #FFFFFF;
}

.select-wrapper select {
    appearance: none;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    outline: none;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: #333333;
}

i {
    color: #7F7F7F;
    font-size: 14px;
    pointer-events: none;
}

@media (max-width: 768px) {
    .field-status {
        width: 100%;
    }
}
</style>