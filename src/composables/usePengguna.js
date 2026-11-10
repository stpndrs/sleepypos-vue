import { ref } from 'vue';

const STORAGE_KEY = 'sleepypos.pengguna';

const defaultUsers = [
    {
        id: 1,
        name: 'Stevan Andreas',
        username: 'stevanandreas',
        email: 'stevanandreas@gmail.com',
        phone: '085845797669',
        role: 'Admin',
    },
    {
        id: 2,
        name: 'Stevan Andreas',
        username: 'stevanandreas',
        email: 'stevanandreas@gmail.com',
        phone: '085845797669',
        role: 'Kasir',
    },
    {
        id: 3,
        name: 'Stevan Andreas',
        username: 'stevanandreas',
        email: 'stevanandreas@gmail.com',
        phone: '085845797669',
        role: 'Admin',
    },
];

function loadUsers() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers === null) return defaultUsers;

    try {
        const parsedUsers = JSON.parse(storedUsers);
        if (!Array.isArray(parsedUsers)) {
            throw new TypeError('Data pengguna tersimpan bukan daftar pengguna.');
        }
        return parsedUsers;
    } catch (error) {
        throw new Error('Data pengguna lokal tidak dapat dibaca.', { cause: error });
    }
}

const users = ref(loadUsers());

function persistUsers(nextUsers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
    users.value = nextUsers;
}

function findUserById(id) {
    return users.value.find((user) => String(user.id) === String(id));
}

function addUser(user) {
    const nextId =
        users.value.reduce((maxId, currentUser) => Math.max(maxId, currentUser.id), 0) + 1;
    const nextUsers = [...users.value, { ...user, id: nextId }];
    persistUsers(nextUsers);
    return nextId;
}

function updateUser(id, changes) {
    const index = users.value.findIndex((user) => String(user.id) === String(id));
    if (index === -1) return false;

    const nextUsers = [...users.value];
    nextUsers[index] = { ...nextUsers[index], ...changes, id: nextUsers[index].id };
    persistUsers(nextUsers);
    return true;
}

function deleteUser(id) {
    const nextUsers = users.value.filter((user) => String(user.id) !== String(id));
    if (nextUsers.length === users.value.length) return false;
    persistUsers(nextUsers);
    return true;
}

export function usePengguna() {
    return { users, findUserById, addUser, updateUser, deleteUser };
}
