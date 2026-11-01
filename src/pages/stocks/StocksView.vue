<script setup>
import { ref } from 'vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Link from '@/components/Link.vue';
import Button from '@/components/Button.vue';
import router from '@/router';

const startDate = ref('');
const endDate = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const stocks = ref([
    {
        id: 1,
        code: 'F0001',
        name: 'CHEESECUIT KEJU',
        qty: 1,
        unit: 'PCS',
        date: '03/10/2026',
        notes: 'ya',
    },
    {
        id: 2,
        code: 'F0002',
        name: 'CHEESECUIT OREO',
        qty: 2,
        unit: 'PCS',
        date: '03/10/2026',
        notes: 'ok',
    },
    {
        id: 3,
        code: 'F0003',
        name: 'CHEESECUIT MILO',
        qty: 1,
        unit: 'PCS',
        date: '02/10/2026',
        notes: 'hmm',
    },
    {
        id: 4,
        code: 'F0004',
        name: 'CHEESECUIT RED VELVET',
        qty: 3,
        unit: 'PCS',
        date: '02/10/2026',
        notes: 'hoho',
    },
    {
        id: 5,
        code: 'D0001',
        name: 'KOPI COLD BREW',
        qty: 3,
        unit: 'PCS',
        date: '02/10/2026',
        notes: '-',
    },
    {
        id: 6,
        code: 'D0002',
        name: 'KOPI THAI',
        qty: 3,
        unit: 'PCS',
        date: '02/10/2026',
        notes: '-',
    },
    {
        id: 7,
        code: 'D0003',
        name: 'KOPI LATTE',
        qty: 3,
        unit: 'PCS',
        date: '01/10/2026',
        notes: '-',
    },
]);
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Riwayat Penambahan Stok</h1>
            </div>
        </section>

        <section class="page-body">
            <section class="filters">
                <DateRangeInput v-model:startDate="startDate" v-model:endDate="endDate" />
                <SearchInput v-model="searchQuery" placeholder="Cari berdasarkan nama atau kode produk" />
                <div class="filters-action">
                    <Link routeName="create-stocks-view" variant="primary-solid">Tambah Stok</Link>
                </div>
            </section>

            <section class="data">
                <ObjectTable :head="[
                    'KODE PRODUK',
                    'NAMA',
                    'QTY',
                    'SATUAN',
                    'TANGGAL',
                    'CATATAN',
                    'AKSI',
                ]" :items="stocks" :hide="['id']">
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <Button variant="primary-solid" aria-label="Edit stok"
                                @click="router.push({ name: 'edit-stocks-view', params: { id: row.id } })">
                                <i class="bi bi-pencil"></i>
                            </Button>
                        </div>
                    </template>
                </ObjectTable>
            </section>
        </section>

        <section class="page-footer">
            <div class="pagination-footer">
                <Pagination v-model:currentPage="currentPage" v-model:perPage="perPage" :totalPages="10" />
            </div>
        </section>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.filters {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
}

.filters-action {
    margin-left: auto;
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

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 991.98px) {
    .filters {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .filters-action {
        margin-left: 0;
        width: 100%;
    }

    .filters-action :deep(.btn) {
        display: block;
        text-align: center;
        width: 100%;
    }
}
</style>