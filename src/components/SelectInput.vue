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
    },
    label: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="field">
        <label v-if="label" :for="inputId">
            {{ label }} <span v-if="required" class="required">*</span>
        </label>
        <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option value="">{{ placeholder }}</option>
            <option v-for="(item, index) in options" :key="index" :value="typeof item === 'object' ? item.value : item">
                {{ typeof item === 'object' ? item.label : item }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

label {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
}

.required {
    color: #e53935;
}

select {
    outline: 0;
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    padding: 0 16px;
    background: #f3f3f3;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
}

input::placeholder {
    color: #8a8a8a;
}
</style>