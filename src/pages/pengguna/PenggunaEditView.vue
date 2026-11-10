<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePengguna } from '@/composables/usePengguna.js';

const route = useRoute();
const router = useRouter();
const { findUserById, updateUser } = usePengguna();
const userId = computed(() => route.params.id);
const user = computed(() => findUserById(userId.value));

const form = ref({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: '',
});

const saveNotice = ref('');

if (user.value) {
    form.value = { ...user.value };
} else {
    saveNotice.value = `Pengguna dengan ID ${userId.value} tidak ditemukan.`;
}

function saveUser() {
    if (!user.value) return;

    const updated = updateUser(userId.value, form.value);
    if (!updated) {
        saveNotice.value = `Pengguna dengan ID ${userId.value} tidak ditemukan.`;
        return;
    }

    router.push({ name: 'pengguna-view' });
}

function cancelEdit() {
    router.push({ name: 'pengguna-view' });
}
</script>

<template>
    <section class="edit-user-page">
        <header class="page-header">
            <div class="page-identity">
                <h1>Edit Pengguna</h1>
                <p>Perbarui informasi pengguna #{{ route.params.id }}</p>
            </div>
            <button class="back-button" type="button" @click="cancelEdit">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
                Kembali ke daftar
            </button>
        </header>

        <form v-if="user" class="user-form" @submit.prevent="saveUser">
            <div class="form-grid">
                <div class="form-group">
                    <label for="user-name">Nama Pengguna</label>
                    <input
                        id="user-name"
                        v-model.trim="form.name"
                        type="text"
                        autocomplete="name"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="user-username">Username</label>
                    <input
                        id="user-username"
                        v-model.trim="form.username"
                        type="text"
                        autocomplete="username"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="user-email">Email</label>
                    <input
                        id="user-email"
                        v-model.trim="form.email"
                        type="email"
                        autocomplete="email"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="user-phone">Nomor Telepon</label>
                    <input
                        id="user-phone"
                        v-model.trim="form.phone"
                        type="tel"
                        autocomplete="tel"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="user-role">Peran</label>
                    <select id="user-role" v-model="form.role" required>
                        <option value="" disabled>Pilih peran pengguna</option>
                        <option value="Admin">Admin</option>
                        <option value="Kasir">Kasir</option>
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <button class="save-button" type="submit">Simpan Perubahan</button>
                <button class="cancel-button" type="button" @click="cancelEdit">Batalkan</button>
            </div>
        </form>
        <p v-if="saveNotice" class="save-notice" role="status">{{ saveNotice }}</p>
    </section>
</template>

<style scoped>
.edit-user-page {
    color: #333;
    font-family: 'Poppins', sans-serif;
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
}

.page-identity h1 {
    margin: 0 0 6px;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
}

.page-identity p {
    margin: 0;
    color: #787878;
    font-size: 13px;
}

.back-button,
.save-button,
.cancel-button {
    display: inline-flex;
    min-height: 40px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 8px;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
}

.back-button {
    border-color: #e5e7eb;
    color: #4b5563;
    background: #fff;
}

.user-form {
    padding: 24px;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    background: #fff;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.form-group {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    color: #374151;
    font-size: 13px;
    font-weight: 500;
}

.form-group input,
.form-group select {
    width: 100%;
    min-height: 44px;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    outline: none;
    background: #f9fafb;
    font: inherit;
    font-size: 13px;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #f97316;
    background: #fff;
}

.save-notice {
    margin: 20px 0 0;
    color: #9a5a08;
    font-size: 13px;
}

.form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
}

.save-button {
    color: #fff;
    background: #f97316;
}

.save-button:hover {
    background: #ea580c;
}

.cancel-button {
    border-color: #e5e7eb;
    color: #4b5563;
    background: #fff;
}

@media (max-width: 640px) {
    .page-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .user-form {
        padding: 18px;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>
