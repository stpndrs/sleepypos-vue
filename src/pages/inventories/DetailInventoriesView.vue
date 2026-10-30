<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BackLink from '@/components/BackLink.vue';
import { inventories } from '@/data/inventories';

const route = useRoute();
const current = ref(null);

watch(
    () => route.params.id,
    (id) => {
        current.value = inventories.find((row) => row.kodeBarang === id) ?? null;
    },
    { immediate: true },
);

const rows = computed(() => [
    { label: 'Kode Barang', value: current.value?.kodeBarang },
    { label: 'Nama', value: current.value?.nama },
    { label: 'Qty', value: current.value?.qty },
    { label: 'Satuan', value: current.value?.satuan },
    { label: 'Catatan', value: current.value?.catatan || '-' },
]);
</script>

<template>
    <div class="inventory-detail">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Detail Barang</h1>
            </div>
        </section>
        <section class="page-action">
            <BackLink label="Lihat semua barang" routeName="inventories-view" variant="primary" />
        </section>
        <section v-if="current" class="page-body">
            <div class="detail">
                <p class="section-label">Detail Barang</p>
                <div class="detail-list">
                    <div v-for="row in rows" :key="row.label" class="detail-row">
                        <p class="label">{{ row.label }}</p>
                        <p class="value">{{ row.value }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section v-else class="page-body">
            <p class="empty-state">
                <i class="bi bi-exclamation-circle"></i>
                Data barang tidak ditemukan.
            </p>
        </section>
    </div>
</template>

<style scoped>
.section-label,
.label,
.value {
    font-family: 'Poppins', sans-serif;
}

.section-label {
    font-weight: 600;
    margin: 0 0 16px 0;
}

.detail-list {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 8px 16px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 0;
    border-bottom: 1px solid #d9d9d9;
}

.detail-row:last-child {
    border-bottom: none;
}

.label {
    margin: 0;
    color: #787878;
    font-size: 13px;
}

.value {
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    word-break: break-word;
}

.empty-state {
    font-family: 'Poppins', sans-serif;
    color: #787878;
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
