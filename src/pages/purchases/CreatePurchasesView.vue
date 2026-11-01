<script setup>
import { computed, reactive, watch } from 'vue';
import InputDate from '@/components/InputDate.vue';
import InputFile from '@/components/InputFile.vue';
import Button from '@/components/Button.vue';
import InputText from '@/components/InputText.vue';
import SelectInput from '@/components/SelectInput.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { purchases } from '@/data/purchases';

const route = useRoute();
const isEdit = computed(() => route.name === 'edit-purchases-view');

function getPurchase(id) {
    //Mungkin bisa di ganti melakukan get ke api berdasarkan kode nya
    return purchases.find((row) => row.kode === id) ?? null;
}

async function loadPurchase() {
    if (!isEdit.value) {
        form.buyerName = '';
        form.paymentProof = null;
        form.total = null;
        form.date = '';
        form.note = '';
        form.items = [createItem()];
        return;
    }

    const purchase = await getPurchase(route.params.id);
    if (!purchase) {
        alert('Data pembelian tidak ditemukan');
        return;
    }

    form.buyerName = purchase.nama;
    form.total = purchase.total;
    form.date = purchase.tanggal.split('/').reverse().join('-');
    form.note = purchase.catatan;
    form.paymentProof = purchase.bukti;
    form.items = purchase.items.map((item) => ({ ...item }));
}

let nextItemId = 1;

function createItem() {
    return {
        id: nextItemId++,
        description: '',
        price: null,
        quantity: null,
        unit: '',
        image: null,
    };
}

const form = reactive({
    buyerName: '',
    paymentProof: null,
    total: null,
    date: '',
    note: '',
    items: [createItem()],
});

const unitOptions = ['pcs', 'kg', 'gram', 'liter', 'pak', 'box'];

function addItem() {
    form.items.push(createItem());
}

function removeItem(id) {
    if (form.items.length === 1) return;
    form.items = form.items.filter((item) => item.id !== id);
}

function getSubtotal(item) {
    return (item.price || 0) * (item.quantity || 0);
}

function onPaymentProofChange(event) {
    form.paymentProof = event.target.files[0] ?? null;
}

function onItemImageChange(item, event) {
    item.image = event.target.files[0] ?? null;
}

function submitForm() {
    if (
        !form.date ||
        (!isEdit.value && !form.paymentProof) ||
        form.items.some((item) => !item.unit || !item.image)
    ) {
        alert('Tanggal pembelian, bukti pembayaran, satuan, dan gambar produk wajib diisi');
        return;
    }

    const formData = new FormData();
    formData.append('buyer_name', form.buyerName);
    formData.append('total', form.total ?? '');
    formData.append('date', form.date);
    formData.append('note', form.note);
    if (form.paymentProof) formData.append('payment_proof', form.paymentProof);

    form.items.forEach((item, index) => {
        formData.append(`items[${index}][description]`, item.description);
        formData.append(`items[${index}][price]`, item.price ?? '');
        formData.append(`items[${index}][quantity]`, item.quantity ?? '');
        formData.append(`items[${index}][unit]`, item.unit);
        formData.append(`items[${index}][subtotal]`, getSubtotal(item));
        if (item.image) formData.append(`items[${index}][image]`, item.image);
    });

    const label = isEdit.value ? `PUT /purchases/${route.params.id}` : 'POST /purchases';
    console.log(label, [...formData.entries()]);
}

function cancel() {
    router.push({ name: 'purchases-view' });
}

watch(() => route.params.id, loadPurchase, { immediate: true });
</script>

<template>
    <div class="page">
        <section class="page-header">
            <div class="page-identity">
                <h1 class="page-title">{{ isEdit ? 'Edit Pembelian' : 'Tambah Pembelian' }}</h1>
            </div>
        </section>

        <section class="data">
            <form class="form" @submit.prevent="submitForm">
                <div class="form-top">
                    <div class="column-left">
                        <InputText
                            v-model="form.buyerName"
                            label="Nama Pembeli"
                            placeholder="Nama pembeli barang"
                            required
                        />

                        <InputText
                            v-model="form.total"
                            label="Total pembayaran"
                            type="number"
                            min="0"
                            placeholder="Total pembayaran"
                            required
                        />

                        <div class="field">
                            <label> Tanggal Pembelian <span class="required">*</span> </label>
                            <InputDate v-model="form.date" required />
                        </div>
                    </div>

                    <div class="column-right">
                        <div class="field">
                            <label> Bukti Pembayaran <span class="required">*</span> </label>
                            <InputFile
                                placeholder="Upload bukti pembayaran"
                                accept="image/*,.pdf"
                                required
                                @change="onPaymentProofChange"
                            />
                        </div>

                        <div class="field field-grow">
                            <label for="note">Catatan</label>
                            <textarea
                                id="note"
                                v-model="form.note"
                                placeholder="Catatan"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div class="items">
                    <div class="btn-add">
                        <Button variant="primary-solid" @click="addItem">Tambah Item +</Button>
                    </div>

                    <div v-for="item in form.items" :key="item.id" class="item-row">
                        <InputText
                            v-model="item.description"
                            label="Keterangan"
                            placeholder="Keterangan pembelian"
                            required
                        />

                        <InputText
                            v-model="item.price"
                            label="Harga produk"
                            type="number"
                            min="0"
                            placeholder="Harga per satuan"
                            required
                        />

                        <InputText
                            v-model="item.quantity"
                            label="Quantity"
                            type="number"
                            min="1"
                            placeholder="Quantity barang"
                            required
                        />

                        <div class="field">
                            <label> Satuan <span class="required">*</span> </label>
                            <SelectInput
                                v-model="item.unit"
                                placeholder="Pilih Satuan"
                                :options="unitOptions"
                            />
                        </div>

                        <div class="field">
                            <label :for="`subtotal-${item.id}`">
                                Subtotal <span class="required">*</span>
                            </label>
                            <input
                                :id="`subtotal-${item.id}`"
                                :value="getSubtotal(item)"
                                type="number"
                                placeholder="Subtotal"
                                readonly
                            />
                        </div>

                        <div class="field">
                            <label> Gambar Produk <span class="required">*</span> </label>
                            <InputFile
                                placeholder="Upload gambar produk"
                                accept="image/*"
                                required
                                @change="onItemImageChange(item, $event)"
                            />
                        </div>

                        <button
                            type="button"
                            class="btn-remove"
                            :disabled="form.items.length === 1"
                            aria-label="Hapus item"
                            @click="removeItem(item.id)"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                <div class="form-actions">
                    <Button variant="primary-solid" type="submit">Simpan</Button>
                    <Button variant="border-primary" @click="cancel">Batalkan</Button>
                </div>
            </form>
        </section>
    </div>
</template>

<style scoped>
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

.items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr)) auto;
    gap: 20px;
    align-items: end;
}

.form-actions {
    display: flex;
    gap: 12px;
}

label {
    font-size: 16px;
}

.required {
    color: #e53935;
}

input,
textarea {
    width: 100%;
    box-sizing: border-box;
    height: 48px;
    padding: 0 16px;
    background: #f3f3f3;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
}

textarea {
    flex: 1;
    min-height: 120px;
    padding: 12px 16px;
    resize: none;
}

input::placeholder,
textarea::placeholder {
    color: #8a8a8a;
}

input[readonly] {
    cursor: default;
}

.btn-add {
    size: 30%;
}

.btn-remove {
    width: 32px;
    height: 48px;
    background: transparent;
    border: none;
    font-size: 22px;
    color: #a79090;
    cursor: pointer;
}

.btn-remove:disabled {
    visibility: hidden;
}

@media (max-width: 991.98px) {
    .form-top {
        grid-template-columns: 1fr;
    }

    .item-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .btn-remove {
        grid-column: 1 / -1;
        justify-self: end;
        height: 32px;
    }
}
</style>
