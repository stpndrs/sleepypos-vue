<script setup>
import { useRoute, useRouter } from 'vue-router';

defineProps({
    hide: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['toggle']);
const route = useRoute();

const menus = [
    {
        title: 'Dashboard',
        icon: 'bi-grid-1x2',
        link: '/dashboard',
        active: route.name == 'dashboard',
    },
    { title: 'Pengguna', icon: 'bi-person', link: '/users', active: route.name == 'users' },
    {
        title: 'Pelanggan',
        icon: 'bi-people',
        link: '/customers',
        active: route.name == ('customers-view', 'create-customers-view', 'edit-customers-view'),
    },
    {
        title: 'Penjualan',
        icon: 'bi-bag',
        link: '/sales',
        active: route.name.includes('sales-view', 'create-sales-view', 'edit-sales-view'),
    },
    {
        title: 'Produk',
        icon: 'bi-box-seam',
        link: '/products',
        active: route.name.includes('products-view', 'create-products-view', 'edit-products-view'),
    },
    { title: 'Stok', icon: 'bi-cart3', link: '/stocks', active: route.name == 'stocks' },
    {
        title: 'Pembelian',
        icon: 'bi-receipt',
        link: '/purchases',
        active: route.name.includes(
            'purchases-view',
            'create-purchases-view',
            'edit-purchases-view',
            'detail-purchases-view',
            'report-purchases-view',
        ),
    },
    {
        title: 'Gudang',
        icon: 'bi-houses',
        link: '/inventories',
        active: route.name.includes('inventories-view'),
    },
];
</script>

<template>
    <div id="sidebar" :class="{ 'is-hide': hide }">
        <header>
            <div class="header-brand" @click="$emit('toggle')">
                <div class="header-icon" title="SleepyPOS">
                    <i class="bi bi-shop-window"></i>
                </div>
                <div class="header-content" v-if="!hide">
                    <p class="sidebar-title">Sleepy<span>POS</span></p>
                    <p class="sidebar-description">POINT OF SALE</p>
                </div>
            </div>
        </header>

        <ul class="menus">
            <li
                v-for="(item, index) in menus"
                :key="index"
                :class="['menu-item', { active: item.active }]"
                :data-tooltip="hide ? item.title : null"
            >
                <a :href="item.link" class="menu-link">
                    <span class="menu-icon">
                        <i :class="['bi', item.icon]"></i>
                    </span>
                    <span class="menu-text" v-if="!hide">{{ item.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
#sidebar {
    background-color: #ffffff;
    padding: 24px 16px;
    border-right: 1px solid #eaeaea;
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
    transition: all 0.3s ease;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#sidebar.is-hide {
    padding: 24px 12px;
}

header {
    margin-bottom: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.header-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    letter-spacing: 1px;
}

header .header-icon {
    width: 44px;
    height: 44px;
    background-color: var(--primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

header .header-icon i.bi {
    font-size: 22px;
    color: white;
}

.header-content {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
}

header .header-content p {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

header .header-content p:nth-child(1) {
    color: #1a1a1a;
    font-size: 20px;
    font-weight: 700;
}

header .header-content p:nth-child(1) span {
    color: #ff5c00;
}

header .header-content p:nth-child(2) {
    font-size: 9px;
    color: #8c8c8c;
    letter-spacing: 1.2px;
    font-weight: 600;
}

.menus {
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
}

.menus .menu-item {
    list-style: none;
    width: 44px;
    height: 44px;
    border-radius: 14px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

#sidebar:not(.is-hide) .menus {
    align-items: stretch;
}

#sidebar:not(.is-hide) .menus .menu-item {
    width: 100%;
    height: auto;
    padding: 12px 16px;
    justify-content: flex-start;
}

.menus .menu-item:hover {
    background-color: #f5f5f5;
}

.menus .menu-item.active {
    background-color: #fff5f0;
    border: 1.5px solid #ff5c00;
}

.menus .menu-item.active a.menu-link {
    color: #ff5c00;
}

.menus .menu-item a.menu-link {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: #666666;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    justify-content: center;
    letter-spacing: 1px;
}

#sidebar:not(.is-hide) .menus .menu-link {
    justify-content: flex-start;
}

.menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-icon i {
    font-size: 20px;
}

#sidebar.is-hide .menu-item[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 12px;
    background-color: #262626;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    pointer-events: none;
    font-family: 'Poppins', sans-serif;
}

#sidebar.is-hide .menu-item[data-tooltip]:hover::before {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 4px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #262626 transparent transparent;
    z-index: 1000;
    pointer-events: none;
}

@media (max-width: 768px) {
    #sidebar,
    #sidebar.is-hide {
        height: auto;
        border-right: none;
        border-top: 1px solid #eaeaea;
        padding: 8px 12px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    }

    header {
        display: none !important;
    }

    .menus {
        flex-direction: row;
        justify-content: space-around;
        gap: 0;
    }

    .menus .menu-item,
    #sidebar.is-hide .menus .menu-item {
        width: 40px;
        height: 40px;
    }

    .menus .menu-item a .menu-text {
        display: none !important;
    }

    #sidebar.is-hide .menu-item[data-tooltip]:hover::after,
    #sidebar.is-hide .menu-item[data-tooltip]:hover::before {
        display: none;
    }
}
</style>
