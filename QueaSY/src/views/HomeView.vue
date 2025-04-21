<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const store = useAuthStore();

const { user } = storeToRefs(store);
</script>

<template>
  <main>
    <p v-if="!user">
      awh 🥀, hell 🥀,nah 🥀,twin 🥀, you 🥀 ,not 🥀, logged 🥀, in 🥀,twin 🥀,
      you 🥀, need 🥀, to 🥀, log🥀, tf 🥀, in 🥀, twin 🥀, who 🥀, is 🥀,
      this🥀, twin 🥀, on 🥀,foenem 🥀 ,grave 🥀,bruh 🥀
    </p>
    <p v-if="user">
      aw 🌹 , hell🌹 , yeah🌹, twin🌹, you🌹, logged 🌹, in 🌹,twin 🌹, this🌹,
      IS🌹, you🌹, twin🌹
    </p>
  </main>
</template>
