<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Your fish tank" />
      <nav>
        <RouterLink to="/">Homliasdfbhjik;e</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <h1 class="text-7xl font-bold underline">Hello world!</h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
