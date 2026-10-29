<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  category: {
    type: String,
    default: 'SLEEPYRUBEN'
  },
  title: {
    type: String,
    default: 'Nama Menu'
  },
  price: {
    type: String,
    default: 'Rp 0'
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['order'])
const quantity = ref(1)

const increment = () => {
  quantity.value++
}

const decrement = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleOrder = () => {
  emit('order', {
    id: props.id,
    title: props.title,
    price: props.price,
    quantity: quantity.value
  })
}
</script>

<template>
  <div class="menu-card">

    <div class="card-image-wrapper">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="card-image"
      />
    
      <div v-else class="blank-image-placeholder"></div>

      <span class="category-tag">{{ category }}</span>
    </div>

    <div class="card-body">
      <div class="title-price-row">
        <h3 class="card-title">{{ title }}</h3>
        <span class="price-badge">{{ price }}</span>
      </div>

      <p class="card-description">{{ description }}</p>

      <div class="card-actions">
        <div class="quantity-control">
          <button class="qty-btn" @click="decrement" :disabled="quantity <= 1">-</button>
          <span class="qty-value">{{ quantity }}</span>
          <button class="qty-btn" @click="increment">+</button>
        </div>

        <button class="order-btn" @click="handleOrder">
          Pre order
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.menu-card {
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 24px;
  padding: 16px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #e5e7eb;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blank-image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #d1d5db;
}

.category-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #333333;
  text-transform: uppercase;
}

.card-body {
  padding: 16px 4px 4px 4px;
}

.title-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #17201d;
  margin: 0;
  line-height: 1.2;
}

.price-badge {
  background-color: #f5f2ea;
  color: #2b2b2b;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  white-space: nowrap;
}

.card-description {
  color: #82888c;
  font-size: 0.8rem;
  line-height: 1.5;
  font-weight: 400;
  margin: 0 0 20px 0;
  min-height: 36px;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quantity-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 6px 12px;
  width: 90px;
}

.qty-btn {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #17201d;
  cursor: pointer;
  padding: 0 4px;
}

.qty-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.qty-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #17201d;
}

.order-btn {
  flex: 1;
  background-color: #17201d;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.order-btn:hover {
  background-color: #2a3834;
}
</style>