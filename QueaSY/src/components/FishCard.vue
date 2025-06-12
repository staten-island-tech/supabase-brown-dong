<template>
  <div>
    <div class="p-4 rounded-lg w-40">
      <img
        :src="`/${currentSrc}`"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const currentSrc = ref("");
let frame = 0;
const selected = ref(false);
const props = defineProps({
  fish: Object,
  imgSrcs: Array,
  removeMode: Boolean,
  isSelected: Boolean,
});
onMounted(() => {
  console.log(
    "Fish animation inside FishCard:",
    props.fish.name,
    props.imgSrcs
  );
  if (!props.imgSrcs || props.imgSrcs.length === 0) {
    console.warn(`FishCard missing imgSrcs for ${props.fish.name}`);
    return;
  }

  currentSrc.value = props.imgSrcs[0];

  setInterval(() => {
    frame = (frame + 1) % props.imgSrcs.length;
    currentSrc.value = props.imgSrcs[frame];
  }, 200);
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
