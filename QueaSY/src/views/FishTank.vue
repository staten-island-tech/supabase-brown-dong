<template>
  <div class="w-full h-full">
    <div class="flex justify-around bg-blue-400 w-7/8">
      <div>
        <RouterLink to="/HL">Higher or Lower Game</RouterLink>
      </div>
      <div>
        <h1>GACHA GAME HERE</h1>
      </div>
      <div>
        <h1>REMOVE BUTTON HERE</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped></style>
