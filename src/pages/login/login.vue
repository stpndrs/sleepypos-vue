<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="login-brand">
          <p class="brand-title">Sleepy<span>POS</span></p>
          <div class="brand-icon" title="SleepyPOS">
            <i class="bi bi-shop-window" aria-hidden="true"></i>
          </div>
        </div>
        <h2>Selamat Datang Kembali</h2>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            placeholder="Username atau Anda" 
            required
          >
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="form.password" 
              placeholder="Password akun Anda" 
              required
            >
            <button
              type="button"
              class="toggle-password"
              :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
              :aria-pressed="showPassword"
              @click="toggleShowPassword"
            >
              <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="btn-login">Masuk</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      showPassword: false
    }
  },
 methods: {
  handleLogin() {
    this.$router.push('/dashboard');
  },
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
}
</script>

<style scoped>
.login-page {
    font-family: 'poppins', sans-serif;
  background-color: #f4f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.login-container {
  background: #ffffff;
  padding: 40px 50px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary, #ff6200);
  border-radius: 12px;
}

.brand-icon i {
  color: #fff;
  font-size: 22px;
}

.brand-title {
  margin: 0;
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.brand-title span {
  color: #ff5c00;
}

.login-header h2 {
  font-size: 16px;
  font-weight: 500;
  color: #555;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  background-color: #f9fafb;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #f97316;
  background-color: #fff;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  transform: translateY(-50%);
  color: #9ca3af;
  cursor: pointer;
  font-size: 14px;
}

.toggle-password:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 3px;
}

.btn-login {
  width: 100%;
  background-color: #f97316;
  color: white;
  border: none;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
}

.btn-login:hover {
  background-color: #ea580c;
}
</style>