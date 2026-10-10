<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Memastikan output selalu berbentuk array agar gampang di-looping
const titleList = computed(() => {
    const title = route.meta?.title;

    if (Array.isArray(title)) {
        return title;
    }

    if (typeof title === 'string') {
        return [title];
    }

    return ['SleepyPOS'];
});
</script>

<template>
    <div id="topbar">
        <div class="breadcrumb-container">
            <template v-for="(item, index) in titleList" :key="index">
                <span :class="['title-item', { active: index === titleList.length - 1 }]">
                    {{ item }}
                </span>
                <!-- Tampilkan pemisah (separator) jika bukan item terakhir -->
                <span v-if="index < titleList.length - 1" class="separator"><i class="bi bi-chevron-right"></i></span>
            </template>
        </div>
    </div>
</template>

<style scoped>
#topbar {
    padding: 18px 24px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #EAEAEA;
    display: flex;
    align-items: center;
}

.breadcrumb-container {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Poppins', sans-serif;
}

.title-item {
    font-size: 15px;
    font-weight: 500;
    color: #7F7F7F;
}

.title-item.active {
    font-weight: 600;
    color: #1A1A1A;
}

.separator {
    color: #BFBFBF;
    font-size: 14px;
}
</style>