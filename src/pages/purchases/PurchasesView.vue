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
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-002',
        tanggal: '10/09/2026',
        nama: 'Budiman',
        catatan: 'ini contoh catatan',
        total: '50.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-003',
        tanggal: '10/09/2026',
        nama: 'Budiman',
        catatan: 'ini contoh catatan',
        total: '50.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-004',
        tanggal: '11/09/2026',
        nama: 'Siti Rahma',
        catatan: 'pembelian alat tulis kantor',
        total: '125.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-005',
        tanggal: '12/09/2026',
        nama: 'Andi Saputra',
        catatan: 'pesanan khusus, tolong dipisah',
        total: '75.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-006',
        tanggal: '12/09/2026',
        nama: 'Clara',
        catatan: 'ini contoh catatan',
        total: '300.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-007',
        tanggal: '13/09/2026',
        nama: 'Dewi Lestari',
        catatan: 'pengiriman besok pagi ya',
        total: '45.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-008',
        tanggal: '13/09/2026',
        nama: 'Fajar Hidayat',
        catatan: 'urgent',
        total: '90.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-009',
        tanggal: '14/09/2026',
        nama: 'Gilang',
        catatan: 'ini contoh catatan aiodhfaif aiodjhfaijdfh adifhaoifh',
        total: '150.000',
        bukti: 'ini bukti',
    },
    {
        kode: 'TRX-010',
        tanggal: '15/09/2026',
        nama: 'Hani',
        catatan: 'pembelian rutin bulanan',
        total: '500.000',
        bukti: 'ini bukti',
    },
]);

const totalItems = ref(purchasesData.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / perPage.value)));

async function fetchData() {
    // jalankan semisal ada ada perubahan halaman
}

watch([currentPage, perPage], fetchData, { immediate: true });
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar Riwayat Pembelian</h1>
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
                <ObjectTable :items="purchasesData" />
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
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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
