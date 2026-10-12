<script setup>
import { ref } from 'vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import TransactionCard from '@/components/TransactionCard.vue';
import Button from '@/components/Button.vue';
import router from '@/router';
import Link from '@/components/Link.vue';

// Filter States
const startDate = ref('');
const endDate = ref('');
const searchQuery = ref('');
const selectedStatus = ref('');

// Status Options
const statusOptions = ['Draft', 'Pending', 'Paid', 'Cancel'];

// Dummy Data
const transactions = ref([
    {
        id: 1,
        code: '#P0001',
        status: 'Draft',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
    {
        id: 2,
        code: '#P0002',
        status: 'Draft',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
    {
        id: 3,
        code: '#P0002',
        status: 'Paid',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
    {
        id: 4,
        code: '#P0002',
        status: 'Cancel',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
    {
        id: 5,
        code: '#P0002',
        status: 'Pending',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
    {
        id: 2,
        code: '#P0002',
        status: 'Draft',
        customerName: 'Budiman',
        date: '30 September 2026',
        items: [
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 },
            { name: 'Cheesecuit 1', qty: 1 }
        ],
        totalPrice: 18000
    },
]);
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar Riwayat Transaksi</h1>
                <p class="page-description">Riwayat transaksi penjualan pada sleepy-pos</p>
            </div>
            <div class="page-action">
                <Link routeName="create-sales-view" variant="primary">Tambah Transaksi</Link>
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <DateRangeInput v-model:startDate="startDate" v-model:endDate="endDate" />
                <SearchInput v-model="searchQuery"
                    placeholder="Cari data berdasarkan kode transaksi dan nama customer" />
                <SelectInput v-model="selectedStatus" placeholder="Pilih Status" :options="statusOptions" />
            </section>
            <section class="data">
                <TransactionCard v-for="item in transactions" :key="item.id" :transaction="item" />
            </section>
        </section>
    </div>
</template>

<style scoped>
.data {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 20px;
}

@media (max-width: 991.98px) {
    .page-body .filters {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .data {
        grid-template-columns: 1fr;
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