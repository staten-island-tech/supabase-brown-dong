<template>
  <div>
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p v-if="error">Invalid credentials</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(false);
    const auth = useAuthStore();
    const router = useRouter();

    const handleLogin = () => {
      if (auth.login(username.value, password.value)) {
        router.push("/dashboard"); // or wherever your protected route is
      } else {
        error.value = true;
      }
    };

    return { username, password, handleLogin, error };
  },
};
</script>
