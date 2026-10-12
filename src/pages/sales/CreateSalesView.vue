<script setup>
import BackLink from '@/components/BackLink.vue';
import Button from '@/components/Button.vue';
import InputFile from '@/components/InputFile.vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { ref } from 'vue';

const searchQuery = ref('')
const selectedCategory = ref('')
const categoryOptions = ref(['Makanan', 'Minuman', 'Paket'])
const selectedPaymentMethod = ref('')
const paymentMethodOptions = ref(['Tunai', 'Transfer', 'QRIS'])
const paymentProof = ref('')

// Dummy Data
const products = ref([
    {
        id: 1,
        code: 'F0001',
        name: 'Cheesecuit Keju',
        stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image'
    },
    {
        id: 2,
        code: 'F0002',
        name: 'Cheesecuit Keju',
        stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/2/image'
    },
    {
        id: 3,
        code: 'F0003',
        name: 'Cheesecuit Keju',
        stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/3/image'
    },
    {
        id: 4,
        code: 'F0004',
        name: 'Cheesecuit Keju',
        stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/4/image'
    },
]);

function clearFilter() {
    searchQuery.value = ''
    selectedCategory.value = ''
}
</script>

<template>
    <div>

        <section class="page-body">
            <section class="data">
                <BackLink label="Lihat semua transaksi" routeName="sales-view" variant="primary" />

                <section class="filters">
                    <SearchInput v-model="searchQuery" placeholder="Cari data berdasarkan nama atau kode produk" />
                    <SelectInput v-model="selectedCategory" placeholder="Pilih Kategori" :options="categoryOptions" />
                    <Button variant="primary" @click="clearFilter()">Bersihkan Filter</Button>
                </section>
                <section class="products">
                    <ProductCard v-for="(item, index) in products" :key="index" :products="item" />
                </section>
            </section>

            <aside class="summary">
                <div class="identity">
                    <h3 class="summary-title">Data Transaksi</h3>
                    <h2 class="transaction-code">#P0001</h2>
                </div>

                <div class="divider">
                    <span class="divider-label">3 Items Selected</span>
                    <div class="dashed-line"></div>
                </div>

                <div class="items">
                    <!-- Item 1 -->
                    <div class="item">
                        <div class="item-image">
                            <img src="https://api-pos.fadhilahnaf.my.id/api/products/1/image" alt="Image">
                        </div>
                        <div class="item-body">
                            <h4 class="item-title">Cheesecuit 1</h4>
                            <p class="item-category">Makanan</p>
                            <p class="item-price">Rp 6.000</p>
                            <div class="item-action">
                                <Button variant="primary" disabled="true">-</Button>
                                <div class="item-qty">1</div>
                                <Button variant="primary">+</Button>
                            </div>
                        </div>
                    </div>

                    <!-- Item 2 -->
                    <div class="item">
                        <div class="item-image">
                            <img src="https://api-pos.fadhilahnaf.my.id/api/products/1/image" alt="Image">
                        </div>
                        <div class="item-body">
                            <h4 class="item-title">Coffee 1</h4>
                            <p class="item-category">Minuman</p>
                            <p class="item-price">Rp 6.000</p>
                            <div class="item-action">
                                <Button variant="primary">-</Button>
                                <div class="item-qty">2</div>
                                <Button variant="primary">+</Button>
                            </div>
                        </div>
                    </div>

                    <!-- Item 3 -->
                    <div class="item">
                        <div class="item-image">
                            <img src="https://api-pos.fadhilahnaf.my.id/api/products/1/image" alt="Image">
                        </div>
                        <div class="item-body">
                            <h4 class="item-title">Paket 1</h4>
                            <p class="item-category">Makanan</p>
                            <p class="item-price">Rp 6.000</p>
                            <div class="item-action">
                                <Button variant="primary" disabled="true">-</Button>
                                <div class="item-qty">1</div>
                                <Button variant="primary">+</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="divider">
                    <span class="divider-label">Payment Details</span>
                    <div class="dashed-line"></div>
                </div>

                <div class="payments">
                    <div class="payment-item">
                        <span class="payment-item-label">Sub Totals</span>
                        <span class="payment-item-value">Rp 18.000</span>
                    </div>
                    <div class="payment-item">
                        <span class="payment-item-label">Discount</span>
                        <span class="payment-item-value">0</span>
                    </div>
                    <div class="payment-item total-row">
                        <span class="payment-item-label">Total</span>
                        <span class="payment-item-value">Rp 18.000</span>
                    </div>
                </div>

                <div class="select-wrapper">
                    <SelectInput v-model="selectedPaymentMethod" placeholder="Pilih metode pembayaran"
                        :options="paymentMethodOptions" />
                </div>

                <div class="action-grid">
                    <Button variant="primary-solid">Place Order</Button>
                    <Button variant="border-primary">
                        <i class="bi bi-journal"></i>
                    </Button>
                </div>

                <Button variant="border-danger">Cancel</Button>
            </aside>
        </section>
    </div>
</template>

<style scoped>
.page-body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
}

.filters {
    margin: 30px 0;
}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
}

.summary {
    border-left: 1px solid #E5E5E5;
    padding: 24px 20px;
    background-color: #FFFFFF;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
}

.identity {
    text-align: center;
    margin-bottom: 20px;
}

.summary-title {
    font-size: 20px;
    font-weight: 600;
    color: #2D2D2D;
    margin: 0 0 4px 0;
}

.transaction-code {
    font-size: 30px;
    font-weight: 800;
    color: var(--primary);
    margin: 0;
}

.divider {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0;
}

.divider-label {
    color: #444;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.dashed-line {
    flex-grow: 1;
    border-bottom: 1px dashed #444;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    height: 50vh;
}

.item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding-bottom: 12px;
    border-bottom: 1px solid #F0F0F0;
}

.item:last-child {
    border-bottom: none;
}

.item-image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-body {
    flex-grow: 1;
}

.item-title {
    font-size: 20px;
    font-weight: 700;
    color: #1A1A1A;
    margin: 0 0 2px 0;
}

.item-category {
    font-size: 14px;
    color: #8C8C8C;
    margin: 0 0 4px 0;
}

.item-price {
    font-size: 18px;
    font-weight: 700;
    color: #FF5700;
    margin: 0 0 10px 0;
}

.item-action {
    display: flex;
    align-items: center;
    gap: 10px;
}

.item-qty {
    border: 1px solid #E0E0E0;
    padding: 8px 20px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    color: #333333;
}

.payments {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
}

.payment-item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #555555;
}

.payment-item-value {
    font-weight: 700;
    color: #1A1A1A;
}

.select-wrapper {
    margin-bottom: 16px;
}

.action-grid {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
}

.action-grid button:nth-child(1) {
    width: 100%;
}

@media screen and (max-width: 991.98px) {
    .page-body {
        grid-template-columns: 1fr;
        padding-bottom: 30px;
    }
}
</style>