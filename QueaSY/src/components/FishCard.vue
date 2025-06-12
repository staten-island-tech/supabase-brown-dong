<template>
  <div>
    <div class="p-4 rounded-lg w-[200px] h-[100px] overflow-hidden relative">
      <div
        class="absolute"
        :style="{
          transform: `translateX(${posX}px)`,
        }"
      >
        <img
          :src="`/${currentSrc}`"
          :alt="fish.name"
          class="w-24 h-24 object-contain"
        />
      </div>
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
import { ref, onMounted, onUnmounted } from "vue";
const currentSrc = ref("");
let frame = 0;
const selected = ref(false);
const containerWidth = 200;
const fishWidth = 96;
const maxPosX = containerWidth - fishWidth;

const props = defineProps({
  fish: Object,
  imgSrcs: Array,
  removeMode: Boolean,
  isSelected: Boolean,
});
// Bounce movement variables
const posX = ref(0);
const direction = ref(1); // 1 = right, -1 = left
const speed = 2;
let animationFrame = null;

function bounce() {
  console.log("Bouncing...", posX.value); // ✅ ADD THIS
  posX.value += direction.value * speed;

  if (posX.value >= maxPosX) {
    posX.value = maxPosX;
    direction.value = -1;
  } else if (posX.value <= 0) {
    posX.value = 0;
    direction.value = 1;
  }

  animationFrame = requestAnimationFrame(bounce);
}
onMounted(() => {
  if (!props.imgSrcs || props.imgSrcs.length === 0) {
    console.warn(`FishCard missing imgSrcs for ${props.fish.name}`);
    return;
  }

  currentSrc.value = props.imgSrcs[0];

  setInterval(() => {
    frame = (frame + 1) % props.imgSrcs.length;
    currentSrc.value = props.imgSrcs[frame];
  }, 500);
  bounce(); // start movement
});
onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
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
