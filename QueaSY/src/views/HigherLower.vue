<template>
  <div>
    <div>
      <p>Current Number: {{ current }}</p>
      <button @click="makeGuess('higher')">Higher</button>
      <button @click="makeGuess('lower')">Lower</button>
      <p>{{ message }}</p>
      <p>Score: {{ score }}</p>
      <p>High Score: {{ highScore }}</p>
      <button @click="cashout">Cashout</button>
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
  let newAmount = moneyAmount + coinValue;
  localStorage.setItem("coins", newAmount);
}
</script>

<style lang="scss" scoped></style>
