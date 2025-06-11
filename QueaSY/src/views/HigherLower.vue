<template>
  <div>
    <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <p>Current Number: {{ current }}</p>
      <button
        @click="makeGuess('higher')"
        class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Higher
      </button>
      <button
        @click="makeGuess('lower')"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Lower
      </button>
      <p>{{ message }}</p>
      <p>Score: {{ score }}</p>
      <button
        @click="cashout"
        class="flex items-center gap-2 relative justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
      >
        <span
          class="flex items-center gap-2 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
        >
          <DollarIcon />
          Cashout
          <DollarIcon
        /></span>
      </button>
      <p>{{ endMessage }}</p>
      <img
        src="https://media.tenor.com/WB9JdWZSYEUAAAAM/kendrick-lamar-god-is-gangsta.gif"
        alt="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        class="mt-4 mx-auto max-w-xs rounded-lg shadow-lg"
      />
    </div>
  </div>
</template>

<script setup>
import DollarIcon from "../components/DollarIcon.vue";
import { useUserStore } from "@/stores/userStores";
import { ref, onMounted } from "vue";

onMounted(async () => {
  await userStore.loadUserData();
});

const current = ref(getRandom());
const message = ref("");
const score = ref(0);
const endMessage = ref("");
const userStore = useUserStore();
const hasfoenemcashedoutyet = ref(false);

function getRandom() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomDifferent(currentNumber) {
  let newNumber;
  newNumber = Math.floor(Math.random() * 10) + 1;
  while (newNumber === currentNumber);
  return newNumber;
}

function makeGuess(guess) {
  let next = getRandomDifferent(current.value);
  while (next === current.value) {
    next = getRandom();
  }
  if (
    (guess === "higher" && next > current.value) ||
    (guess === "lower" && next < current.value)
  ) {
    score.value++;
    message.value = `Correct! The next number was ${next}`;
  } else {
    message.value = `Nope! The next number was ${next}`;
    score.value = 0;
  }
  current.value = next;
}

function resetGame() {
  current.value = getRandom();
  score.value = 0;
  message.value = "";
  endMessage.value = "";
  hasfoenemcashedoutyet.value = false;
}

async function cashout() {
  if (hasfoenemcashedoutyet.value === true) {
    alert("You've already cashed out! run that back boy");
    resetGame();
    return;
  }

  endMessage.value = `You cashed out ${score.value * 10} dollars!`;
  let coinValue = score.value * 10;
  let moneyAmount = userStore.coins + coinValue;

  await userStore.updateCoins(moneyAmount);
  hasfoenemcashedoutyet.value = true;
  alert(endMessage.value);
  setTimeout(() => {
    resetGame();
  }, 200);
}
</script>

<style lang="scss" scoped></style>
