<script setup>
import { ref, computed, watch } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import { inventories } from '@/data/inventories';

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const inventoriesData = ref(inventories);

const totalItems = ref(inventoriesData.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / perPage.value)));

function fetchData() {
    //Mungkin bisa di ganti ke getdata di api nanti
    totalItems.value = inventories.length;

    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;

    inventoriesData.value = inventories.slice(start, end);
}

watch([currentPage, perPage], fetchData, { immediate: true });
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Penyimpanan Barang</h1>
                <p class="page-description">List barang yang tersedia</p>
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
                    :head="['KODE BARANG', 'NAMA', 'QTY', 'SATUAN', 'CATATAN', 'AKSI']"
                    :items="inventoriesData"
                >
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <router-link
                                :to="{ name: 'inventories-view', params: { id: row.kodeBarang } }"
                                class="detail-icon"
                                aria-label="Detail Barang"
                            >
                                <i class="bi bi-eye"></i>
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

.detail-icon {
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

.detail-icon:hover {
    background-color: #e05200;
}

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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

    .page-action .btn {
        display: block;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>
