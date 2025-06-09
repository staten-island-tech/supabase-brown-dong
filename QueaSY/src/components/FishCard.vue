<template>
  <div>
    <div class="bg-white p-4 rounded-lg shadow-lg">
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
          :value="fish.id"
          @change="selectToSlime"
          class="cursor-pointer w-6 h-6 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p v-else class="text-center mt-2">{{ fish.name }}</p>
      <p>{{ selected }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const selected = ref(false);
const props = defineProps({
  fish: Object,
  removeMode: Boolean,
  selected: Boolean,
});

const emit = defineEmits(["selectedfishtobeslimed"]);

function selectToSlime(event) {
  emit("selectedfishtobeslimed", {
    fish: props.fish,
    selected: event.target.checked,
  });
  console.log(props.fish.name + event.target.checked);
}
</script>

<style scoped></style>
