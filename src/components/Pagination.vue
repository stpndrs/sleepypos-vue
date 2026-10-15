<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
        validator: (value) => Number.isInteger(value) && value > 0,
    },
    currentPage: { type: Number, default: 1 },
    perPage: { type: Number, default: 10 },
    perPageOptions: { type: Array, default: () => [10, 20, 50] },
});

const emit = defineEmits(['update:currentPage', 'update:perPage']);

const goToPageInput = ref('');

function setPage(n) {
    const page = Math.min(Math.max(n, 1), props.totalPages);
    if (page !== props.currentPage) emit('update:currentPage', page);
}

function handleGoToPageSubmit() {
    const n = parseInt(goToPageInput.value, 10);
    if (!Number.isNaN(n)) setPage(n);
    goToPageInput.value = '';
}

function handlePerPageChange(e) {
    emit('update:perPage', Number(e.target.value));
    emit('update:currentPage', 1);
}

const visiblePages = computed(() => {
    const total = props.totalPages;
    const c = props.currentPage;

    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (c <= 3) return [1, 2, 3, '...', total];
    if (c >= total - 2) return [1, '...', total - 2, total - 1, total];
    return [1, '...', c - 1, c, c + 1, '...', total];
});
</script>

<template>
    <div class="pagination">
        <div class="page">
            <button class="nav-btn" :disabled="currentPage === 1" @click="setPage(currentPage - 1)">
                &lt;
            </button>

            <template v-for="(n, i) in visiblePages" :key="i">
                <span v-if="n === '...'" class="dots">...</span>
                <button
                    v-else
                    class="page-btn"
                    :class="{ active: n === currentPage }"
                    @click="setPage(n)"
                >
                    {{ n }}
                </button>
            </template>

            <button
                class="nav-btn"
                :disabled="currentPage === totalPages"
                @click="setPage(currentPage + 1)"
            >
                &gt;
            </button>
        </div>

        <select class="count-data" :value="perPage" @change="handlePerPageChange">
            <option v-for="opt in perPageOptions" :key="opt" :value="opt">{{ opt }} / Page</option>
        </select>

        <form class="go-page" @submit.prevent="handleGoToPageSubmit">
            <label for="fgo">Go to page</label>
            <input
                id="fgo"
                v-model="goToPageInput"
                type="number"
                min="1"
                :max="totalPages"
                class="input-page"
            />
            <button type="submit" class="go-btn">Go</button>
        </form>
    </div>
</template>

<style scoped>
.pagination {
    display: inline-flex;
    align-items: center;
    gap: 28px;
    margin-top: 10px;
    padding: 7px 16px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
}

.page {
    display: flex;
    align-items: center;
    gap: 4px;
}

button {
    border: none;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
    padding: 0;
}

.page-btn {
    min-width: 24px;
    height: 25px;
    padding: 0 4px;
    border-radius: 6px;
    color: #ffb88a;
    font-size: 13px;
}

.page-btn.active {
    background: #ff6a00;
    color: #fff;
    font-weight: 600;
}

.dots {
    color: #ffb88a;
    padding: 0 2px;
}

.nav-btn {
    width: 20px;
    height: 25px;
    font-size: 16px;
    color: #ffb88c;
}

.nav-btn:disabled {
    color: #ffb88a;
    cursor: not-allowed;
}

.count-data {
    width: 64px;
    height: 25px;
    padding: 0 8px;
    border: 1px solid #ff6a00;
    border-radius: 6px;
    background: #fff;
    font-family: inherit;
    font-size: 11px;
    color: #5a3a22;
    text-align: center;
    appearance: none;
}

.go-page {
    display: flex;
    align-items: center;
    gap: 6px;
}

.go-page label {
    color: #ffb88a;
    font-size: 12px;
}

.input-page {
    width: 28px;
    height: 25px;
    border: 1px solid #ff6a00;
    border-radius: 6px;
    text-align: center;
    font-family: inherit;
    font-size: 12px;
    outline: none;
    appearance: textfield;
}

.input-page::-webkit-inner-spin-button,
.input-page::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

.go-btn {
    padding: 0 4px;
    font-size: 12px;
    color: #5a3a22;
}
</style>
