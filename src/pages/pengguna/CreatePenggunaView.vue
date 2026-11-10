<template>
    <div class="content-body">
        <!-- KONDISI TAMPILAN: TABEL ATAU FORM -->
        <template v-if="currentView === 'table'">
            <!-- BAGIAN 1: DAFTAR PENGGUNA (TABLE VIEW) -->
            <section class="card-section">
                <h2 class="section-title">Daftar Pengguna</h2>

                <div class="action-bar">
                    <div class="search-box">
                        <input
                            v-model.trim="searchQuery"
                            type="search"
                            aria-label="Cari pengguna"
                            placeholder="Cari nama, username, atau email pengguna"
                        />
                        <i class="bi bi-search search-icon" aria-hidden="true"></i>
                    </div>
                    <button class="btn btn-primary" @click="openAddForm">
                        <i class="bi bi-plus-lg" aria-hidden="true"></i> Tambah Pengguna Baru
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
                            <tr v-for="(user, index) in paginatedUsers" :key="user.id">
                                <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
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
                                        aria-label="Edit pengguna"
                                        @click="openEditForm(user)"
                                    >
                                        <i class="bi bi-pencil" aria-hidden="true"></i>
                                    </button>
                                    <button
                                        class="btn-icon btn-delete"
                                        title="Hapus"
                                        aria-label="Hapus pengguna"
                                        @click="deleteUser(user.id)"
                                    >
                                        <i class="bi bi-trash" aria-hidden="true"></i>
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
                        <button
                            class="page-btn"
                            aria-label="Halaman sebelumnya"
                            :disabled="currentPage === 1"
                            @click="currentPage--"
                        >
                            <i class="bi bi-chevron-left" aria-hidden="true"></i>
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
                            aria-label="Halaman berikutnya"
                            :disabled="currentPage === totalPages"
                            @click="currentPage++"
                        >
                            <i class="bi bi-chevron-right" aria-hidden="true"></i>
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
                        <button class="btn-go" aria-label="Pergi ke halaman" @click="goToPage">
                            <i class="bi bi-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </section>
        </template>

        <template v-else>
            <!-- BAGIAN 2: FORM TAMBAH / UBAH PENGGUNA -->
            <section class="card-section">
                <h2 class="section-title">
                    {{ isEditMode ? 'Ubah Pengguna' : 'Tambah Pengguna' }}
                </h2>

                <form class="user-form" @submit.prevent="saveUser">
                    <div class="form-grid">
                        <!-- Kolom Kiri -->
                        <div class="form-column">
                            <div class="form-group">
                                <label for="user-name">Nama Pengguna *</label>
                                <input
                                    id="user-name"
                                    v-model.trim="form.name"
                                    type="text"
                                    placeholder="Nama pengguna akun"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="user-email">Email Pengguna *</label>
                                <input
                                    id="user-email"
                                    v-model.trim="form.email"
                                    type="email"
                                    placeholder="Email pengguna akun"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="user-phone">Nomor Telepon Pengguna *</label>
                                <input
                                    id="user-phone"
                                    v-model.trim="form.phone"
                                    type="tel"
                                    placeholder="Nomor telepon pengguna akun"
                                    required
                                />
                            </div>
                        </div>

                        <!-- Kolom Kanan -->
                        <div class="form-column">
                            <div class="form-group">
                                <label for="user-username">Username Pengguna *</label>
                                <input
                                    id="user-username"
                                    v-model.trim="form.username"
                                    type="text"
                                    placeholder="Username pengguna akun"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="user-password"
                                    >Password Pengguna {{ isEditMode ? '' : '*' }}</label
                                >
                                <input
                                    id="user-password"
                                    v-model="form.password"
                                    type="password"
                                    :placeholder="
                                        isEditMode
                                            ? 'Kosongkan jika tidak diubah'
                                            : 'Password pengguna akun'
                                    "
                                    :required="!isEditMode"
                                />
                            </div>
                            <div class="form-group">
                                <label for="user-role">Peran Pengguna *</label>
                                <select id="user-role" v-model="form.role" required>
                                    <option value="" disabled>Pilih peran pengguna akun</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Kasir">Kasir</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Tombol Aksi Form -->
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Simpan</button>
                        <button type="button" class="btn btn-secondary" @click="cancelForm">
                            Batalkan
                        </button>
                    </div>
                </form>
            </section>
        </template>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { usePengguna } from '@/composables/usePengguna.js';

const currentView = ref('table');
const isEditMode = ref(false);

const { users, addUser, updateUser, deleteUser: removeUser } = usePengguna();

const createEmptyForm = () => ({
    id: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
});
const form = ref(createEmptyForm());

const searchQuery = ref('');
const currentPage = ref(1);
const jumpPage = ref(1);
const pageSize = 5;

const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return users.value.filter((user) =>
        [user.name, user.username, user.email].some((value) => value.toLowerCase().includes(query)),
    );
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize)));
const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredUsers.value.slice(start, start + pageSize);
});

watch(searchQuery, () => {
    currentPage.value = 1;
});

watch(totalPages, (pages) => {
    if (currentPage.value > pages) currentPage.value = pages;
});

watch(currentPage, (page) => {
    jumpPage.value = page;
});

const openAddForm = () => {
    isEditMode.value = false;
    form.value = createEmptyForm();
    currentView.value = 'form';
};

const openEditForm = (user) => {
    isEditMode.value = true;
    form.value = { ...user, password: '' };
    currentView.value = 'form';
};

const cancelForm = () => {
    currentView.value = 'table';
};

const saveUser = () => {
    if (isEditMode.value) {
        const { password, ...userDetails } = form.value;
        updateUser(form.value.id, userDetails);
    } else {
        addUser({
            name: form.value.name,
            username: form.value.username,
            email: form.value.email,
            phone: form.value.phone,
            role: form.value.role,
        });
    }
    currentView.value = 'table';
};

const deleteUser = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        removeUser(id);
    }
};

const goToPage = () => {
    const page = Number(jumpPage.value);
    if (Number.isInteger(page) && page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>

<style scoped>
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

@media (max-width: 768px) {
    .card-section {
        padding: 20px 16px;
    }

    .action-bar {
        align-items: stretch;
        flex-direction: column;
    }

    .search-box {
        width: 100%;
    }

    .action-bar > .btn {
        justify-content: center;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .pagination-wrapper {
        align-items: flex-end;
        flex-direction: column;
    }
}
</style>
