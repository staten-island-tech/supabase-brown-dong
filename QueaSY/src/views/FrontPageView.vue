<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSignIn">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign in twin 🌹</button>
    </form>
    <h1>Create an Account</h1>
    <nav>
      <RouterLink to="/signuptwin">sign up and prosper twin🌹</RouterLink>
    </nav>

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

async function handleSignIn() {
  await auth.signIn(email.value, password.value);

  if (auth.user) {
    console.log("you logged in twin", auth.user);
    router.push("/tank");
  } else {
    console.error("ts login so kevin", auth.error);
  }
}
</script>
