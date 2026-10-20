<script setup>
import BackLink from '@/components/BackLink.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
// import { watch } from 'vue';

const route = useRoute();

const purchasesData = ref({
    kode: 'TRX-010',
    tanggal: '15/09/2026',
    nama: 'Hani',
    catatan: 'pembelian rutin bulanan',
    total: '500.000',
    bukti: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
    items: [
        {
            id: 113,
            description: 'Roti Tawar Jumbo',
            price: 5000,
            quantity: 20,
            unit: 'pak',
            image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
        },
        {
            id: 114,
            description: 'Donat Gula Halus',
            price: 5000,
            quantity: 20,
            unit: 'pcs',
            image: 'https://api-pos.fadhilahnaf.my.id/api/products/2/image',
        },
        {
            id: 115,
            description: 'Susu UHT 1 Liter',
            price: 10000,
            quantity: 30,
            unit: 'box',
            image: 'https://api-pos.fadhilahnaf.my.id/api/products/3/image',
        },
    ],
});

const head = ['Keterangan', 'Qty', 'Satuan', 'Harga Satuan', 'Sub Total', 'Gambar Produk'];

const BULAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

function formatDate(value) {
    if (!value) return '-';
    const [d, m, y] = value.split('/');
    const month = BULAN[Number(m) - 1];
    return month ? `${d} ${month} ${y}` : value;
}

function formatRupiah(value) {
    return 'Rp' + new Intl.NumberFormat('id-ID').format(value ?? 0);
}

async function getPurchase(id) {
    //Mungkin bisa di ganti melakukan get ke api berdasarkan kode nya
}

async function loadPurchase() {
    const purchase = await getPurchase(route.params.id);
    if (!purchase) {
        alert('Data pembelian tidak ditemukan');
        return;
    }

    purchasesData.value = purchase;
}

const proofUrl = ref(null);

function openProof(url) {
    proofUrl.value = url;
}

function closeProof() {
    proofUrl.value = null;
}

// watch(() => route.params.id, loadPurchase, { immediate: true });
</script>

<template>
    <div class="purchase-detail">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Detail Riwayat Transaksi Pembelian</h1>
            </div>
        </section>

        <section class="page-action">
            <BackLink label="Lihat semua transaksi" routeName="purchases-view" variant="primary" />
        </section>

        <section class="page-body">
            <div class="date-kode-name">
                <div class="meta-item date">
                    <i class="bi bi-calendar-check"></i>
                    <span>{{ formatDate(purchasesData.tanggal) }}</span>
                </div>
                <div class="meta-item kode">
                    <i class="bi bi-receipt"></i>
                    <span>{{ purchasesData.kode }}</span>
                </div>
                <div class="meta-item name">
                    <i class="bi bi-person-check"></i>
                    <span>
                        Dibeli oleh <strong>{{ purchasesData.nama }}</strong>
                    </span>
                </div>
            </div>

            <div class="price">
                <i class="bi bi-wallet"></i>
                <span>Rp {{ purchasesData.total }}</span>
            </div>

            <div class="transaction-details">
                <p class="section-label">Transaction Details</p>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th v-for="(label, index) in head" :key="index">
                                    {{ label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="purchasesData.items.length === 0">
                                <td :colspan="head.length" class="empty-row">Belum ada data</td>
                            </tr>
                            <tr v-for="item in purchasesData.items" :key="item.id">
                                <td>{{ item.description }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>{{ item.unit }}</td>
                                <td>{{ formatRupiah(item.price) }}</td>
                                <td>{{ formatRupiah(item.price * item.quantity) }}</td>
                                <td class="image-cell">
                                    <button
                                        v-if="item.image"
                                        type="button"
                                        class="proof-btn"
                                        :aria-label="`Lihat gambar ${item.description}`"
                                        @click="openProof(item.image)"
                                    >
                                        Lihat gambar <i class="bi bi-image"></i>
                                    </button>
                                    <span v-else>-</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="payment-details">
                <p class="section-label">Payment Detail</p>
                <div class="payment-list">
                    <div class="payment-row">
                        <p class="label">Jumlah Item</p>
                        <p class="value">
                            <strong>{{ purchasesData.items.length }}</strong> Item
                        </p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Total</p>
                        <p class="value">Rp{{ purchasesData.total }}</p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Catatan</p>
                        <p class="value">{{ purchasesData.catatan || '-' }}</p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Bukti Pembayaran</p>
                        <div class="value">
                            <button
                                v-if="purchasesData.bukti"
                                type="button"
                                class="proof-btn"
                                aria-label="Lihat bukti pembayaran"
                                @click="openProof(purchasesData.bukti)"
                            >
                                Lihat gambar <i class="bi bi-image"></i>
                            </button>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div v-if="proofUrl" class="proof-overlay" @click.self="closeProof">
            <div class="proof-modal">
                <button type="button" class="proof-close" aria-label="Tutup" @click="closeProof">
                    &times;
                </button>
                <img :src="proofUrl" alt="Gambar" />
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: 'Poppins', sans-serif;
}

.purchase-detail {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-x: hidden;
}

.page-body {
    padding: 0 16px;
}

.date-kode-name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 16px;
    font-size: 20px;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 0 16px;
}

.meta-item:first-child {
    padding-left: 0;
}

.meta-item + .meta-item {
    border-left: 1px solid #d9d9d9;
}

.meta-item i {
    font-size: 22px;
}

.price {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    color: #ff6200;
    font-size: 40px;
    font-weight: 700;
}

.price i {
    font-size: 40px;
}

.price span {
    min-width: 0;
    overflow-wrap: anywhere;
}

.section-label {
    margin: 0;
    padding: 8px 0 4px;
    font-size: 14px;
    color: #6b6b6b;
}

.transaction-details {
    margin-top: 16px;
    border-top: 1px solid #d9d9d9;
}

.table-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    contain: inline-size;
    -webkit-overflow-scrolling: touch;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

thead th {
    padding: 10px 16px;
    font-weight: 600;
    font-size: 18px;
    white-space: nowrap;
    border-bottom: 1px solid #e5e5e5;
}

tbody td {
    padding: 8px 16px;
    font-size: 18px;
    white-space: nowrap;
}

.image-cell {
    text-align: right;
}

.empty-row {
    padding: 24px;
    color: #6b6b6b;
}

.payment-details {
    margin-top: 8px;
    border-top: 1px solid #e5e5e5;
}

.payment-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 8px;
    font-size: 18px;
}

.payment-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.payment-row p {
    margin: 0;
}

.payment-row .label {
    font-weight: 600;
    flex-shrink: 0;
}

.payment-row .value {
    min-width: 0;
    text-align: right;
    overflow-wrap: anywhere;
}

.proof-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    border: none;
    border-radius: 8px;
    background-color: #ff6200;
    color: #ffffff;
    font-size: 15px;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s;
}

.proof-btn:hover {
    background-color: #e05200;
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
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    max-width: 90vw;
    max-height: 90vh;
}

.proof-modal img {
    display: block;
    max-width: calc(90vw - 32px);
    max-height: calc(90vh - 32px);
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
    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .date-kode-name {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        font-size: 16px;
    }

    .meta-item {
        padding: 0;
    }

    .meta-item + .meta-item {
        border-left: none;
    }

    .price,
    .price i {
        font-size: 28px;
    }

    thead th,
    tbody td {
        font-size: 15px;
        padding: 8px 12px;
    }

    .payment-list {
        font-size: 16px;
    }

    .payment-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .payment-row .value {
        text-align: left;
    }
}
</style>