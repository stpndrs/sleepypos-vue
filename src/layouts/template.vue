<script setup>
import { computed, ref } from 'vue';
import Sidebar from './sidebar.vue';
import Topbar from './topbar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hideSideBar = computed(() => {
    return route.meta?.hideSideBar ?? false;
});
const isSidebarHide = ref(hideSideBar)
const toggleSidebar = () => {
    isSidebarHide.value = !isSidebarHide.value;
};


const showTopBar = computed(() => {
    return route.meta?.showTopBar ?? true;
});
</script>

<template>
    <div id="template" :class="{ 'sidebar-collapsed': isSidebarHide }">
        <aside>
            <Sidebar :hide="isSidebarHide" @toggle="toggleSidebar" />
        </aside>
        <nav v-show="showTopBar">
            <Topbar />
        </nav>
        <main>
            <router-view />
        </main>
    </div>
</template>

<style scoped>
#template {
    display: grid;
    grid-template-areas:
        "aside nav"
        "aside main";
    grid-template-columns: 280px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    transition: grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#template.sidebar-collapsed {
    grid-template-columns: 80px 1fr;
}

aside {
    grid-area: aside;
}

nav {
    grid-area: nav;
}

main {
    grid-area: main;
    padding: 24px 24px 80px 24px;
}

@media (max-width: 768px) {

    #template,
    #template.sidebar-collapsed {
        grid-template-areas:
            "nav"
            "main"
            "aside";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
    }

    aside {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
}
</style>