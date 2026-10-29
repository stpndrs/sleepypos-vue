<script setup>
import { ref } from 'vue';
import BackLink from '@/components/BackLink.vue';
import Button from '@/components/Button.vue';
import InputText from '@/components/InputText.vue';
import SelectInput from '@/components/SelectInput.vue';
import router from '@/router';

const name = ref('rizky');
const phone = ref('081234567890');
const prodi = ref('Sistem Informasi');
const angkatan = ref('2022');
const notes = ref('Pelanggan');

const prodiOptions = ref([
    'Sistem Informasi',
    'Informasi Teknologi',
    'Informatika',
    'Bisnis Digital',
    'Sains Data',
    'Rekayasa Perangkat Lunak',
    'Teknik Komputer',
    'Teknik Elektro',
]);

function Submit() {
    alert('Perubahan berhasil disimpan');
    router.push({ name: 'customers-view' });
}

function Cancel() {
    router.push({ name: 'customers-view' });
}
</script>

<template>
    <div class="page">
        <section class="button-back">
            <BackLink label="Lihat semua pelanggan" routeName="customers-view" variant="primary" />
        </section>

        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Edit Pelanggan</h1>
                <p class="page-description">Edit data pelanggan</p>
            </div>
        </section>

        <section class="data">
            <form class="form" @submit.prevent="Submit">
                <div class="form-top">
                    <div class="column-left">
                        <InputText v-model="name" label="Nama Pelanggan" placeholder="Nama pelanggan" required />

                        <InputText v-model="phone" label="Nomor Telepon Pelanggan" placeholder="Nomor telepon pelanggan"
                            required />

                        <SelectInput v-model="prodi" label="Program Studi Pelanggan" placeholder="Pilih Program Studi"
                            :options="prodiOptions" />

                        <InputText v-model="angkatan" label="Tahun Angkatan Pelanggan"
                            placeholder="Tahun angkatan pelanggan" />
                    </div>

                    <div class="column-right">
                        <InputText label="Foto Pelanggan" placeholder="Upload foto pelanggan" type="file"
                            accept="image/*" />

                        <InputText v-model="notes" label="Catatan" placeholder="Catatan" type="textarea" />
                    </div>
                </div>

                <div class="btn-group">
                    <Button type="submit" variant="primary-solid">Simpan Perubahan</Button>
                    <Button type="button" variant="border-primary" @click="Cancel">Batalkan</Button>
                </div>
            </form>
        </section>
    </div>
</template>

<style scoped>
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