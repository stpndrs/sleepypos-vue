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
    },
    label: {
        type: String,
        default: 'Kembali'
    }
});

defineEmits(['click']);
</script>

<template>
    <router-link :type="type" :class="['link', `link-${variant}`]" :disabled="disabled" :to="{ name: routeName }">
        <i class="bi bi-arrow-left"></i> {{ label }}
    </router-link>
</template>

<style scoped>
.link {
    text-decoration: none;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    letter-spacing: .3px;
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

.link-primary {
    color: var(--primary, #FF5C00);
}

.link-primary:hover {
    color: #ff9500;
}

i.bi {
    font-size: 15px;
}
</style>