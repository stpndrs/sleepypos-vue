<script setup>
import { ref } from 'vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import TransactionCard from '@/components/TransactionCard.vue';
import router from '@/router';
import Link from '@/components/Link.vue';
import Button from '@/components/Button.vue';
import BackLink from '@/components/BackLink.vue';

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
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
    {
        id: 2,
        code: '#P0002',
        status: 'Draft',
        customerName: 'Budiman',
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
    {
        id: 3,
        code: '#P0002',
        status: 'Paid',
        customerName: 'Budiman',
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
    {
        id: 4,
        code: '#P0002',
        status: 'Cancel',
        customerName: 'Budiman',
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
    {
        id: 5,
        code: '#P0002',
        status: 'Pending',
        customerName: 'Budiman',
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
    {
        id: 2,
        code: '#P0002',
        status: 'Draft',
        customerName: 'Budiman',
        paymentMethod: 'Transfer',
        date: '10/10/2026',
        notes: '-',
        items: [
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 },
            { name: 'Cheesecuit 1', qty: 1, unitPrice: 6000, subTotal: 6000 }
        ],
        totalPrice: 18000
    },
]);
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Laporan Penjualan</h1>
                <p class="page-description">Laporan penjualan transaksi</p>
            </div>
            <div class="page-action">
                <BackLink routeName="sales-view" variant="primary" label="Lihat semua transaksi" />
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <DateRangeInput v-model:startDate="startDate" v-model:endDate="endDate" />
                <SearchInput v-model="searchQuery"
                    placeholder="Cari data berdasarkan kode transaksi dan nama customer" />
                <SelectInput v-model="selectedStatus" placeholder="Pilih Status" :options="statusOptions" />
            </section>
            <section class="report-action">
                <Button variant="primary"><i class="bi bi-file-earmark-excel"></i> Export Excel</Button>
                <Button variant="primary"><i class="bi bi-file-earmark-pdf"></i> Export PDF</Button>
            </section>
            <section class="data">
                <table>
                    <thead>
                        <tr>
                            <th>KODE</th>
                            <th>NAMA CUSTOMER</th>
                            <th>TANGGAL</th>
                            <th>PEMBAYARAN</th>
                            <th>CATATAN</th>
                            <th>NAMA ITEM</th>
                            <th>QTY</th>
                            <th>HARGA SATUAN</th>
                            <th>SUB TOTAL</th>
                            <th>DISCOUNT</th>
                            <th>TOTAL HARGA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="transaction in transactions" :key="transaction.id">
                            <tr v-for="(item, itemIndex) in transaction.items" :key="itemIndex">
                                <template v-if="itemIndex === 0">
                                    <td :rowspan="transaction.items.length">{{ transaction.code }}</td>
                                    <td :rowspan="transaction.items.length">{{ transaction.customerName }}</td>
                                    <td :rowspan="transaction.items.length">{{ transaction.date }}</td>
                                    <td :rowspan="transaction.items.length">{{ transaction.paymentMethod }}</td>
                                    <td :rowspan="transaction.items.length">{{ transaction.notes }}</td>
                                </template>

                                <td>{{ item.name }}</td>
                                <td>{{ item.qty }}</td>
                                <td>Rp {{ item.unitPrice.toLocaleString('id-ID') }}</td>
                                <td>Rp {{ item.subTotal.toLocaleString('id-ID') }}</td>

                                <template v-if="itemIndex === 0">
                                    <td :rowspan="transaction.items.length">{{ transaction.discount || 0 }}</td>
                                    <td :rowspan="transaction.items.length">Rp {{
                                        transaction.totalPrice.toLocaleString('id-ID') }}</td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </section>
        </section>
    </div>
</template>

<style scoped>
.data {
    margin-top: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 8px 16px;
    overflow-x: auto;
    width: 100%;
}

.report-action {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
}

.report-action button {
    width: 100%;
}

table,
th,
td {
    font-family: 'Poppins', sans-serif;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    /* table-layout: fixed; */
}

th {
    border-bottom: 1px solid #d0d0d0;
    padding: 10px;
    text-align: center;
    font-weight: normal;
}

td {
    padding: 10px;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
    word-wrap: break-word;
    white-space: normal;
    overflow-wrap: break-word;
    font-weight: 500;
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