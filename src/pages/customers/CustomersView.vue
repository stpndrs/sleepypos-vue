<script setup>
import { ref } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import ObjectTable from '@/components/Table.vue';
import Pagination from '@/components/Pagination.vue';
import Link from '@/components/Link.vue';

const searchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const customers = [
    {
        no: 1,
        name: 'rizky',
        prodi: 'Sistem Informasi',
        angkatan: '2022',
        notes: 'Pelanggan',
        phone: '081234567890',
        photo: 'ada',
        id: 1,
    },
    {
        no: 2,
        name: 'agus',
        prodi: 'Informasi Teknologi',
        angkatan: '2024',
        notes: 'Pelanggan',
        phone: '085845797669',
        photo: 'ada',
        id: 2,
    },
    {
        no: 3,
        name: 'stipen',
        prodi: 'Informatika',
        angkatan: '2023',
        notes: 'Pelanggan',
        phone: '082198765432',
        photo: 'ada',
        id: 3,
    },
    {
        no: 4,
        name: 'raka',
        prodi: 'Bisnis Digital',
        angkatan: '2025',
        notes: 'Pelanggan',
        phone: '081398761234',
        photo: 'ada',
        id: 4,
    },
    {
        no: 5,
        name: 'Dimas',
        prodi: 'Teknik Komputer',
        angkatan: '2022',
        notes: 'Pelanggan',
        phone: '087812345678',
        photo: 'ada',
        id: 5,
    },
    {
        no: 6,
        name: 'fadil',
        prodi: 'Sains Data',
        angkatan: '2025',
        notes: 'Pelanggan',
        phone: '089612345678',
        photo: 'ada',
        id: 6,
    },
    {
        no: 7,
        name: 'ruben',
        prodi: 'Rekayasa Perangkat Lunak',
        angkatan: '2023',
        notes: 'Pelanggan',
        phone: '085212345678',
        photo: 'ada',
        id: 7,
    },
    {
        no: 8,
        name: 'samsul',
        prodi: 'Teknik Elektro',
        angkatan: '2024',
        notes: 'Pelanggan',
        phone: '081287654321',
        photo: 'ada',
        id: 8,
    },
    {
        no: 9,
        name: 'Rizky',
        prodi: 'Sistem Informasi',
        angkatan: '2021',
        notes: 'Alumni kampus',
        phone: '083812345678',
        photo: 'ada',
        id: 9,
    },
    {
        no: 10,
        name: 'Zahra',
        prodi: 'Bisnis Digital',
        angkatan: '2026',
        notes: 'Mahasiswa baru',
        phone: '085712345678',
        photo: 'ada',
        id: 10,
    },
];

function viewPhoto() {
}

function handleDelete() {
}
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Daftar Pelanggan</h1>
                <p class="page-description">Riwayat data pelanggan pada sleepy-pos</p>
            </div>
            <div class="page-action">
                <Link routeName="create-customers-view" variant="primary">Tambah Pelanggan</Link>
            </div>
        </section>

        <section class="page-body">
            <section class="filters">
                <SearchInput v-model="searchQuery" placeholder="Cari berdasarkan nama atau nomor telepon" />
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
                    <template #cell-photo>
                        <div class="action-buttons">
                            <button type="button" class="edit-icon proof-btn" aria-label="Lihat foto pelanggan"
                                @click="viewPhoto">
                                <i class="bi bi-image"></i>
                            </button>
                        </div>
                    </template>
                    <template #aksi="{ row }">
                        <div class="action-buttons">
                            <router-link :to="{ name: 'edit-customers-view', params: { id: row.id } }" class="edit-icon"
                                aria-label="Edit pelanggan">
                                <i class="bi bi-pencil"></i>
                            </router-link>
                            <button type="button" class="delete-icon" aria-label="Hapus pelanggan"
                                @click="handleDelete">
                                <i class="bi bi-trash"></i>
                            </button>
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
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.filters {
    width: 300px;
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

.edit-icon {
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
    cursor: pointer;
    transition:
        background-color 0.2s,
        opacity 0.2s;
}

.edit-icon:hover {
    background-color: #e05200;
}

.delete-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 10px;
    color: #ff6200;
    background-color: #ffffff;
    border: 1px solid #ff6200;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.delete-icon:hover {
    background-color: #fff5f0;
}

.action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.proof-btn {
    background-color: #ff6200;
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