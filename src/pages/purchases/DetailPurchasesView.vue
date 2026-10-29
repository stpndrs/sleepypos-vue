<script setup>
import BackLink from '@/components/BackLink.vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ObjectTable from '@/components/Table.vue';
import { useRoute } from 'vue-router';
import { purchases } from '@/data/purchases';

const route = useRoute();

const current = ref(null);
const proofUrl = ref(null);

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

const totalQty = computed(() =>
    (current.value?.items ?? []).reduce((sum, item) => sum + item.quantity, 0),
);

const rows = computed(() =>
    (current.value?.items ?? []).map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: formatRupiah(item.price),
        subtotal: formatRupiah(item.subtotal),
        image: item.image,
    })),
);

function loadPurchase(id) {
    current.value = purchases.find((row) => row.kode === id) ?? null;
    proofUrl.value = null;
}

function openProof(url) {
    proofUrl.value = url;
}

function closeProof() {
    proofUrl.value = null;
}

function onKeydown(event) {
    if (event.key === 'Escape') closeProof();
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));

watch(() => route.params.id, loadPurchase, { immediate: true });
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

        <section v-if="current" class="page-body">
            <div class="date-kode-name">
                <div class="meta-item date">
                    <i class="bi bi-calendar-check"></i>
                    <span>{{ formatDate(current.tanggal) }}</span>
                </div>
                <div class="meta-item kode">
                    <i class="bi bi-receipt"></i>
                    <span>{{ current.kode }}</span>
                </div>
                <div class="meta-item name">
                    <i class="bi bi-person-check"></i>
                    <span>
                        Dibeli oleh <strong>{{ current.nama }}</strong>
                    </span>
                </div>
            </div>

            <div class="price">
                <i class="bi bi-wallet"></i>
                <span>{{ formatRupiah(current.total) }}</span>
            </div>

            <div class="transaction-details">
                <p class="section-label">Transaction Details</p>
                <div class="table-wrapper">
                    <ObjectTable class="flat-table" :head="head" :items="rows">
                        <template #cell-image="{ row }">
                            <button
                                v-if="row.image"
                                type="button"
                                class="table-icon-btn"
                                :aria-label="`Lihat gambar ${row.description}`"
                                @click="openProof(row.image)"
                            >
                                <i class="bi bi-image"></i>
                            </button>
                            <span v-else>-</span>
                        </template>
                    </ObjectTable>
                </div>
            </div>

            <div class="payment-details">
                <p class="section-label">Payment Detail</p>
                <div class="payment-list">
                    <div class="payment-row">
                        <p class="label">Jumlah Item</p>
                        <p class="value">
                            <strong>{{ totalQty }}</strong> Item
                        </p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Total</p>
                        <p class="value">{{ formatRupiah(current.total) }}</p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Catatan</p>
                        <p class="value">{{ current.catatan || '-' }}</p>
                    </div>
                    <div class="payment-row">
                        <p class="label">Bukti Pembayaran</p>
                        <div class="value">
                            <button
                                v-if="current.bukti"
                                type="button"
                                class="proof-btn"
                                aria-label="Lihat bukti pembayaran"
                                @click="openProof(current.bukti)"
                            >
                                Lihat gambar <i class="bi bi-image"></i>
                            </button>
                            <span v-else>-</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-else class="page-body">
            <p class="empty-state">
                <i class="bi bi-exclamation-circle"></i>
                Data pembelian tidak ditemukan.
            </p>
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

.page-action {
    margin-bottom: 15px;
    display: flex;
    justify-content: left;
}

strong {
    font-weight: 600;
}

.transaction-details .flat-table {
    border: none;
    padding: 0;
}

.flat-table :deep(td) {
    font-weight: 400;
    font-size: 20px;
}

.flat-table :deep(th) {
    font-weight: 500;
    font-size: 20px;
}

.purchase-detail {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-x: hidden;
}

.page-body {
    padding: 0 15px;
}

.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 24px;
    border-radius: 8px;
    background-color: #fff4ec;
    color: #6b6b6b;
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
    /* border-top: 1px solid #d9d9d9; */
}

.table-wrapper {
    width: 100%;
    max-width: 100%;
    contain: inline-size;
}

.table-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background-color: #ff6200;
    color: #ffffff;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.table-icon-btn:hover {
    background-color: #e05200;
}

.payment-details {
    margin-top: 8px;
    /* border-top: 1px solid #e5e5e5; */
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
    font-weight: 500;
    flex-shrink: 0;
    font-size: 20px;
}

.payment-row .value {
    min-width: 0;
    font-weight: 400;
    font-size: 20px;
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
    .flat-table :deep(td) {
        font-size: 16px;
    }

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
