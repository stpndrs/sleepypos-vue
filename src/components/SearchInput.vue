<script setup>
defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: 'Cari data...'
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="form-field field-search">
        <div class="input-group">
            <input type="text" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)">
            <i class="bi bi-search"></i>
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

.field-search {
    flex: 1;
    min-width: 280px;
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

input {
    border: none;
    background: transparent;
    width: 100%;
    outline: none;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: #333333;
}

input::placeholder {
    color: #9E9E9E;
}

i {
    color: #7F7F7F;
    font-size: 14px;
    pointer-events: none;
}
</style>