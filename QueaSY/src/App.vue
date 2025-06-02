<script setup>
import { onMounted, computed, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useUserStore } from "@/stores/userStores";
import { supabase } from "@/lib/supabase.js";

const userStore = useUserStore();
const authStore = useAuthStore();

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    userStore.currentUser = user;
    console.log(user);
    await userStore.loadUserData();
  } else {
    console.warn("User not signed in. no coins will be loaded.");
    userStore.coins = 0;
  }
});

async function alertUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    alert("sign in or create a account first!");
  }
}
</script>

<template>
  <div class="bg-[/background.jpg]">
    <div class="fixed top-0 left-0">
      <RouterLink to="/">LOGIN/SIGNOUT</RouterLink>
    </div>
    <div class="fixed top-0 left-1/2 -translate-x-1/2">
      <RouterLink to="/tank"><span @click="alertUser"> tank </span></RouterLink>
    </div>
    <div class="fixed left-0 top-1/2 -translate-y-1/2">
      <RouterLink to="/store">STORE</RouterLink>
    </div>
    <div class="fixed right-0 top-1/2 -translate-y-1/2">
      <RouterLink to="/social">SOCIAL</RouterLink>
    </div>
    <div class="fixed right-0 top-0">
      <p v-if="userStore.coins !== null">Coins: {{ userStore.coins }}</p>
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
