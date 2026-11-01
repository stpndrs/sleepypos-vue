<script setup>
import { computed, ref } from 'vue';
import DateRangeInput from '@/components/DateRangeInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import Button from '@/components/Button.vue';
import BackLink from '@/components/BackLink.vue';
import { purchases } from '@/data/purchases';

// Filter states
const startDate = ref('');
const endDate = ref('');
const searchQuery = ref('');

const purchasesData = ref(purchases);

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

const selected = ref([]);

const allSelected = computed({
    get: () =>
        purchasesData.value.length > 0 && selected.value.length === purchasesData.value.length,
    set: (checked) => {
        selected.value = checked ? purchasesData.value.map((row) => row.kode) : [];
    },
});

function toggle(kode) {
    const index = selected.value.indexOf(kode);
    if (index === -1) {
        selected.value.push(kode);
    } else {
        selected.value.splice(index, 1);
    }
}

function exportExcel() {}

function exportPdf() {}
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Laporan Transaksi Pembelian</h1>
                <p class="page-description">Laporan pembelian transaksi</p>
            </div>
            <div class="page-action">
                <BackLink
                    routeName="purchases-view"
                    variant="primary"
                    label="Lihat semua transaksi"
                />
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <DateRangeInput
                    v-model:startDate="startDate"
                    v-model:endDate="endDate"
                    :label="''"
                />
                <SearchInput
                    v-model="searchQuery"
                    placeholder="Cari berdasarkan deskripsi atau nama pembeli"
                />
            </section>
            <section class="report-action">
                <Button variant="primary" @click="exportExcel"
                    ><i class="bi bi-file-earmark-excel"></i> Export Excel</Button
                >
                <Button variant="primary" @click="exportPdf"
                    ><i class="bi bi-file-earmark-pdf"></i> Export PDF</Button
                >
            </section>
            <section class="data">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    v-model="allSelected"
                                    type="checkbox"
                                    aria-label="Pilih semua pembelian"
                                />
                            </th>
                            <th>KODE TRANSAKSI</th>
                            <th>TANGGAL</th>
                            <th>NAMA PEMBELI</th>
                            <th>CATATAN</th>
                            <th>TOTAL HARGA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in purchasesData" :key="row.kode">
                            <td>
                                <input
                                    :checked="selected.includes(row.kode)"
                                    type="checkbox"
                                    :aria-label="`Pilih pembelian ${row.kode}`"
                                    @change="toggle(row.kode)"
                                />
                            </td>
                            <td>{{ row.kode }}</td>
                            <td>{{ formatDate(row.tanggal) }}</td>
                            <td>{{ row.nama }}</td>
                            <td>{{ row.catatan }}</td>
                            <td>Rp{{ row.total.toLocaleString('id-ID') }}</td>
                        </tr>
                        <tr v-if="purchasesData.length === 0">
                            <td colspan="6" class="empty-row">Belum ada data</td>
                        </tr>
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

.empty-row {
    color: #787878;
    padding: 24px 10px;
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
