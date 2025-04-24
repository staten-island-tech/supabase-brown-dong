<template>
  <div>
    <h1>Login</h1>
    <p v-if="!user">
      awh 🥀, hell 🥀,nah 🥀,twin 🥀, you 🥀 ,not 🥀, logged 🥀, in 🥀,twin 🥀,
      you 🥀, need 🥀, to 🥀, log🥀, tf 🥀, in 🥀, twin 🥀, who 🥀, is 🥀,
      this🥀, twin 🥀, on 🥀,foenem 🥀 ,grave 🥀,bruh 🥀
    </p>
    <p v-if="user">
      aw 🌹 , hell🌹 , yeah🌹, twin🌹, you🌹, logged 🌹, in 🌹,twin 🌹, this🌹,
      IS🌹, you🌹, twin🌹
    </p>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>
    <p v-if="error">Invalid credentials</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

onMounted(() => {
  const store = useAuthStore();
  const { user } = storeToRefs(store);
});

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(false);
    const auth = useAuthStore();
    const router = useRouter();

    const handleLogin = () => {
      if (auth.login(username.value, password.value)) {
        // router.push("/dashboard"); // or wherever your protected route is
      } else {
        error.value = true;
      }
    };

    return { username, password, handleLogin, error };
  },
};
</script>
