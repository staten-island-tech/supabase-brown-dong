<template>
  <div
    class="bg-sky-300 absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center px-6 py-12 lg:px-8 text-center"
  >
    <h1 class="mt-10 text-2xl font-bold tracking-tight text-gray-900">
      Sign Up with me Twan 🌹
    </h1>

    <h2 class="mt-4 text-xl font-semibold text-gray-900">Create an Account</h2>

    <div class="mt-6 w-full max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSignup">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email"
            class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Password"
            class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
        >
          Sign Up
        </button>
      </form>
    </div>

    <p v-if="auth.error" class="mt-4 text-red-600">
      {{ auth.error.message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

async function handleSignup() {
  await auth.signUp(email.value, password.value);

  if (auth.user) {
    console.log("Signup success!", auth.user);
    router.push("/tank");
  } else {
    console.error("Signup failed:", auth.error);
  }
}
</script>
