<template>
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <img
      :src="fish.image"
      :alt="fish.name"
      class="w-24 h-24 object-contain mx-auto"
    />
    <p class="text-center text-2xl mt-2">{{ fish.name }}</p>
    <p class="text-center text-sm text-gray-500">
      Caught by: {{ fish.Users?.email || "Unknown" }}
    </p>

    <div class="flex flex-col items-center mt-2">
      <p>
        <strong>Caught On:</strong> {{ formattedDate }} at {{ formattedTime }}
      </p>
      <p><strong>Size:</strong> {{ fish.size }} cm</p>
      <p><strong>Health:</strong> {{ fish.health }}%</p>
      <p><strong>Hunger:</strong> {{ fish.hunger }}%</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ fish: Object });

const formattedDate = computed(() =>
  new Date(props.fish.date_added).toLocaleDateString()
);
const formattedTime = computed(() =>
  new Date(props.fish.date_added).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
);
</script>
