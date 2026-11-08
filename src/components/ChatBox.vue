<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const inputMessage = ref('')
const chatBodyRef = ref(null)

const messages = ref([
  {
    id: 1,
    sender: 'ai',
    text: 'Halo, aku BenAI siap menjawab pertanyaan kamu'
  },
  {
    id: 2,
    sender: 'user',
    text: 'Ben, apa produk paling populer di sleepy ruben?'
  },
  {
    id: 3,
    sender: 'ai',
    text: 'Hmm, produk paling populer sejauh ini adalah cheesecuit rasa keju, dan kopi cold brew latte. Cheesecuit rasa keju memiliki harga yang cukup terjangkau, mulai dari Rp8.000 dan kopi Rp12.000'
  }
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  }
}

const handleSend = () => {
  if (!inputMessage.value.trim()) return

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: inputMessage.value
  })

  const userQuery = inputMessage.value
  inputMessage.value = ''
  scrollToBottom()

  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      sender: 'ai',
      text: `Terima kasih! Mengenai "${userQuery}", BenAI akan membantu memberikan informasi lebih rinci segera.`
    })
    scrollToBottom()
  }, 600)
}
</script>

<template>
  <div class="chatbox-wrapper">
    
    <Transition name="fade-slide">
      <div v-if="isOpen" class="chat-modal">
        
        <div class="chat-header">
          <div>
            <span class="faq-badge">FAQ</span>
            <h2 class="chat-title">Tanya AI</h2>
          </div>
          <button @click="toggleChat" class="close-btn" aria-label="Tutup">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="chat-body" ref="chatBodyRef">
          <div 
            v-for="msg in messages" 
            :key="msg.id"
            :class="['message-row', msg.sender === 'user' ? 'row-user' : 'row-ai']"
          >
            <div :class="['message-bubble', msg.sender === 'user' ? 'bubble-user' : 'bubble-ai']">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div class="chat-input-section">
          <label>Tanyakan sesuatu</label>
          <textarea
            v-model="inputMessage"
            @keydown.enter.prevent="handleSend"
            placeholder="Contoh: Apa produk paling populer?"
            rows="2"
          ></textarea>
          <button @click="handleSend" class="send-btn">
            Kirim pertanyaan
          </button>
        </div>
      </div>
    </Transition>

    <button @click="toggleChat" class="floating-btn">
      <div class="floating-icon">💬</div>
      <span class="floating-text">Cari Tau Apapun tentang kami</span>
    </button>

  </div>
</template>

<style scoped>

.chatbox-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Poppins', sans-serif; 
}

.chat-modal {
  width: 90vw;
  margin-bottom: 16px;
  max-width: 420px;
  background-color: #F9F6F0;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 24px;
  border-bottom: 1px dashed #d6d3d1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.faq-badge {
  font-size: 10px;
  color: #92400e;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: block;
}

.chat-title {
  font-family: 'Newsreader', serif;
  font-size: 28px;
  color: #17201D;
  margin: 0;
  font-weight: 500;
  line-height: 1.2;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #d6d3d1;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #57534e;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(214, 211, 209, 0.5);
}

.chat-body {
  padding: 20px 24px;
  flex: 1;
  max-height: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}
.chat-body::-webkit-scrollbar-thumb {
  background-color: #d6d3d1;
  border-radius: 10px;
}

.message-row {
  display: flex;
  width: 100%;
}

.row-user {
  justify-content: flex-end;
}

.row-ai {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 85%;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: #040505;
  background-color: #ffffff;
}

.bubble-user {
  border-radius: 16px 16px 4px 16px; 
}

.bubble-ai {
  border-radius: 16px 16px 16px 4px; 
}

.chat-input-section {
  padding: 8px 24px 24px 24px;
}

.chat-input-section label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #44403c;
  margin-bottom: 8px;
}

.chat-input-section textarea {
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 12px;
  font-size: 13px;
  color: #17201D;
  border: 1px solid #e5e5e5;
  resize: none;
  font-family: poppy;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.chat-input-section textarea:focus {
  outline: none;
  border-color: #E8AC5C;
}

.send-btn {
  width: 100%;
  margin-top: 12px;
  padding: 12px 20px;
  background-color: #E8AC5C;
  color: #17201D;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-btn:hover {
  background-color: #df9f4b;
}

.floating-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  color: #17201D;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.floating-btn:hover {
  background-color: #ffffff;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.floating-icon {
  width: 24px;
  height: 24px;
  background-color: #fef3c7;
  color: #b45309;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.floating-text {
  font-size: 13px;
  font-weight: 600;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>