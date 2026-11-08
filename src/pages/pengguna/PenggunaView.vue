<template>
    <div class="content-body">
        <!-- BAGIAN 1: DAFTAR PENGGUNA (TABLE VIEW) -->
        <section class="card-section">
            <h2 class="section-title">Daftar Pengguna</h2>

            <div class="action-bar">
                <div class="search-box">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Cari berdasarkan nama atau email pengguna"
                    />
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
                <button class="btn btn-primary" @click="navigateToAddUser">
                    <i class="fa-solid fa-plus"></i> Tambah Pengguna Baru
                </button>
            </div>

            <!-- TABEL DATA -->
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>NAMA</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>ROLE</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in filteredUsers" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td>
                                <span
                                    :class="[
                                        'badge',
                                        user.role === 'Admin' ? 'badge-admin' : 'badge-kasir',
                                    ]"
                                >
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="action-buttons">
                                <button
                                    class="btn-icon btn-edit"
                                    title="Edit"
                                    @click="editUser(user.id)"
                                >
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button
                                    class="btn-icon btn-delete"
                                    title="Hapus"
                                    @click="deleteUser(user.id)"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="filteredUsers.length === 0">
                            <td colspan="7" style="text-align: center; color: #9ca3af">
                                Tidak ada data ditemukan.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- PAGINATION -->
            <div class="pagination-wrapper">
                <div class="pagination-controls">
                    <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        class="page-btn"
                        :class="{ active: currentPage === page }"
                        @click="currentPage = page"
                    >
                        {{ page }}
                    </button>
                    <button
                        class="page-btn"
                        :disabled="currentPage === totalPages"
                        @click="currentPage++"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <div class="pagination-jump">
                    <span>Go to page</span>
                    <input
                        type="number"
                        min="1"
                        :max="totalPages"
                        v-model.number="jumpPage"
                        class="page-input"
                    />
                    <button class="btn-go" @click="goToPage">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePengguna } from '@/composables/usePengguna.js';

const router = useRouter();
const { users, deleteUser: removeUser } = usePengguna();

// State Pencarian & Pagination
const searchQuery = ref('');
const currentPage = ref(1);
const totalPages = ref(3);
const jumpPage = ref(1);

// Filter Pengguna berdasarkan Input Search
const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    const q = searchQuery.value.toLowerCase();
    return users.value.filter(
        (user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q),
    );
});

// Action Handlers
const navigateToAddUser = () => {
    router.push({ name: 'create-pengguna-view' });
};

const editUser = (id) => {
    router.push({ name: 'edit-pengguna-view', params: { id } });
};

const deleteUser = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        removeUser(id);
    }
};

const goToPage = () => {
    if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
        currentPage.value = jumpPage.value;
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.content-body {
    color: #333333;
    font-family: 'Poppins', sans-serif;
}

/* CARD SECTION */
.card-section {
    background: #ffffff;
    border-radius: 12px;
    padding: 24px 28px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.margin-top-lg {
    margin-top: 32px;
}

.section-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 20px;
}

/* ACTION BAR & SEARCH */
.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 16px;
}

.search-box {
    position: relative;
    width: 380px;
}

.search-box input {
    width: 100%;
    padding: 10px 38px 10px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 12px;
    background-color: #f9fafb;
    outline: none;
}

.search-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 12px;
}

/* BUTTONS */
.btn {
    padding: 9px 18px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background-color: #f97316;
    color: #ffffff;
}

.btn-primary:hover {
    background-color: #ea580c;
}

.btn-secondary {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #6b7280;
}

.btn-secondary:hover {
    background-color: #f9fafb;
}

/* TABEL STYLES */
.table-responsive {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    text-align: left;
}

th {
    background-color: #fafafa;
    color: #6b7280;
    font-weight: 600;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    text-transform: uppercase;
    font-size: 11px;
}

td {
    padding: 14px 16px;
    border-bottom: 1px solid #f3f4f6;
    color: #374151;
}

/* BADGES & AKSI */
.badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
}

.badge-admin {
    background-color: #fef3c7;
    color: #d97706;
}

.badge-kasir {
    background-color: #e0f2fe;
    color: #0284c7;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 11px;
}

.btn-edit {
    background-color: #f97316;
    color: #ffffff;
}

.btn-delete {
    background-color: #ef4444;
    color: #ffffff;
}

/* PAGINATION */
.pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 20px;
    font-size: 12px;
}

.pagination-controls {
    display: flex;
    gap: 4px;
}

.page-btn {
    width: 28px;
    height: 28px;
    border: 1px solid #e5e7eb;
    background: #fff;
    border-radius: 4px;
    font-size: 11px;
    cursor: pointer;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn.active {
    background-color: #f97316;
    color: #fff;
    border-color: #f97316;
}

.pagination-jump {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
}

.page-input {
    width: 38px;
    height: 28px;
    text-align: center;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 11px;
}

.btn-go {
    height: 28px;
    padding: 0 8px;
    border: 1px solid #e5e7eb;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
}

/* FORM STYLES (DUAL COLUMN) */
.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px 14px;
    font-size: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #f9fafb;
    outline: none;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #f97316;
    background-color: #ffffff;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 10px;
}
</style>
