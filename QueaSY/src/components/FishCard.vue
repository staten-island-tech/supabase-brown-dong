<template>
  <div>
    <div class="p-4 rounded-lg w-[300px] h-[200px] overflow-hidden relative">
      <div
        class="absolute"
        :style="{
          transform: isVerticalOnly
            ? `translateY(${posY}px)`
            : `translateX(${posX}px)`,
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

const props = defineProps({
  fish: Object,
  imgSrcs: Array,
});

const containerWidth = 300;
const containerHeight = 200; // Increased for visible vertical movement
const fishWidth = 96;
const fishHeight = 96;
const maxPosX = containerWidth - fishWidth;
const maxPosY = containerHeight - fishHeight;

const posX = ref(0);
const posY = ref(maxPosY / 2); // start roughly in middle vertically
const directionX = ref(1);
const directionY = ref(1);
const speed = 2;

const isPaused = ref(false);
const pauseDuration = 500;
let pauseTimeout = null;
let animationFrame = null;

const currentSrc = ref("");
let frame = 0;

const fishTransformStyle = ref({
  transform: "scaleX(-1)",
});

const isVerticalOnly = props.fish.name === "Spongebob Banana";

function bounce() {
  if (isPaused.value) {
    animationFrame = requestAnimationFrame(bounce);
    return;
  }

  if (isVerticalOnly) {
    if (posY.value >= maxPosY && !isPaused.value) {
      posY.value = maxPosY;
      isPaused.value = true;
      if (!pauseTimeout) {
        pauseTimeout = setTimeout(() => {
          directionY.value = -1;
          isPaused.value = false;
          pauseTimeout = null;
        }, pauseDuration);
      }
    } else if (posY.value <= 0 && !isPaused.value) {
      posY.value = 0;
      isPaused.value = true;
      if (!pauseTimeout) {
        pauseTimeout = setTimeout(() => {
          directionY.value = 1;
          isPaused.value = false;
          pauseTimeout = null;
        }, pauseDuration);
      }
    } else {
      posY.value += directionY.value * speed;
    }
  } else {
    if (posX.value >= maxPosX && !isPaused.value) {
      posX.value = maxPosX;
      isPaused.value = true;
      if (!pauseTimeout) {
        pauseTimeout = setTimeout(() => {
          directionX.value = -1;
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
          directionX.value = 1;
          fishTransformStyle.value.transform = "scaleX(-1)";
          posX.value = speed;
          isPaused.value = false;
          pauseTimeout = null;
        }, pauseDuration);
      }
    } else {
      posX.value += directionX.value * speed;
    }
  }

  // Debug log
  // console.log(`posY: ${posY.value}, posX: ${posX.value}`);

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
  if (pauseTimeout) clearTimeout(pauseTimeout);
});
</script>
