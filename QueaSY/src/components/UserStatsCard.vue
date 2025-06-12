<template>
  <div>
    <div :id="fish.id" class="bg-white p-4 rounded-lg shadow-lg">
      <img
        :src="fish.image"
        :alt="fish.name"
        class="w-24 h-24 object-contain mx-auto"
      />

      <div v-if="removeMode" class="flex items-center justify-between mt-2">
        <p class="text-center">slime out {{ fish.name }} 💔🔨</p>
        <input
          type="checkbox"
          v-model="selected"
          @change="selectToSlime"
          class="cursor-pointer w-6 h-6 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p v-else class="text-center mt-2 text-2xl">{{ fish.name }}</p>
      <p class="text-center mt-1">
        <span :class="getRarityClass(fish.rarity)" class="font-semibold text-l">
          Rarity: {{ fish.rarity }}
        </span>
      </p>
      <div class="flex flex-col items-center mt-2">
        <p>
          <span class="font-semibold">Caught On:</span> {{ formattedDate }}
          <span class="font-semibold"> at </span> {{ formattedTime }}
        </p>
        <p><span class="font-semibold">Size:</span> {{ fish.size }} cm</p>
        <p><span class="font-semibold">Health:</span> {{ fish.health }}%</p>
        <p><span class="font-semibold">Hunger:</span> {{ fish.hunger }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const selected = ref(false);
const props = defineProps({
  fish: Object,
  removeMode: Boolean,
  isSelected: Boolean,
});

const emit = defineEmits(["selectedfishtobeslimed"]);

function selectToSlime(event) {
  emit("selectedfishtobeslimed", {
    fish: props.fish,
    selected: event.target.checked,
  });
  console.log(props.fish.name + event.target.checked);
}

const formattedDate = computed(() => {
  const date = new Date(props.fish.date_added);
  return date.toLocaleDateString({
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const formattedTime = computed(() => {
  const time = new Date(props.fish.date_added);
  return time.toLocaleTimeString({
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
});

function getRarityClass(rarity) {
  switch (rarity) {
    case "Common":
      return "text-gray-500";
    case "Uncommon":
      return "text-green-500";
    case "Rare":
      return "text-blue-500";
    case "Epic":
      return "text-purple-500";
    default:
      return "text-black-500";
  }
}
</script>

<style scoped></style>
