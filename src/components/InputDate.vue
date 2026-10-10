<script setup>
defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="input-group">
        <input type="date" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<style scoped>
.input-group {
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
    border-radius: 10px;
    padding: 10px 14px;
    border: 1px solid transparent;
}

input {
    border: none;
    background: transparent;
    width: 100%;
    outline: none;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    color: #333333;
    cursor: pointer;
}

input::placeholder {
    color: #9E9E9E;
}
</style>