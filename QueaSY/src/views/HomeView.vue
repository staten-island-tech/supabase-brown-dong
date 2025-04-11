<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const store = useAuthStore();

const { user } = storeToRefs(store);
</script>

<template>
  <main>
    <p v-if="!user">
      nah🥀, you 🥀 ,not 🥀, logged 🥀, in 🥀,twin 🥀, awh 🥀, hell 🥀,nah
      🥀,twin 🥀, you 🥀 ,log🥀, tf 🥀, in 🥀, twin 🥀, who 🥀, is 🥀, this🥀,
      twin 🥀, on 🥀,foenem 🥀 ,grave 🥀,bruh 🥀
    </p>
    <p v-if="user">
      aw 🌹 , hell🌹 , yeah🌹, twin🌹, you🌹, logged 🌹, in 🌹,twin 🌹, this🌹,
      is🌹, you🌹, twin🌹
    </p>
  </main>
</template>
