<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
    variant: {
        type: String,
        default: 'default', // 'primary' | 'danger' | 'border-danger' | 'default'
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    routeName: {
        type: String,
        default: '',
    },
    param: {
        type: Object,
        default: () => ({}),
    },
});

defineEmits(['click']);
</script>

<template>
    <router-link
        :type="type"
        :class="['btn', `btn-${variant}`]"
        :disabled="disabled"
        :to="{ name: routeName, params: param }"
    >
        <slot />
    </router-link>
</template>

<style scoped>
.btn {
    text-decoration: none;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.3px;
    padding: 8px 20px;
    border-radius: 8px;
    background-color: #f5f5f5;
    border: 1px solid transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.2s ease;
    border: none;
}

.btn-primary {
    border: 1px solid var(--primary, #ff5c00);
    color: var(--primary, #ff5c00);
    background-color: #fff5f0;
}

.btn-primary:hover {
    color: white;
    background-color: var(--primary, #ff5c00);
}

.btn-primary-solid {
    border: 1px solid var(--primary, #ff5c00);
    color: white;
    background-color: var(--primary, #ff5c00);
}

.btn-primary-solid:hover {
    background-color: #e05200;
}

.btn-border-danger {
    border: 1px solid #ff0000;
    color: #ff0000;
    background-color: transparent;
}

.btn-border-danger:hover {
    background-color: #fff0f0;
}

.btn-danger {
    background-color: #ff0000;
    color: white;
}

.btn-danger:hover {
    background-color: #d60000;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
