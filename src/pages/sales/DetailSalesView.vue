<script setup>
import { ref } from 'vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import TransactionCard from '@/components/TransactionCard.vue';
import Button from '@/components/Button.vue';
import router from '@/router';
import Link from '@/components/Link.vue';
import BackLink from '@/components/BackLink.vue';
import Table from '@/components/Table.vue';

// Filter States
const startDate = ref('');
const endDate = ref('');
const searchQuery = ref('');
const selectedStatus = ref('');

// Status Options
const statusOptions = ['Draft', 'Pending', 'Paid', 'Cancel'];

// Dummy Data
const transaction = ref({
    id: 1,
    code: '#P0001',
    status: 'Paid',
    customerName: 'Budiman',
    date: '30 September 2026',
    items: [
        { name: 'Cheesecuit 1', qty: 1, unit: 'Pcs', unitPrice: '6000', subTotal: '6000' },
        { name: 'Coffee 1', qty: 1, unit: 'Pcs', unitPrice: '6000', subTotal: '6000' },
        { name: 'Paket 1', qty: 1, unit: 'Pcs', unitPrice: '6000', subTotal: '6000' },
    ],
    paymentMethod: 'Qris',
    discount: 18000,
    totalPrice: 18000,
    payedTotal: 18000
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const headItems = ["Nama Item", "Qty Item", "Satuan", "Harga Satuan", "Sub Total"]
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Detail Riwayat Transaksi</h1>
                <p class="page-description">Riwayat transaksi penjualan pada sleepy-pos</p>
            </div>
        </section>
        <section class="page-body">
            <BackLink routeName="sales-view" variant="primary" label="Lihat semua transaksi" />
            <section class="transaction-identity">
                <span class="date"><i class="bi bi-calendar-check"></i> {{ transaction.date }}</span>
                <span class="code"><i class="bi bi-receipt"></i> {{ transaction.code }}</span>
                <span class="status paid"><i class="bi bi-check-circle"></i> {{ transaction.status }}</span>
            </section>
            <section class="transaction-details">
                <div class="items">
                    <p class="section-label">Transaction Details</p>
                    <Table :head="headItems" :items="transaction.items" />
                </div>
                <div class="buyers">
                    <p class="section-label">Buyer Detail</p>
                    <div class="buyer-name">
                        <p>Name</p>
                        <p>Budiman</p>
                    </div>
                    <div class="buyer-phone">
                        <p>Phone Number</p>
                        <p>091819181819</p>
                    </div>
                </div>
            </section>
            <section class="payment-details">
                <p class="section-label">Payment Detail</p>
                <div class="qty-total">
                    <p>Jumlah Item</p>
                    <p><span>3</span> Item</p>
                </div>
                <div class="payment-method">
                    <p>Metode Pembayaran</p>
                    <p>{{ transaction.paymentMethod }}</p>
                </div>
                <div class="price-total">
                    <p>Total</p>
                    <p>{{ formatPrice(transaction.totalPrice) }}</p>
                </div>
                <div class="discount">
                    <p>Diskon</p>
                    <p>{{ transaction.discount }}</p>
                </div>
                <div class="payed-total">
                    <p>Dibayarkan</p>
                    <p>{{ transaction.payedTotal }}</p>
                </div>
            </section>
        </section>
    </div>
</template>

<style scoped>
.transaction-identity {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    margin: 15px 0;
}

.transaction-identity span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    padding-right: 10px;
}

.transaction-identity span:not(:last-child) {
    border-right: 1px solid #939393;
}

.transaction-identity .status {
    padding: 5px 14px;
    border-radius: 100px;
    background: #1B6420;
    font-size: 12px;
    font-weight: 600;
    color: white;
}

.section-label {
    font-size: small;
    color: #787878;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin: 0;
}

.transaction-details {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    border-top: 1px solid #939393;
    padding-top: 15px;
}

.items {
    border-right: 1px solid #939393;
    padding-right: 30px;
}

.buyers .buyer-name,
.buyers .buyer-phone {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    margin-top: 20px;
}

.buyers p {
    margin: 0;
}

.buyers .buyer-name p:first-child,
.buyers .buyer-phone p:first-child {
    font-weight: 500;
}

.payment-details {
    border-top: 1px solid #939393;
    padding-top: 15px;
    margin-top: 15px;
}

.payment-details div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
}

.payment-details div p:first-child,
.payment-details span {
    font-weight: 600;
}

.payment-details p {
    margin: 0;
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