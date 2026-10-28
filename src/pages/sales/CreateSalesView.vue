<script setup>
import BackLink from '@/components/BackLink.vue';
import Button from '@/components/Button.vue';
import InputFile from '@/components/InputFile.vue';
import InputText from '@/components/InputText.vue';
import ProductCard from '@/components/ProductCard.vue';
import SearchInput from '@/components/SearchInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { ref, watch } from 'vue';

const searchQuery = ref('')
const selectedCategory = ref('')
const categoryOptions = ref(['Makanan', 'Minuman', 'Paket'])
const selectedPaymentMethod = ref('')
const paymentMethodOptions = ref(['Tunai', 'Transfer', 'QRIS'])
const paymentProof = ref('')
const subTotal = ref(0)
const discount = ref(0)
const total = ref(0)

const selectedItems = ref([])

// Dummy Data
const products = ref([
    {
        id: 1,
        code: 'F0001',
        name: 'Cheesecuit Keju 1',
        category: "Makanan",
        stock: 5,
        current_stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/1/image'
    },
    {
        id: 2,
        code: 'F0002',
        name: 'Cheesecuit Keju 2',
        category: "Makanan",
        stock: 5,
        current_stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/2/image'
    },
    {
        id: 3,
        code: 'F0003',
        name: 'Cheesecuit Keju 3',
        category: "Makanan",
        stock: 5,
        current_stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/3/image'
    },
    {
        id: 4,
        code: 'F0004',
        name: 'Cheesecuit Keju 4',
        category: "Makanan",
        stock: 5,
        current_stock: 5,
        unit_price: 8000,
        image: 'https://api-pos.fadhilahnaf.my.id/api/products/4/image'
    },
]);

function clearFilter() {
    searchQuery.value = ''
    selectedCategory.value = ''
}

function findProduct(id) {
    return products.value.find(d => d.id == id)
}

function selectItem(id) {
    // check if the item button is clicked (not from addQtyBtn)
    let checkItem = selectedItems.value.find(d => d.id == id)
    if (checkItem) {
        addItem(id)
        return
    }
    let currentStock = findProduct(id).current_stock -= 1
    const item = {
        id: id,
        qty: 1,
        unit_price: findProduct(id).unit_price,
        price: findProduct(id).unit_price
    }
    selectedItems.value.push(item)
    calculateSubTotal()
    console.log(item.qty, currentStock)

}

function addItem(id) {
    let item = selectedItems.value.find(d => d.id == id)
    let currentStock = findProduct(id).current_stock
    if (currentStock >= 1) {
        item.qty += 1
        item.price += findProduct(id).unit_price
        findProduct(id).current_stock -= 1
        calculateSubTotal()
    } else {
        alert("Stock Habis")
    }
}

function decreaseItem(id) {
    let stock = findProduct(id).stock
    let currentStock = findProduct(id).current_stock
    let item = selectedItems.value.find(d => d.id == id)
    if (item.qty == 1) {
        removeItem(id)
    } else if (item.qty > 1 && currentStock < stock) {
        item.qty -= 1
        item.price -= findProduct(id).unit_price
    }
    findProduct(id).current_stock += 1

    calculateSubTotal()
}

function removeItem(id) {
    selectedItems.value = selectedItems.value.filter(d => d.id !== id)
}

function calculateSubTotal() {
    subTotal.value = selectedItems.value.reduce((acc, curr) => acc + curr.price, 0)
    calculateTotal()
}

function calculateDiscount() {
    let discVal = Number(discount.value) || 0

    if (discVal < 0) {
        discVal = 0
    }

    if (discVal > subTotal.value) {
        discVal = subTotal.value
    }

    discount.value = discVal
    calculateTotal()
}

function calculateTotal() {
    const discVal = Number(discount.value) || 0
    const calculatedTotal = subTotal.value - discVal
    total.value = calculatedTotal < 0 ? 0 : calculatedTotal
}

watch(discount, () => {
    calculateDiscount()
})

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
                    <ProductCard v-for="(item, index) in products" :key="index" :products="item"
                        @click="selectItem(item.id)" />
                </section>
            </section>

            <aside class="summary">
                <div class="identity">
                    <h3 class="summary-title">Data Transaksi</h3>
                    <h2 class="transaction-code">#P0001</h2>
                </div>

                <div class="divider">
                    <span class="divider-label">{{ selectedItems.length }} Items Selected</span>
                    <div class="dashed-line"></div>
                </div>

                <div class="items">
                    <div class="item" v-for="(item, index) in selectedItems" :key="index">
                        <div class="item-image">
                            <img :src="findProduct(item.id).image" alt="Image">
                        </div>
                        <div class="item-body">
                            <h4 class="item-title">{{ findProduct(item.id).name }}</h4>
                            <p class="item-category">{{ findProduct(item.id).category }}</p>
                            <p class="item-price">Rp {{ item.price?.toLocaleString('id-ID') }}</p>
                            <div class="item-action">
                                <Button variant="primary" @click="decreaseItem(item.id)">-</Button>
                                <div class="item-qty">{{ item.qty }}</div>
                                <Button variant="primary" :disabled="findProduct(item.id).current_stock == 0"
                                    @click="addItem(item.id)">+</Button>
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
                        <span class="payment-item-value">Rp {{ subTotal?.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="payment-item">
                        <span class="payment-item-label">Discount</span>
                        <span class="payment-item-value">
                            <InputText v-model="discount" placeholder="10000" type="number"
                                :isDisabled="total == 0" />
                        </span>
                    </div>
                    <div class="payment-item total-row">
                        <span class="payment-item-label">Total</span>
                        <span class="payment-item-value">Rp {{ total?.toLocaleString('id-ID') }}</span>
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
    align-items: center;
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