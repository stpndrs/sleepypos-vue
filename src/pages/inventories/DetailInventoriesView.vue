<script setup>
import { watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import BackLink from '@/components/BackLink.vue';
import ObjectTable from '@/components/Table.vue';
import { inventories } from '@/data/inventories';

const route = useRoute();

const current = ref(null);

const head = ['Jenis', 'Qty', 'Satuan', 'Tanggal'];

const rows = computed(() =>
    (current.value?.history ?? []).map((item) => ({
        jenis: item.jenis,
        Qty: item.qty,
        Satuan: current.value.satuan,
        Tanggal: item.tanggal,
    })),
);

function loadInventory(id) {
    current.value = inventories.find((row) => row.kode === id) ?? null;
}

watch(() => route.params.id, loadInventory, { immediate: true });
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Detail Barang</h1>
            </div>
        </section>
        <section class="page-action">
            <BackLink label="Lihat inventory" routeName="inventories-view" variant="primary" />
        </section>
        <section v-if="current" class="page-body">
            <div class="detail">
                <p class="section-label">Detail Barang</p>
                <div class="detail-list">
                    <div class="detail-row">
                        <p class="label">Kode Barang</p>
                        <p class="value">
                            <strong>{{ current.kode }}</strong>
                        </p>
                    </div>
                    <div class="detail-row">
                        <p class="label">Nama Barang</p>
                        <p class="value">{{ current.nama }}</p>
                    </div>
                    <div class="detail-row">
                        <p class="label">Catatan</p>
                        <p class="value">{{ current.catatan }}</p>
                    </div>
                    <div class="detail-row">
                        <p class="label">Stock Saat Ini</p>
                        <p class="value">{{ current.qty + current.satuan }}</p>
                    </div>
                </div>
            </div>
            <div class="history-detail">
                <p class="section-label">Riwayat Aktifitas Barang</p>
                <div class="table-wrapper">
                    <ObjectTable :head="head" :items="rows"></ObjectTable>
                </div>
            </div>
        </section>
        <section v-else class="page-body">
            <p class="empty-state">
                <i class="bi bi-exclamation-circle"></i>
                Data pembelian tidak ditemukan.
            </p>
        </section>
    </div>
</template>

<style scoped>
* {
    font-family: 'Poppins', sans-serif;
}

strong {
    font-weight: 600;
}
.page-action {
    margin-bottom: 15px;
    display: flex;
    justify-content: left;
}

.page-body {
    padding: 0 15px;
}

.section-label {
    margin: 0;
    padding: 8px 0 4px;
    font-size: 14px;
    color: #6b6b6b;
}

.detail-list {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    gap: 10px;
    font-size: 18px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.detail-row p {
    margin: 0;
}

.detail-row .label {
    font-weight: 500;
    flex-shrink: 0;
    font-size: 20px;
}

.detail-row .value {
    min-width: 0;
    font-weight: 400;
    font-size: 20px;
    text-align: right;
    overflow-wrap: anywhere;
}

.history-detail {
    margin-top: 8px;
}

.table-wrapper {
    width: 100%;
    max-width: 100%;
    contain: inline-size;
}

.history-details .flat-table {
    border: none;
    padding: 0;
}

@media (max-width: 991.98px) {
    .flat-table :deep(td) {
        font-size: 16px;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .detail-list {
        font-size: 16px;
        gap: 10px;
    }

    .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
    }

    .detail-row .value {
        text-align: left;
    }
}
</style>
