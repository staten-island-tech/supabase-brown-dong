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
      <div v-if="removeMode" class="absolute top-2 right-2">
        <input
          type="checkbox"
          class="cursor-pointer w-24 h-24 object-contain mx-auto"
        />
      </div>
      <p class="text-center mt-2">{{ fish.name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fishes: Array,
  removeMode: Boolean,
  selectedFish: Array,
});
</script>

<style scoped></style>
