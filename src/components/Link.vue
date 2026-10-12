<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'default' // 'primary' | 'danger' | 'border-danger' | 'default'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    routeName: {
        type: String,
        default: ''
    }
});

defineEmits(['click']);
</script>

<template>
    <router-link :type="type" :class="['btn', `btn-${variant}`]" :disabled="disabled" :to="{ name: routeName }">
        <slot />
    </router-link>
</template>

<style scoped>
.btn {
    text-decoration: none;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    letter-spacing: .3px;
    padding: 8px 20px;
    border-radius: 8px;
    background-color: #F5F5F5;
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
    border: 1px solid var(--primary, #FF5C00);
    color: var(--primary, #FF5C00);
    background-color: #FFF5F0;
}

.btn-primary:hover {
    color: white;
    background-color: var(--primary, #FF5C00);
}

.btn-primary-solid {
    border: 1px solid var(--primary, #FF5C00);
    color: white;
    background-color: var(--primary, #FF5C00);
}

.btn-primary-solid:hover {
    background-color: #E05200;
}

.btn-border-danger {
    border: 1px solid #FF0000;
    color: #FF0000;
    background-color: transparent;
}

.btn-border-danger:hover {
    background-color: #FFF0F0;
}

.btn-danger {
    background-color: #FF0000;
    color: white;
}

.btn-danger:hover {
    background-color: #D60000;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>