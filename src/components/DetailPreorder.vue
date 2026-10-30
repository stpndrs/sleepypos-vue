<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  orderData: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['close', 'confirm'])

// State untuk form
const quantity = ref(1)
const customerName = ref('')
const customerPhone = ref('')
const notes = ref('')

// Reset form dan set quantity bawaan setiap kali modal dibuka/data berubah
watch(() => props.orderData, (newData) => {
  if (newData) {
    quantity.value = newData.quantity || 1
    customerName.value = ''
    customerPhone.value = ''
    notes.value = ''
  }
})

// Fungsi pengubah quantity
const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

// Fungsi untuk mengubah string "Rp 45.000" menjadi angka 45000
const basePriceNumeric = computed(() => {
  if (!props.orderData || !props.orderData.price) return 0
  // Hapus semua karakter selain angka
  const numericString = props.orderData.price.replace(/[^0-9]/g, '')
  return Number(numericString)
})

// Hitung estimasi total (Harga x Quantity)
const estimatedTotal = computed(() => {
  return basePriceNumeric.value * quantity.value
})

// Format angka kembali ke format Rupiah
const formattedTotal = computed(() => {
  return 'Rp ' + estimatedTotal.value.toLocaleString('id-ID')
})

const handleSubmit = () => {
  // Gabungkan data pesanan dengan data pelanggan
  const finalOrder = {
    ...props.orderData,
    quantity: quantity.value,
    totalPrice: estimatedTotal.value,
    customerInfo: {
      name: customerName.value,
      phone: customerPhone.value,
      notes: notes.value
    }
  }
  emit('confirm', finalOrder)
}
</script>

<template>
  <!-- Modal Overlay -->
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-container">
      
      <!-- Header -->
      <div class="modal-header">
        <div class="header-text">
          <span class="subtitle">ALMOST YOURS</span>
          <h2 class="title">Detail Pre-Order</h2>
        </div>
        <button class="close-btn" @click="emit('close')">&times;</button>
      </div>

      <hr class="divider" />

      <!-- Body / Scrollable Content -->
      <div class="modal-body" v-if="orderData">
        
        <!-- Selected Dish Card -->
        <div class="dish-card">
          <div class="dish-img-wrapper">
            <img v-if="orderData.image" :src="orderData.image" :alt="orderData.title" class="dish-img" />
            <div v-else class="dish-placeholder"></div>
          </div>
          <div class="dish-info">
            <span class="dish-subtitle">SELECTED DISH</span>
            <h3 class="dish-title">{{ orderData.title }}</h3>
            <p class="dish-price">{{ orderData.price }}</p>
          </div>
        </div>

        <!-- Quantity & Total Calculator -->
        <div class="calculator-card">
          <div class="calc-left">
            <span class="calc-label">QUANTITY</span>
            <div class="qty-control">
              <button class="qty-btn" @click="decrement" :disabled="quantity <= 1">-</button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="increment">+</button>
            </div>
          </div>
          <div class="calc-right">
            <span class="calc-label text-right">ESTIMATED TOTAL</span>
            <h2 class="total-price">{{ formattedTotal }}</h2>
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" v-model="customerName" placeholder="Tuliskan nama Anda..." />
            </div>
            <div class="form-group">
              <label>Nomor WhatsApp / Telepon</label>
              <input type="text" v-model="customerPhone" placeholder="Contoh: 081234567890" />
            </div>
          </div>
          <div class="form-group">
            <label>Catatan Tambahan (Opsional)</label>
            <textarea v-model="notes" placeholder="Contoh: Less sugar / Tanpa es / Catatan pengiriman"></textarea>
          </div>
        </div>

      </div>

      <!-- Footer / Submit Button -->
      <div class="modal-footer">
        <button class="submit-btn" @click="handleSubmit" :disabled="!customerName || !customerPhone">
          Kirim Pesanan Pre-Order <span class="dot-separator">•</span> {{ formattedTotal }}
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Typografy Serif khusus untuk judul besar (meniru desain) */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 30, 30, 0.7); /* Sesuai backdrop gelap di gambar */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
}

.modal-container {
  background-color: #F9F6F0; /* Warna cream background modal */
  width: 100%;
  max-width: 550px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

/* HEADER */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 30px 20px 30px;
}

.subtitle {
  font-size: 10px;
  font-weight: 700;
  color: #D37435; /* Orange kecoklatan */
  letter-spacing: 1.5px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 6px;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 500;
  color: #17201D;
  margin: 0;
  line-height: 1.2;
}

.close-btn {
  background: transparent;
  border: 1px solid #E2DDD5;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  color: #17201D;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #EAE5DD;
}

.divider {
  border: none;
  border-top: 1px solid #EAE5DD;
  margin: 0;
}

/* BODY SCROLL */
.modal-body {
  padding: 24px 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* DISH CARD */
.dish-card {
  background-color: #EFE9DE;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.dish-img-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #D6D1C7;
  flex-shrink: 0;
}

.dish-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dish-placeholder {
  width: 100%;
  height: 100%;
  background-color: #D6D1C7;
}

.dish-info {
  display: flex;
  flex-direction: column;
}

.dish-subtitle {
  font-size: 10px;
  font-weight: 700;
  color: #D37435;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.dish-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 500;
  color: #17201D;
  margin: 0 0 6px 0;
}

.dish-price {
  font-size: 14px;
  color: #717D84;
  margin: 0;
}

/* CALCULATOR CARD */
.calculator-card {
  border: 1px solid #EAE5DD;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calc-label {
  font-size: 10px;
  font-weight: 700;
  color: #717D84;
  letter-spacing: 1px;
  margin-bottom: 12px;
  display: block;
}

.text-right {
  text-align: right;
}

.qty-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #EAE5DD;
  border-radius: 999px;
  padding: 8px 16px;
  width: 110px;
  box-sizing: border-box;
}

.qty-btn {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: #17201D;
  cursor: pointer;
  padding: 0;
}

.qty-btn:disabled {
  color: #CFCFCF;
}

.qty-value {
  font-size: 14px;
  font-weight: 600;
  color: #17201D;
}

.total-price {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 400;
  color: #17201D;
  margin: 0;
}

/* FORM SECTION */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 11px;
  font-weight: 700;
  color: #17201D;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  background-color: #FFFFFF;
  border: 1px solid #EAE5DD;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 13px;
  font-family: inherit;
  color: #17201D;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #A0AAB0;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #D37435;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* FOOTER */
.modal-footer {
  padding: 20px 30px 30px 30px;
}

.submit-btn {
  width: 100%;
  background-color: #E8AD5B;
  color: #17201D;
  border: none;
  border-radius: 999px;
  padding: 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #D89A45;
}

.submit-btn:disabled {
  background-color: #EAE5DD;
  color: #A0AAB0;
  cursor: not-allowed;
}

.dot-separator {
  margin: 0 8px;
  font-size: 16px;
}

/* Responsiveness for mobile */
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
  .modal-container {
    max-height: 90vh;
  }
}
</style>