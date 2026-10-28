<script setup>
import { useId } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    required: {
        type: Boolean,
        default: false,
    },
    min: {
        type: [Number, String],
        default: undefined,
    },
    id: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const inputId = props.id || useId();

function onInput(e) {
    const raw = e.target.value;
    const value = props.type === 'number' ? (raw === '' ? null : Number(raw)) : raw;
    emit('update:modelValue', value);
}
</script>

<template>
    <div class="field">
        <label v-if="label" :for="inputId">
            {{ label }} <span v-if="required" class="required">*</span>
        </label>
        <input v-if="type !== 'textarea'" :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder"
            :min="min" :required="required" :disabled="isDisabled" @input="onInput" />
        <textarea v-else :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :min="min"
            :required="required" :disabled="isDisabled" @input="onInput"></textarea>
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
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
}

.required {
    color: #e53935;
}

input,
textarea {
    outline: 0;
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    padding: 12px 16px;
    background: #f3f3f3;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
}

textarea {
    padding: 16px !important;
    height: 150px !important;
}

input::placeholder {
    color: #8a8a8a;
}
</style>
