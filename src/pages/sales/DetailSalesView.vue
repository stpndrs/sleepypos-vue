<script setup>
import { ref, computed } from 'vue';
import BackLink from '@/components/BackLink.vue';
import Table from '@/components/Table.vue';

// Dummy Data
const transaction = ref({
    id: 1,
    code: '#P0001',
    status: 'Paid',
    customerName: 'Budiman',
    customerPhone: '091819181819',
    date: '30 September 2026',
    items: [
        { name: 'Cheesecuit 1', qty: 1, unit: 'Pcs', unitPrice: 6000, subTotal: 6000 },
        { name: 'Coffee 1', qty: 1, unit: 'Pcs', unitPrice: 6000, subTotal: 6000 },
        { name: 'Paket 1', qty: 1, unit: 'Pcs', unitPrice: 6000, subTotal: 6000 },
    ],
    paymentMethod: 'QRIS',
    discount: 0,
    totalPrice: 18000,
    payedTotal: 18000
});

const totalItems = computed(() => {
    return transaction.value.items.reduce((acc, item) => acc + item.qty, 0);
});

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
};

const headItems = ["Nama Item", "Qty Item", "Satuan", "Harga Satuan", "Sub Total"];
</script>

<template>
    <div class="page-container">
        <header class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Detail Riwayat Transaksi</h1>
                <p class="page-description">Riwayat transaksi penjualan pada sleepy-pos</p>
            </div>
        </header>

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
                    <div class="table-responsive">
                        <Table :head="headItems" :items="transaction.items" />
                    </div>
                </div>

                <div class="buyers">
                    <p class="section-label">Buyer Detail</p>
                    <div class="buyer-info">
                        <div class="buyer-row">
                            <span>Name</span>
                            <span class="buyer-val">{{ transaction.customerName }}</span>
                        </div>
                        <div class="buyer-row">
                            <span>Phone Number</span>
                            <span class="buyer-val">{{ transaction.customerPhone }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="payment-details">
                <p class="section-label">Payment Detail</p>
                <div class="payment-summary">
                    <div class="payment-row">
                        <p>Jumlah Item</p>
                        <p><span>{{ totalItems }}</span> Item</p>
                    </div>
                    <div class="payment-row">
                        <p>Metode Pembayaran</p>
                        <p>{{ transaction.paymentMethod }}</p>
                    </div>
                    <div class="payment-row">
                        <p>Subtotal</p>
                        <p>{{ formatPrice(transaction.totalPrice) }}</p>
                    </div>
                    <div class="payment-row">
                        <p>Diskon</p>
                        <p>{{ formatPrice(transaction.discount) }}</p>
                    </div>
                    <div class="payment-row total-highlight">
                        <p>Dibayarkan</p>
                        <p>{{ formatPrice(transaction.payedTotal) }}</p>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<style scoped>
.page-container {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
}

.page-header {
    margin-bottom: 20px;
}

.page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: #1a1a1a;
}

.page-description {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.transaction-identity {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    margin: 16px 0;
}

.transaction-identity span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
}

.transaction-identity .date,
.transaction-identity .code {
    padding-right: 12px;
    border-right: 1px solid #d0d0d0;
}

.transaction-identity .status {
    padding: 4px 12px;
    border-radius: 100px;
    background: #1b6420;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
}

.section-label {
    font-size: 13px;
    color: #787878;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.transaction-details {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    border-top: 1px solid #e5e5e5;
    padding-top: 16px;
}

.items {
    border-right: 1px solid #e5e5e5;
    padding-right: 24px;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.buyers .buyer-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.buyer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
}

.buyer-row span:first-child {
    color: #666;
}

.buyer-val {
    font-weight: 600;
    color: #1a1a1a;
}

.payment-details {
    border-top: 1px solid #e5e5e5;
    padding-top: 16px;
    margin-top: 20px;
}

.payment-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
}

.payment-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
}

.payment-row p {
    margin: 0;
}

.payment-row p:first-child {
    color: #555;
}

.payment-row p:last-child {
    font-weight: 600;
    color: #1a1a1a;
}

.total-highlight p:last-child {
    font-size: 16px;
    color: #ff5700;
    font-weight: 700;
}

@media (max-width: 991.98px) {
    .transaction-details {
        grid-template-columns: 1.5fr 1fr;
        gap: 16px;
    }

    .items {
        padding-right: 16px;
    }
}

@media (max-width: 767.98px) {
    .page-title {
        font-size: 20px;
    }

    .transaction-details {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .items {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 16px;
    }

    .payment-summary {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .transaction-identity {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .transaction-identity .date,
    .transaction-identity .code {
        border-right: none;
        padding-right: 0;
    }
}
</style>