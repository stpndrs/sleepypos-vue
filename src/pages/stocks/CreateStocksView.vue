<script setup>
import { ref } from 'vue';
import BackLink from '@/components/BackLink.vue';
import Button from '@/components/Button.vue';
import InputText from '@/components/InputText.vue';
import SelectInput from '@/components/SelectInput.vue';
import router from '@/router';

const product = ref('');
const productName = ref('');
const productUnit = ref('');
const quantity = ref('');
const date = ref('');
const notes = ref('');

const productOptions = ref([
    'Cheesecuit Keju',
    'Cheesecuit Oreo',
    'Cheesecuit Milo',
    'Cheesecuit Red Velvet',
    'Kopi Cold Brew',
    'Kopi Thai',
    'Kopi Latte',
]);

function Submit() {
    alert('Stok produk berhasil ditambah');
    router.push({ name: 'stocks-view' });
}

function Cancel() {
    router.push({ name: 'stocks-view' });
}
</script>

<template>
    <div class="page">
        <section class="button-back">
            <BackLink label="Lihat riwayat stok" routeName="stocks-view" variant="primary" />
        </section>

        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Tambah Stok</h1>
            </div>
        </section>

        <section class="data">
            <form class="form" @submit.prevent="Submit">
                <div class="form-top">
                    <div class="column-left">
                        <SelectInput v-model="product" label="Pilih produk" placeholder="Pilih produk"
                            :options="productOptions" :required="true" />

                        <InputText v-model="productName" label="Nama Produk" placeholder="Nama produk" />

                        <InputText v-model="productUnit" label="Satuan" placeholder="Pilih satuan" />
                    </div>

                    <div class="column-right">
                        <InputText v-model="quantity" label="Kuantitas" placeholder="Jumlah stok" type="number"
                            :required="true" />

                        <InputText v-model="date" label="Tanggal" placeholder="dd/mm/yy" :required="true" />

                        <InputText v-model="notes" label="Catatan" placeholder="Catatan" type="textarea" />
                    </div>
                </div>

                <div class="btn-group">
                    <Button type="submit" variant="primary-solid">Simpan</Button>
                    <Button type="button" variant="border-primary" @click="Cancel">Batalkan</Button>
                </div>
            </form>
        </section>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
}

.button-back {
    height: 35px;
    align-content: center;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
}

.form-top {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.column-left,
.column-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

@media (max-width: 991.98px) {
    .form-top {
        grid-template-columns: 1fr;
    }
}
</style>