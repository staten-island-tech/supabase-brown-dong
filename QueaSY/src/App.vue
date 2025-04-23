<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template class="bg-blue-400">
  <header>
    <div class="wrapper">
      <HelloWorld msg="Your fish tank" />
      <nav>
        <RouterLink to="/">Homliasdfbhjik;e</RouterLink>
        <RouterLink to="/login">LOGIN!!!!!!!!!!!!!!!!</RouterLink>
      </nav>
      <h1 class="text-7xl font-bold underline">Hello world!</h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
