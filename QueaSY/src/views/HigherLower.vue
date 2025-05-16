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
      <p>High Score: {{ highScore }}</p>
      <button @click="cashout">
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            stroke="#333333"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17 5H10.24C8.4506 5 7 6.567 7 8.5C7 10.433 8.4506 12 10.24 12H13.5385C15.4502 12 17 13.567 17 15.5C17 17.433 15.4502 19 13.5385 19H7"
            stroke="#333333"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Cashout
      </button>
      <p>{{ endMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const current = ref(getRandom());
const message = ref("");
const score = ref(0);
const highScore = ref(0);
const endMessage = ref("");

function getRandom() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomDifferent(currentNumber) {
  let newNumber;
  do {
    newNumber = Math.floor(Math.random() * 10) + 1;
  } while (newNumber === currentNumber);
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
    if (score.value > highScore.value) {
      highScore.value = score.value;
    }
  } else {
    message.value = `Nope! The next number was ${next}`;
    score.value = 0;
  }
  current.value = next;
}

function cashout() {
  endMessage.value = `You cashed out with a score of ${score.value}!`;
  let coinValue = score.value * 10;
  let moneyAmount = parseInt(localStorage.getItem("coins"));
  console.log(moneyAmount);
  if (Number.isNaN(moneyAmount)) {
    moneyAmount = 0;
  }
  let newAmount = moneyAmount + coinValue;
  localStorage.setItem("coins", newAmount);
}
</script>

<style lang="scss" scoped></style>
