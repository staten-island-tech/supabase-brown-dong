<template>
  <div>
    <div
      v-for="fish in fishes"
      :key="fish.id || fish.name"
      class="bg-white p-4 rounded-lg shadow-lg"
    >
      <img
        :src="fish.image"
        :alt="fish.name"
        class="w-24 h-24 object-contain mx-auto"
      />
      <p class="text-center mt-2">{{ fish.name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fishes: Array,
});
</script>

<style scoped></style>
