import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
    const addToast = (label, variant = 'info', timeout = 3000) => {
        const id = Date.now() + Math.random()

        toasts.value.push({ id, label, variant })

        if (timeout > 0) {
            setTimeout(() => {
                removeToast(id)
            }, timeout)
        }
    }

    const removeToast = (id) => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    return {
        toasts,
        addToast,
        removeToast
    }
}