<script setup>
import { ref } from 'vue'
import heroImage from '@/assets/hero-chef.jpg'
import Button from '@/components/Button.vue'
import MenuCard from '@/components/MenuCard.vue'
import DetailPreorder from '@/components/DetailPreorder.vue'
const menuItems = ref([
  {
    id: 1,
    category: 'CHEESECUIT',
    title: 'Classic Crunchy Cheesecuit',
    price: 'Rp 28.000',
    description: 'Layer biskuit renyah berpadu krim keju melimpah dan taburan keju parut gurih',
    image: ''
  },
  {
    id: 2,
    category: 'CHEESECUIT',
    title: 'Double Choco Cheesecuit',
    price: 'Rp 32.000',
    description: 'Perpaduan krim keju lembut dengan cokelat lumer premium',
    image: ''
  },
  {
    id: 3,
    category: 'COFFEE',
    title: 'Sleepy Ruben Milk Coffe',
    price: 'Rp 25.000',
    description: 'lorem ipsum dolor somting i forgot',
    image: ''
  },
  {
    id: 4,
    category: 'COFFEE',
    title: 'Caramel Machiato Chill',
    price: 'Rp 22.000',
    description: 'lorem ipsum dolor somting i forgot',
    image: ''
  },
  {
    id: 5,
    category: 'bundle',
    title: 'Combo Santai(Chesecuit + kopi)',
    price: 'Rp 45.000',
    description: 'lorem ipsum dolor somting i forgot',
    image: ''
  },
  {
    id: 6,
    category: 'bundle',
    title: 'Combo Sweet Tooth',
    price: 'Rp 52.000',
    description: 'lorem ipsum dolor somting i forgot',
    image: ''
  }
])

const handleExploreMenu = () => {
  console.log('Tombol explore ditekan!')
}

const categories = ['Semua', 'Cheesecuit', 'Coffee', 'Bundles']
const activeCategory = ref('Semua')

const selectCategory = (category) => {
  activeCategory.value = category
}
const showPreorderModal = ref(false)
const selectedPreorderData = ref(null)

const handleOrder = (orderData) => {
  selectedPreorderData.value = orderData
  showPreorderModal.value = true
}

const handleConfirmOrder = (finalData) => {
  console.log('Pesanan disubmit:', finalData)
  alert(`Pesanan ${finalData.title} (x${finalData.quantity}) atas nama ${finalData.customerInfo.name} telah diterima!`)
  
  showPreorderModal.value = false
}
</script>

<template>
  <div class="page-container">

    <header class="page-header">
      <div class="page-identity">

        <div class="logo">
        <h2>Sleepy Ruben</h2>
        </div>

        <nav class="nav-links">
         <a href="#" class="nav-item active">Home</a>
          <a href="#" class="nav-item">Menus</a>
          <a href="#" class="nav-item">Contact</a>
        </nav>
      
      </div>
    </header>

    <section class="page-body">

      <section class="hero-card">

        <div class="hero-content">

          <div class="main-text">
            <span class="hero-subtitle">CHEESECUIT · COFFEE</span>
            <h1 class="hero-title">
              A sweet break <br />
              <span class="italic-text">worth</span> slowing <br />
              down for.
            </h1>
            <p class="hero-description">
              Nikmati kelembutan krim keju berpadu renyahnya biskuit pilihan,
              disempurnakan dengan racikan kopi spesial dari Sleepy Ruben. Pas
              untuk menemani momen santai dan rehat sejenak dari kesibukanmu.
            </p>
            <Button variant="primary-solid" class="hero-btn" @click="handleExploreMenu">
              Explore the menu
              <span class="arrow">&rarr;</span>
            </Button>
          </div>

          <div class="hero-footer">
            <span>Buka Setiap Hari</span>
            <span class="dot">•</span>
            <span>08:00–22:00 WIB</span>
          </div>

        </div>

        <div class="hero-image-wrapper">
          <img :src="heroImage" alt="Chef" class="hero-image" />
          <div class="floating-badge">
            <span class="badge-tag">FROM THE FIELD</span>
            <p class="badge-title">To your table.</p>
          </div>
        </div>

      </section>

      <section class="menu">
        <div class="header-menu">

          <div class="header-text">
            <span class="menu-subtitle">RASA PILIHAN</span>
            <h2 class="menu-title">
              Our Signature <span class="italic-title">Menus</span>
            </h2>
            <p class="menu-description">
              Kombinasi manis, gurih, dan segarnya sajian spesial<br />
              Cheesecuit serta Kopi racikan Sleepy Ruben.
            </p>
          </div>

          <div class="category-filters">
            <button v-for="cat in categories" :key="cat" :class="['filter-btn', { active: activeCategory === cat }]"
              @click="selectCategory(cat)">
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="body-menu">

        </div>
      </section>

      <div class="menu">

        <div class="body-menu">
          <MenuCard v-for="item in menuItems" :key="item.id" :id="item.id" :category="item.category" :title="item.title"
            :price="item.price" :description="item.description" :image="item.image" @order="handleOrder" />
        </div>
      </div>
    </section>

   <section class="page-footer">

      <div class="complain">

        <div class="complain-wrapper">
          
          <div class="complain-info">
            <span class="complain-subtitle">HUBUNGI KAMI</span>
            <h1 class="complain-title">
              Your Sweet<br />
              Treat is<br />
              Waiting.
            </h1>
            <p class="complain-description">
              Punya pertanyaan seputar varian rasa, pesanan khusus acara, atau kerjasama? Kirimkan pesanmu di sini, kami siap membantu!
            </p>
            
            <hr class="complain-divider" />
            
            <div class="complain-details">
              <div class="detail-box">
                <strong>Visit</strong>
                <p>Jl. Utama No. 12, Surabaya, Jawa<br />Timur</p>
              </div>
              <div class="detail-box">
                <strong>Reach us</strong>
                <p>+62 812-3456-7890<br />hello@sleepyruben.com</p>
              </div>
            </div>
          </div>

          <div class="complain-form">
            <div class="form-row">
              <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Jane Smith" />
              </div>

              <div class="form-group">
                <label>Nomor Telepon / WhatsApp</label>
                <input type="text" placeholder="(503) 555-0123" />
              </div>
            </div>
            
            <div class="form-group">
              <label>Pesan Anda</label>
              <textarea placeholder="Tell us how we can help..."></textarea>
            </div>
            
            <button class="complain-btn">
              Send message <span>&rarr;</span>
            </button>
          </div>

        </div>
      </div>
      
      <div class="company-tag">
        <div class="company-tag-wrapper">
          <div class="tag-logo">
            <span class="tag-icon">M</span>
            Sleepy Ruben
          </div>
          <div class="tag-text">
            Seasonal food. Thoughtful people. Good evenings.
          </div>
          <div class="tag-copyright">
            © 2025 Sleepy Ruben
          </div>
        </div>
      </div>
      
    </section>
<DetailPreorder 
      :show="showPreorderModal"
      :orderData="selectedPreorderData"
      @close="showPreorderModal = false"
      @confirm="handleConfirmOrder"
    />

  </div>
</template>

<style scoped>
.page-identity{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.page-footer {
  display: flex;
  margin-bottom: -80px;
  margin-top: 60px;
  flex-direction: column;
  
  margin-right: -40px;
  margin-left: -40px;
 
}

.complain {
  background-color: #E8AD5B;
  display: flex;
  justify-content: center;
  padding: 80px 40px;
}

.complain-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  max-width: 1000px;
}

.complain-info {
  max-width: 450px;
  color: #17201D;
}

.complain-subtitle {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.complain-title {
  font-size: 56px;
  letter-spacing: -1px;

  line-height: 1.1;
  font-weight: 400;
  margin: 16px 0;

}

.complain-description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: rgba(23, 32, 29, 0.8);
}

.complain-divider {
  border: none;
  border-top: 1px solid rgba(23, 32, 29, 0.15);
  margin-bottom: 30px;
}

.complain-details {
  display: flex;
  gap: 50px;
}

.detail-box strong {
  font-size: 13px;
  margin-bottom: 8px;
}

.detail-box p {
  font-size: 13px;
  color: rgba(23, 32, 29, 0.8);
  margin: 0;
  line-height: 15px;
}

.complain-form {
  flex: 1;
  background-color: #F8F6F3;
  padding: 40px;
  border-radius: 24px;
  max-width: 500px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #17201D;
}

.form-group input,
.form-group textarea {
  padding: 14px 16px;
  border: 1px solid #EBEBEB;
  border-radius: 8px;
  font-size: 13px;
  background-color: #FFFFFF;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #E8AD5B;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.complain-btn {
  background-color: #E8AD5B;
  color: #17201D;
  border: none;
  border-radius: 999px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.complain-btn:hover {
  background-color: #d8a353;
}

.company-tag {
  background-color: #17201D;
  display: flex;
  justify-content: center;
  padding: 24px 40px;
}

.company-tag-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
}

.tag-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #FFFFFF;
}

.tag-icon {
  background-color: #E8AD5B;
  color: #17201D;
  width: 24px;
  height: 24px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
}

.tag-text,
.tag-copyright {
  font-size: 11px;
  color: #717D84;
}
.body-menu {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
  width: 100%;
}

.page-container{

  background-color: #ffffff;
  min-height: 100px;
 
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto ;
  padding: 24px 0;
}

.logo h2 {
  font-size: 30px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
}

.nav-item {
  text-decoration: none;
  color: #333333;
  padding: 8px 20px;
  font-size: 20px;
  font-weight: 600;
}

.nav-item.active {
  color: #d8a353;
}

.page-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.hero-card {
  display: flex;
  width: 100%;
  max-width: 1000px;
  background-color: #17201d;
  border-radius: 32px;
  overflow: hidden;
  color: #ffffff;
}

.hero-content {
  flex: 1;
  width: 50%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.hero-subtitle {
  color: #d8a353;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
}

.hero-title {
  font-size: 52px;
  line-height: 50px;
  font-weight: 50px;
  margin: 20px 0;
}

.italic-text {
  font-style: italic;
  color: #d8a353;
}

.hero-description {
  color: #a0aab0;
  font-size: 15px;
  margin: 0 0 30px 0;
  max-width: 380px;
}

.hero-btn {
  background-color: #d8a353;
  color: #17201d;
  border-radius: 999px;
  border-color: #d8a353;
  padding: 12px 24px;
  font-size: 15px;
  width: fit-content;
}

.hero-btn:hover {
  background-color: #c29045;
  border-color: #c29045;
}

.hero-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.141);
  padding-top: 24px;
  font-size: 10px;
  color: #717d84;
}

.hero-image-wrapper {
  flex: 1;
  width: 50%;
  position: relative;
  min-height: 450px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.floating-badge {
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 12px;
  text-align: right;
}

.badge-tag {
  font-size: 10px;
  letter-spacing: 1px;
  color: #d0d0d0;
  display: block;
}

.badge-title {
  font-style: italic;
  font-size: 15px;
  margin: 4px 0 0 0;
}

.menu {
  width: 100%;
  max-width: 1000px;
}

.header-menu {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}

.menu-subtitle {
  color: #d8a353;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}

.menu-title {
  font-size: 50px;
  font-weight: 500;
  color: #17201d;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.italic-title {
  font-style: italic;
  font-weight: 400;
}

.menu-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.category-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
}

.filter-btn {
  background-color: #ffffff;
  color: #374151;
   font-size: 10px;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  padding: 10px 24px;
  border-radius: 999px;
 
}

.filter-btn:hover {
  border-color: #17201d;
}

.filter-btn.active {
  background-color: #17201d;
  color: #ffffff;
  border-color: #17201d;
}
</style>