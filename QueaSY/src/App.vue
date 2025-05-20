<script setup>
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/userStores";

onMounted(async () => {
  await userStore.loadUserData();
});

const userStore = useUserStore();
</script>

<template>
  <div class="bg-[/background.jpg]">
    <div class="fixed top-0 left-0">
      <RouterLink to="/">LOGIN</RouterLink>
    </div>
    <div class="fixed top-0 left-1/2 -translate-x-1/2">
      <RouterLink to="/tank">TANK</RouterLink>
    </div>
    <div class="fixed left-0 top-1/2 -translate-y-1/2">
      <RouterLink to="/store">STORE</RouterLink>
    </div>
    <div class="fixed right-0 top-1/2 -translate-y-1/2">
      <RouterLink to="/social">SOCIAL</RouterLink>
    </div>
    <div class="fixed right-0 top-0">
      <p>{{ userStore.coins }}</p>
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
