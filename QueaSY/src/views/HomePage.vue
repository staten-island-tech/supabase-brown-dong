<template>
  <div
    class="bg-red-500 absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center"
  >
    <h1>Sign Up with me Twan 🌹</h1>

    <h2>Create an Account</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="auth.error" style="color: red">{{ auth.error.message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const { user, error } = storeToRefs(auth);
const router = useRouter();

async function handleSignup() {
  await auth.signUp(email.value, password.value);

  if (auth.user) {
    console.log("Signup success!", auth.user);
  } else {
    console.error("Signup failed:", auth.error);
  }
}
</script>
