<template>
  <div>
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <img
        :src="fish.image"
        :alt="fish.name"
        class="w-24 h-24 object-contain mx-auto"
      />
      <p class="text-center mt-2">{{ fish.name }}</p>

      <div v-if="removeMode" class="flex items-center justify-between mt-2">
        <p class="text-center">slime out {{ fish.name }} 💔🔨</p>
        <input
          type="checkbox"
          class="cursor-pointer w-6 h-6 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p v-else class="text-center mt-2">{{ fish.name }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fish: Object,
  removeMode: Boolean,
  selectedFish: Object,
});
</script>

<style scoped></style>
