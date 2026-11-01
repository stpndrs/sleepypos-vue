<script setup>
import { computed, ref, watch } from 'vue';
import Sidebar from './sidebar.vue';
import Topbar from './topbar.vue';
import { useRoute } from 'vue-router';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/useToast.js';

const { toasts, removeToast } = useToast()
const route = useRoute()
const hideSideBar = computed(() => route.meta?.hideSideBar ?? false);
const isSidebarHide = ref(hideSideBar.value);
watch(hideSideBar, (newValue) => {
    isSidebarHide.value = newValue;
});
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
            <div class="toast-container">
                <TransitionGroup name="toast-fade">
                    <Toast v-for="toast in toasts" :key="toast.id" :id="toast.id" :label="toast.label"
                        :variant="toast.variant" @close="removeToast" />
                </TransitionGroup>
            </div>
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

.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
    transition: all 0.3s ease;
}

.toast-fade-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
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