<script setup>
import { ref } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import Button from '@/components/Button.vue'
import router from '@/router'
import Link from '@/components/Link.vue'

//Filter States
const searchQuery = ref('')
</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identify">
                <h1 class="page-title">Daftar Riwayat Pembelian</h1>
                <p class="page-description">Riwayat pembelian bahan dan alat pada sleepy-pos</p>
            </div>
            <div class="page-action">
                <Link routeName="create-purchases-view" variant="primary">Tambah Pembelian</Link>
            </div>
        </section>
        <section class="page-body">
            <section class="filters">
                <SearchInput
                    v-model="searchQuery"
                    placeholder="Cari data berdasarkan nama atau kode produk"
                />
            </section>
            <section class="data"></section>
        </section>
    </div>
</template>

<style scoped>
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
