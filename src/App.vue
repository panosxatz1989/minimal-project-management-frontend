<template>
    <TheNavbar />
    <router-view v-slot="{ Component }">
        <transition name="fade-button" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
    components: {
        TheNavbar,
    },
};
</script>
<style>
.btn-min-width {
    min-width: 100px;
}

.text-justify {
    text-align: justify;
}

.animate {
    /* transform: translateX(-150px); */
    animation: slide-fade 0.3s ease-out forwards;
}

.fade-button-enter-from,
.fade-button-leave-to {
    opacity: 0;
}

.fade-button-enter-active {
    transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
    transition: opacity 0.3s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
    opacity: 1;
}

.route-enter-active {
    animation: slide-scale 0.4s ease-out;
}
.route-leave-active {
    animation: slide-scale 0.4s ease-in;
}

@keyframes slide-scale {
    0% {
        transform: translateX(0) scale(1);
    }

    70% {
        transform: translateX(-120px) scale(1.1);
    }

    100% {
        transform: translateX(-150px) scale(1);
    }
}
</style>
