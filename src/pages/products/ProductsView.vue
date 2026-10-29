<script setup>
import { ref, computed, watch } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Link from '@/components/Link.vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import SelectInput from '@/components/SelectInput.vue';

function formatRupiah(value) {
    return 'Rp' + new Intl.NumberFormat('id-ID').format(value ?? 0);
}

const router = useRouter()
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const selectedCategory = ref('');
const categoryOptions = ['Makanan', 'Minuman'];

const products = ref([
    {
        id: 1,
        code: 'F0001',
        name: 'Cheesecuit 1',
        unit: 'Pcs',
        price: 6000,
        category: 'Makanan',
        notes: 'Catatan hehe',
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
        isActive: true
    },
    {
        id: 2,
        code: 'F0001',
        name: 'Cheesecuit 1',
        unit: 'Pcs',
        price: 6000,
        category: 'Makanan',
        notes: 'Catatan hehe',
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
        isActive: true
    },
    {
        id: 3,
        code: 'F0001',
        name: 'Cheesecuit 1',
        unit: 'Pcs',
        price: 6000,
        category: 'Makanan',
        notes: 'Catatan hehe',
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
        isActive: true
    },
    {
        id: 4,
        code: 'F0001',
        name: 'Cheesecuit 1',
        unit: 'Pcs',
        price: 6000,
        category: 'Makanan',
        notes: 'Catatan hehe',
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image',
        isActive: false
    },
]);

const totalItems = ref(products.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / perPage.value)));

function fetchData() {
    //Mungkin bisa di ganti ke getdata di api nanti
    totalItems.value = products.value.length;

    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;

    products.value = products.value.slice(start, end);
}

const imageUrl = ref(null);

function openImage(url) {
    imageUrl.value = url;
}

function closeImage() {
    imageUrl.value = null;
}

function toggleStatus(id) {
    alert("Halo")
}

watch([currentPage, perPage], fetchData, { immediate: true });
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar produk</h1>
                <p class="page-description">Daftar produk penjualan</p>
            </div>
            <div class="page-action">
                <Link routeName="create-products-view" variant="primary">Tambah produk</Link>
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <SearchInput v-model="searchQuery" placeholder="Cari data berdasarkan nama atau kode produk" />
                <SelectInput v-model="selectedCategory" placeholder="Pilih Status" :options="categoryOptions" />
            </section>
            <section class="data">
                <ObjectTable :head="[
                    'KODE PRODUK',
                    'NAMA',
                    'SATUAN',
                    'HARGA',
                    'KATEGORI',
                    'CATATAN',
                    'FOTO PRODUK',
                    'AKSI',
                ]" :items="products" :hide="['id', 'isActive']">
                    <template #cell-price="{ row }">{{ formatRupiah(row.price) }}</template>
                    <template #cell-image="{ row }">
                        <div class="action-buttons">
                            <Button v-if="row.image" variant="primary-solid" @click="openImage(row.image)">
                                <i class="bi bi-image"></i>
                            </Button>
                            <span v-else>-</span>
                        </div>
                    </template>
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <Button variant="primary-solid"
                                @click="router.push({ name: 'edit-products-view', params: { id: row.id } })">
                                <i class="bi bi-pencil"></i>
                            </Button>
                            <Button :variant="row.isActive ? 'primary-solid' : 'border-danger'" @click="toggleStatus(row.id)">
                                <i class="bi bi-power"></i>
                            </Button>
                        </div>
                    </template>
                </ObjectTable>
            </section>
        </section>
        <section class="page-footer">
            <div class="pagination-container">
                <Pagination v-model:currentPage="currentPage" v-model:perPage="perPage" :totalPages="totalPages" />
            </div>
        </section>

        <Teleport to="body">
            <div v-if="imageUrl" class="image-overlay" @click.self="closeImage">
                <div class="image-modal">
                    <button type="button" class="image-close" aria-label="Tutup" @click="closeImage">
                        &times;
                    </button>
                    <img :src="imageUrl" alt="Gambar produk" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>

.data {
    margin-top: 20px;
    contain: inline-size;
    overflow-x: auto;
}

.filters {
    width: 40%;
}

.pagination-container {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
}

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.image-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.image-modal {
    position: relative;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    max-width: 80vw;
    max-height: 80vh;
}

.image-modal img {
    display: block;
    max-width: 76vw;
    max-height: 74vh;
    object-fit: contain;
    border-radius: 8px;
}

.image-close {
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

.image-close:hover {
    background-color: #e05200;
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
