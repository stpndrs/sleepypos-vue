<script setup>
import { reactive } from 'vue';
import BackLink from '@/components/BackLink.vue';
import InputFile from '@/components/InputFile.vue';
import InputText from '@/components/InputText.vue';
import SelectInput from '@/components/SelectInput.vue';
import router from '@/router';

const form = reactive({
    name: '',
    phone: '',
    prodi: '',
    angkatan: '',
    notes: '',
});

const prodiOptions = [
    'Sistem Informasi',
    'Informasi Teknologi',
    'Informatika',
    'Bisnis Digital',
    'Sains Data',
    'Rekayasa Perangkat Lunak',
    'Teknik Komputer',
    'Teknik Elektro',
];

function handleSubmit() {
    alert('Pelanggan berhasil ditambahkan!');
    router.push({ name: 'customers-view' });
}

function handleCancel() {
    router.push({ name: 'customers-view' });
}
</script>

<template>
    <div class="page">
        <section class="button-back">
            <BackLink label="Lihat semua pelanggan" routeName="customers-view" variant="primary" />
        </section>

        <section class="data">
            <h1 class="page-title">Tambah Pelanggan</h1>
            <form class="form" @submit.prevent="handleSubmit">
                <div class="form-top">
                    <div class="column-left">
                        <InputText v-model="form.name" label="Nama Pelanggan" placeholder="Nama pelanggan" required />

                        <InputText v-model="form.phone" label="Nomor Telepon Pelanggan"
                            placeholder="Nomor telepon pelanggan" required />

                        <div class="field">
                            <label>Program Studi Pelanggan</label>
                            <SelectInput v-model="form.prodi" placeholder="Pilih Program Studi"
                                :options="prodiOptions" />
                        </div>

                        <InputText v-model="form.angkatan" label="Tahun Angkatan Pelanggan"
                            placeholder="Tahun angkatan pelanggan" />
                    </div>

                    <div class="column-right">
                        <div class="field">
                            <label>Foto Pelanggan</label>
                            <InputFile placeholder="Upload foto pelanggan" accept="image/*" />
                        </div>

                        <div class="field field-grow">
                            <label for="notes">Catatan</label>
                            <textarea id="notes" v-model="form.notes" placeholder="Catatan"></textarea>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Simpan</button>
                    <button type="button" class="btn btn-outline" @click="handleCancel">Batalkan</button>
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

.page-title {
    font-weight: 700;
    margin: 16px 0 24px;
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

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

.field-grow {
    flex: 1;
}

.form-actions {
    display: flex;
    gap: 12px;
}

label {
    font-size: 16px;
}

textarea {
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    min-height: 120px;
    padding: 12px 16px;
    background: #f3f3f3;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    resize: none;
}

textarea::placeholder {
    color: #8a8a8a;
}

.btn {
    padding: 10px 24px;
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
}

.btn-primary {
    background: #ff6a00;
    border: 1px solid #ff6a00;
    color: #fff;
}

.btn-outline {
    background: #fff;
    border: 1px solid #ff6a00;
    color: #ff6a00;
}

@media (max-width: 991.98px) {
    .form-top {
        grid-template-columns: 1fr;
    }
}
</style>