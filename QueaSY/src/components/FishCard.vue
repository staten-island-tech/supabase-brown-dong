<template>
  <div>
    <div
      v-for="fish in fishes"
      :key="fish.id || fish.name"
      class="relative bg-white p-4 rounded-lg shadow-lg"
    >
      <input type="checkbox" :id="'checkbox-' + fish.id" class="hidden peer" />

      <label
        for="'checkbox-' + fish.id"
        class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div class="block">
          <img
            :src="fish.image"
            :alt="fish.name"
            class="w-24 h-24 object-contain mx-auto"
          />
          <div class="w-full text-lg font-semibold text-center">
            {{ fish.name }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
defineProps({
  fishes: Array,
  removeMode: Boolean,
  selectedFish: Array,
});
</script>

<style scoped></style>
