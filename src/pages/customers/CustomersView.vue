<script setup>
import { ref } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Link from '@/components/Link.vue';
import Button from '@/components/Button.vue';
import router from '@/router';

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);
const imageUrl = ref(null);

const customers =ref( [
    {
        no: 1,
        name: 'rizky',
        prodi: 'Sistem Informasi',
        angkatan: '2022',
        notes: 'Pelanggan',
        phone: '081234567890',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 1,
    },
    {
        no: 2,
        name: 'rakha',
        prodi: 'Informasi Teknologi',
        angkatan: '2024',
        notes: 'Pelanggan',
        phone: '085845797669',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 2,
    },
    {
        no: 3,
        name: 'stipen',
        prodi: 'Informatika',
        angkatan: '2023',
        notes: 'Pelanggan',
        phone: '082198765432',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 3,
    },
    {
        no: 4,
        name: 'fadhil',
        prodi: 'Bisnis Digital',
        angkatan: '2025',
        notes: 'Pelanggan',
        phone: '081398761234',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 4,
    },
    {
        no: 5,
        name: 'Dimas',
        prodi: 'Teknik Komputer',
        angkatan: '2022',
        notes: 'Pelanggan',
        phone: '087812345678',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 5,
    },
    {
        no: 6,
        name: 'chandra',
        prodi: 'Sains Data',
        angkatan: '2021',
        notes: 'Pelanggan',
        phone: '081298765432',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 6,
    },
    {
        no: 7,
        name: 'virza',
        prodi: 'Rekayasa Perangkat Lunak',
        angkatan: '2023',
        notes: 'Pelanggan',
        phone: '085712349876',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 7,
    },
    {
        no: 8,
        name: 'ruben',
        prodi: 'Teknik Elektro',
        angkatan: '2020',
        notes: 'Pelanggan',
        phone: '082234567891',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 8,
    },
    {
        no: 9,
        name: 'dhimaz',
        prodi: 'Sistem Informasi',
        angkatan: '2024',
        notes: 'Pelanggan',
        phone: '081345678912',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 9,
    },
    {
        no: 10,
        name: 'rizky',
        prodi: 'Informasi Teknologi',
        angkatan: '2022',
        notes: 'Pelanggan',
        phone: '087798765432',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSusWVyiamRr1PmCjAsQcCMezWggQE2amRP6g5nWjTOw&s=10',
        id: 10,
    }
]);

function openImage(url) {
    imageUrl.value = url;
}

function closeImage() {
    imageUrl.value = null;
}

function Delete() {
    confirm('Apakah anda yakin ingin menghapus data pelanggan ini?');
}
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar Pelanggan</h1>
            </div>
            <div class="page-action">
                <Link routeName="create-customers-view" variant="primary">Tambah Pelanggan</Link>
            </div>
        </section>

        <section class="page-body">
            <section class="filters">
                <SearchInput v-model="searchQuery" placeholder="Cari berdasarkan nama atau nomor telepon pelanggan" />
            </section>
            <section class="data">
                <ObjectTable :head="[
                    'NO',
                    'NAME',
                    'PROGRAM STUDI',
                    'ANGKATAN',
                    'KETERANGAN',
                    'PHONE NUMBER',
                    'FOTO PELANGGAN',
                    'AKSI',
                ]" :items="customers" :hide="['id']">
                    <template #cell-photo="{ row }">
                        <div class="action-buttons">
                            <Button variant="primary-solid" aria-label="Lihat foto pelanggan"
                                @click="openImage(row.photo)">
                                <i class="bi bi-image"></i>
                            </Button>
                        </div>
                    </template>
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <Button variant="primary-solid" aria-label="Edit pelanggan"
                                @click="router.push({ name: 'edit-customers-view', params: { id: row.id } })">
                                <i class="bi bi-pencil"></i>
                            </Button>
                            <Button variant="border-danger" aria-label="Hapus pelanggan" @click="Delete">
                                <i class="bi bi-trash"></i>
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

        <Teleport to="body">
            <div v-if="imageUrl" class="image-overlay" @click.self="closeImage">
                <div class="image-modal">
                    <button type="button" class="image-close" aria-label="Tutup" @click="closeImage">
                        &times;
                    </button>
                    <img :src="imageUrl" alt="Foto pelanggan" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.filters {
    width: 35%;
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
    gap: 6px;
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