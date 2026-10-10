<script setup>
import { computed } from 'vue';
import Button from '@/components/Button.vue'

const props = defineProps({
    transaction: {
        type: Object,
        required: true
    }
});

defineEmits(['detail', 'cancel']);

const statusClass = computed(() => {
    switch (props.transaction.status?.toLowerCase()) {
        case 'paid':
            return 'status-paid';
        case 'pending':
            return 'status-pending';
        case 'cancel':
            return 'status-cancel';
        default:
            return 'status-draft';
    }
});
</script>

<template>
    <div class="transaction-card">
        <div class="card-header">
            <h5 class="card-title">{{ transaction.code }}</h5>
            <span :class="['card-status', statusClass]">{{ transaction.status }}</span>
        </div>

        <div class="card-body">
            <div class="identity">
                <span class="customer-name">{{ transaction.customerName }}</span>
                <span class="transaction-date">{{ transaction.date }}</span>
            </div>

            <div class="items">
                <div class="item" v-for="(item, idx) in transaction.items" :key="idx">
                    <span class="item-name">{{ item.name }}</span>
                    <span class="item-qty"><strong>{{ item.qty }}</strong> pcs</span>
                </div>
            </div>

            <div class="price">
                <span class="price-label">Total harga</span>
                <span class="price-total">Rp {{ transaction.totalPrice?.toLocaleString('id-ID') }}</span>
            </div>
        </div>

        <div class="card-footer">
            <Button variant="primary-solid">
                Lihat detail transaksi
            </Button>

            <Button variant="border-danger">
                Batalkan transaksi
            </Button>
        </div>
    </div>
</template>

<style scoped>
.transaction-card {
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.02);
    font-family: 'Poppins', sans-serif;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.card-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #1A1A1A;
}

.card-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    color: #FFFFFF;
    text-transform: capitalize;
}

.status-draft {
    background-color: #5C4033;
}

.status-paid {
    background-color: #107C41;
}

.status-pending {
    background-color: #FF9800;
}

.status-cancel {
    background-color: #FF0000;
}

.identity {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #7F7F7F;
    margin-bottom: 14px;
}

.customer-name {
    font-weight: 500;
    color: #333333;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    min-height: 80px;
}

.item {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #4A4A4A;
}

.price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px dashed #EAEAEA;
    margin-bottom: 14px;
}

.price-label {
    font-size: 11px;
    color: #7F7F7F;
}

.price-total {
    font-size: 13px;
    font-weight: 700;
    color: #1A1A1A;
}

.card-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>