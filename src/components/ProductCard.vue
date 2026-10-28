<script setup>
import Button from '@/components/Button.vue';

const props = defineProps({
    products: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['add']);
</script>

<template>
    <div class="products-card">
        <!-- Header / Gambar Produk -->
        <div class="card-header">
            <img :src="products.image" :alt="products.name" class="product-image">
        </div>

        <!-- Body / Detail Produk -->
        <div class="card-body">
            <div class="identity-row">
                <span class="product-code">{{ products.code }}</span>
                <span class="product-stock">Stock {{ products.current_stock }}</span>
            </div>
            <div class="identity-row">
                <h5 class="card-title">{{ products.name }}</h5>
                <h5 class="unit-price">Rp {{ products.unit_price?.toLocaleString('id-ID') }}</h5>
            </div>
        </div>

        <!-- Footer / Tombol Action -->
        <div class="card-footer">
            <Button variant="primary-solid" @click="emit('add', products)">
                <i class="bi bi-plus-lg"></i>
            </Button>
        </div>
    </div>
</template>

<style scoped>
.products-card {
    background: #FFFFFF;
    border: 3px solid var(--primary);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
}

.card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    aspect-ratio: 1 / 1;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
}

.identity-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-code,
.product-stock {
    font-size: 12px;
    color: #B0B0B0;
    font-weight: 400;
}

.card-title,
.unit-price {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    color: #1A1A1A;
}

.card-footer {
    display: flex;
    width: 100%;
}

button {
    width: 100%;
}
</style>