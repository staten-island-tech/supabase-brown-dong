<template>
  <div
    class="bg-sky-300 absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center px-6 py-12 lg:px-8"
  >
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Log in to your account twin🌹
    </h2>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSignIn">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              v-model="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Password</label
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in twin 🌹
        </button>
      </form>
    </div>
    <p v-if="!user">
      awh 🥀, hell 🥀,nah 🥀,twin 🥀, you 🥀 ,not 🥀, logged 🥀, in 🥀,twin 🥀,
      you 🥀, need 🥀, to 🥀, log🥀, tf 🥀, in 🥀, twin 🥀, who 🥀, is 🥀,
      this🥀, twin 🥀, on 🥀,foenem 🥀 ,grave 🥀,bruh 🥀
    </p>
    <p v-if="user">
      aw 🌹 , hell🌹 , yeah🌹, twin🌹, you🌹, logged 🌹, in 🌹,twin 🌹, this🌹,
      IS🌹, you🌹, twin🌹
    </p>
    <h1>Create an Account</h1>
    <nav>
      <RouterLink to="/signup">sign up and prosper twin🌹</RouterLink>
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

async function handleSignup() {
  await auth.signUp(email.value, password.value);

  if (auth.user) {
    console.log("Signup success!", auth.user);
  } else {
    console.error("Signup failed:", auth.error);
  }
}

async function handleSignIn() {
  await auth.signIn(email.value, password.value);

  if (auth.user) {
    console.log("you logged in twin", auth.user);
  } else {
    console.error("ts login so kevin", auth.error);
  }
}
</script>
