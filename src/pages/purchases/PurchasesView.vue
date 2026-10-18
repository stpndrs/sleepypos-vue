<script setup>
import { ref, computed, watch } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Button from '@/components/Button.vue';
import router from '@/router';
import Link from '@/components/Link.vue';

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

//Test object
const purchasesData = ref([
    {
        kode: 'TRX-001',
        tanggal: '10/09/2026',
        nama: 'Budiman',
        catatan: 'ini contoh catatan',
        total: '50.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
    },
    {
        kode: 'TRX-002',
        tanggal: '10/09/2026',
        nama: 'Budiman',
        catatan: 'ini contoh catatan',
        total: '50.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/2/image',
    },
    {
        kode: 'TRX-003',
        tanggal: '10/09/2026',
        nama: 'Budiman',
        catatan: 'ini contoh catatan',
        total: '50.000',
        bukti: null,
    },
    {
        kode: 'TRX-004',
        tanggal: '11/09/2026',
        nama: 'Siti Rahma',
        catatan: 'pembelian alat tulis kantor',
        total: '125.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/3/image',
    },
    {
        kode: 'TRX-005',
        tanggal: '12/09/2026',
        nama: 'Andi Saputra',
        catatan: 'pesanan khusus, tolong dipisah',
        total: '75.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/4/image',
    },
    {
        kode: 'TRX-006',
        tanggal: '12/09/2026',
        nama: 'Clara',
        catatan: 'ini contoh catatan',
        total: '300.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
    },
    {
        kode: 'TRX-007',
        tanggal: '13/09/2026',
        nama: 'Dewi Lestari',
        catatan: 'pengiriman besok pagi ya',
        total: '45.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/2/image',
    },
    {
        kode: 'TRX-008',
        tanggal: '13/09/2026',
        nama: 'Fajar Hidayat',
        catatan: 'urgent',
        total: '90.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/3/image',
    },
    {
        kode: 'TRX-009',
        tanggal: '14/09/2026',
        nama: 'Gilang',
        catatan: 'ini contoh catatan aiodhfaif aiodjhfaijdfh adifhaoifh',
        total: '150.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/4/image',
    },
    {
        kode: 'TRX-010',
        tanggal: '15/09/2026',
        nama: 'Hani',
        catatan: 'pembelian rutin bulanan',
        total: '500.000',
        bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
    },
]);

const totalItems = ref(purchasesData.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / perPage.value)));

async function fetchData() {
    // jalankan semisal ada ada perubahan halaman
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
                >
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
