<script setup>
import { computed } from 'vue'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    label: {
        type: String,
        default: 'Notification'
    },
    variant: {
        type: String,
        default: 'info',
        validator: (value) => ['info', 'warning', 'danger', 'success'].includes(value)
    }
})

const emit = defineEmits(['close'])

const variantClass = computed(() => `toast--${props.variant}`)
</script>

<template>
    <div :class="['toast', variantClass]">
        <div class="toast-body">
            {{ label }}
        </div>
        <div class="toast-action" @click="emit('close', id)">
            <i class="bi bi-x-lg"></i>
        </div>
    </div>
</template>

<style scoped>
.toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 12px 20px;
    width: max-content;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
}

.toast-body {
    font-size: 14px;
    font-weight: 500;
}

.toast-action {
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.toast-action:hover {
    opacity: 1;
}

.toast--info {
    background-color: #e0f2fe;
    border: 1.5px solid #0284c7;
    color: #0369a1;
}

.toast--success {
    background-color: #dcfce7;
    border: 1.5px solid #16a34a;
    color: #15803d;
}

.toast--warning {
    background-color: #fef3c7;
    border: 1.5px solid #d97706;
    color: #b45309;
}

.toast--danger {
    background-color: #fee2e2;
    border: 1.5px solid #dc2626;
    color: #b91c1c;
}
</style>