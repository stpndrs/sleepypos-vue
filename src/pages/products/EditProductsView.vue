<script setup>
import Button from '@/components/Button.vue'
import InputText from '@/components/InputText.vue'
import SelectInput from '@/components/SelectInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const typeId = ref(1)
const categoryId = ref(1)
const unitId = ref(1)
const name = ref('Ciscuit')
const price = ref(8000)
const images = ref()
const notes = ref()

const submit = async () => {
    alert("Halo")
}

</script>

<template>
    <div>
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">Edit Produk</h1>
                <p class="page-description">Edit produk penjualan</p>
            </div>
        </section>
        <section class="page-body">
            <form action="#" method="post" @submit.prevent="submit">
                <section class="form-body">
                    <div class="col">
                        <SelectInput label="Tipe Produk" v-model="typeId" :required="true" placeholder="Pilih Tipe"
                            :options="[
                                {
                                    label: 'Satuan',
                                    value: 1
                                },
                                {
                                    label: 'Paket',
                                    value: 1
                                },
                            ]" />
                        <SelectInput label="Kategori Produk" v-model="categoryId" :required="true"
                            placeholder="Pilih Kategori" :options="[
                                {
                                    label: 'Makanan',
                                    value: 1
                                },
                                {
                                    label: 'Minuman',
                                    value: 1
                                },
                                {
                                    label: 'Paket',
                                    value: 1
                                },
                            ]" />
                        <SelectInput label="Satuan Produk" v-model="unitId" :required="true" placeholder="Pilih Satuan"
                            :options="[
                                {
                                    label: 'Pcs',
                                    value: 1
                                },
                                {
                                    label: 'Pax',
                                    value: 1
                                },
                            ]" />
                        <InputText label="Nama Produk" v-model="name" :required="true" placeholder="Nama produk" type="text" />
                    </div>
                    <div class="col">
                        <InputText label="Harga Produk" v-model="price" :required="true" placeholder="Harga produk" type="number" />
                        <InputText label="Upload gambar Produk" v-model="images" :required="false" placeholder="Upload gambar produk"
                            type="file" />
                        <InputText label="Catatan Produk" v-model="notes" :required="false" placeholder="Catatan produk"
                            type="textarea" />
                    </div>
                </section>
                <section class="form-footer">
                    <div class="btn-group">
                        <Button type="submit" variant="primary-solid">Simpan</Button>
                        <Button type="button" variant="border-primary"
                            @click="router.push({ name: 'products-view' })">Batalkan</Button>
                    </div>
                </section>
            </form>
        </section>
    </div>
</template>

<style scoped>
.form-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
</style>