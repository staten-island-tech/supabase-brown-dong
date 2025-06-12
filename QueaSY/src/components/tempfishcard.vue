<template>
  <div>
    <div class="p-4 rounded-lg w-[300px] h-[100px] overflow-hidden relative">
      <div
        class="absolute"
        :style="{
          transform: `translateX(${posX}px)`,
        }"
      >
        <img
          :src="`/${currentSrc}`"
          :alt="fish.name"
          class="w-24 h-24 object-contain transition-transform duration-300"
          :style="fishTransformStyle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const currentSrc = ref("");
let frame = 0;
const containerWidth = 300;
const fishWidth = 96;
const maxPosX = containerWidth - fishWidth;

const props = defineProps({
  fish: Object,
  imgSrcs: Array,
});
const posX = ref(10);
const direction = ref(1);
const flipped = ref(true);
const speed = 2;
let animationFrame = null;
const isPaused = ref(false);
const pauseDuration = 500;
let pauseTimeout = null;
const fishTransformStyle = ref({
  transform: "scaleX(-1)",
});

function bounce() {
  if (isPaused.value) {
    animationFrame = requestAnimationFrame(bounce);
    return;
  }

  if (posX.value >= maxPosX && !isPaused.value) {
    posX.value = maxPosX;
    isPaused.value = true;

    if (!pauseTimeout) {
      pauseTimeout = setTimeout(() => {
        direction.value = -1;
        flipped.value = true;

        fishTransformStyle.value.transform = "scaleX(1)";

        posX.value = maxPosX - speed;
        isPaused.value = false;
        pauseTimeout = null;
      }, pauseDuration);
    }
  } else if (posX.value <= 0 && !isPaused.value) {
    posX.value = 0;
    isPaused.value = true;

    if (!pauseTimeout) {
      pauseTimeout = setTimeout(() => {
        direction.value = 1;
        flipped.value = false;

        fishTransformStyle.value.transform = "scaleX(-1)";

        posX.value = speed;
        isPaused.value = false;
        pauseTimeout = null;
      }, pauseDuration);
    }
  } else {
    posX.value += direction.value * speed;
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
  bounce();
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
