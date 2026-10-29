<script setup>
import { ref, computed, watch } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Link from '@/components/Link.vue';
import { purchases } from '@/data/purchases';

function formatRupiah(value) {
    return 'Rp' + new Intl.NumberFormat('id-ID').format(value ?? 0);
}

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const purchasesData = ref(purchases);

const totalItems = ref(purchasesData.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / perPage.value)));

function fetchData() {
    //Mungkin bisa di ganti ke getdata di api nanti
    totalItems.value = purchases.length;

    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;

    purchasesData.value = purchases.slice(start, end);
}

const proofUrl = ref(null);

function openProof(url) {
    proofUrl.value = url;
}

function closeProof() {
    proofUrl.value = null;
}

watch([currentPage, perPage], fetchData, { immediate: true });
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar Transaksi Pembelian</h1>
                <p class="page-description">Riwayat pembelian bahan dan alat pada sleepy-pos</p>
            </div>
            <div class="page-action">
                <Link routeName="report-purchases-view" variant="primary"
                    ><i class="bi bi-bar-chart-steps"></i> Lihat Laporan Pembelian</Link
                >
                <Link routeName="create-purchases-view" variant="primary">Tambah Pembelian</Link>
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <SearchInput
                    v-model="searchQuery"
                    placeholder="Cari data berdasarkan nama atau kode produk"
                />
            </section>
            <section class="data">
                <ObjectTable
                    :head="[
                        'KODE TRANSAKSI',
                        'TANGGAL',
                        'NAMA PEMBELI',
                        'CATATAN',
                        'TOTAL HARGA',
                        'BUKTI PEMBAYARAN',
                        'AKSI',
                    ]"
                    :items="purchasesData"
                    :hide="['items']"
                >
                    <template #cell-total="{ row }">{{ formatRupiah(row.total) }}</template>
                    <template #cell-bukti="{ row }">
                        <div class="action-buttons">
                            <button
                                v-if="row.bukti"
                                type="button"
                                class="edit-icon proof-btn"
                                aria-label="Lihat bukti pembayaran"
                                @click="openProof(row.bukti)"
                            >
                                <i class="bi bi-image"></i>
                            </button>
                            <span v-else>-</span>
                        </div>
                    </template>
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <router-link
                                :to="{ name: 'edit-purchases-view', params: { id: row.kode } }"
                                class="edit-icon"
                                aria-label="Edit pembelian"
                            >
                                <i class="bi bi-pencil"></i>
                            </router-link>
                            <router-link
                                :to="{ name: 'detail-purchases-view', params: { id: row.kode } }"
                                class="detail-icon"
                                aria-label="Detail pembelian"
                            >
                                <i class="bi bi-eye"></i>
                            </router-link>
                        </div>
                    </template>
                </ObjectTable>
            </section>
        </section>
        <section class="page-footer">
            <div class="pagination-footer">
                <Pagination
                    v-model:currentPage="currentPage"
                    v-model:perPage="perPage"
                    :totalPages="totalPages"
                />
            </div>
        </section>

        <Teleport to="body">
            <div v-if="proofUrl" class="proof-overlay" @click.self="closeProof">
                <div class="proof-modal">
                    <button
                        type="button"
                        class="proof-close"
                        aria-label="Tutup"
                        @click="closeProof"
                    >
                        &times;
                    </button>
                    <img :src="proofUrl" alt="Bukti pembayaran" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.filters {
    width: 30px;
}

.data {
    margin-top: 20px;
    contain: inline-size;
    overflow-x: auto;
}

.pagination-footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
}

.edit-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #ff6200;
    text-decoration: none;
    border: none;
    padding: 0;
    transition:
        background-color 0.2s,
        opacity 0.2s;
}

.edit-icon:hover {
    background-color: #e05200;
}

.detail-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 10px;
    color: #ffffff;
    background-color: #ff6200;
    text-decoration: none;
    border: none;
    padding: 0;
    transition:
        background-color 0.2s,
        opacity 0.2s;
}

.detail-icon:hover {
    background-color: #e05200;
}

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.proof-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.proof-modal {
    position: relative;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    max-width: 80vw;
    max-height: 80vh;
}

.proof-modal img {
    display: block;
    max-width: 76vw;
    max-height: 74vh;
    object-fit: contain;
    border-radius: 8px;
}

.proof-close {
    position: absolute;
    top: -12px;
    right: -12px;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background-color: #ff6200;
    color: #ffffff;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    transition: background-color 0.2s;
}

.proof-close:hover {
    background-color: #e05200;
}

@media (max-width: 991.98px) {
    .page-body .filters {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .page-action {
        width: 100%;
    }

    .page-action .btn {
        display: block;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
