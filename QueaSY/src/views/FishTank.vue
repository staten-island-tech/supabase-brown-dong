<template>
  <div class="w-150 h-[100rem] bg-red-300">
    <div
      class="absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center"
    >
      <div class="w-7/8 h-3/4 bg-blue-600 mt-6 grid grid-cols-3 gap-4">
        <div
          v-for="(item, index) in rolledItems"
          :key="index"
          class="cardDisplay bg-white p-4 rounded-lg shadow-lg"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-24 h-24 object-contain mx-auto"
          />
          <p class="text-center mt-2">{{ item.name }}</p>
        </div>
      </div>
      <div class="flex justify-around bg-blue-400 w-7/8">
        <div>
          <RouterLink to="/HL">Higher or Lower Game</RouterLink>
        </div>
        <div>
          <h1>Welcome to the Gacha Game!</h1>
          <button @click="rollGacha(fishList)">Roll</button>
          <div
            v-if="result"
            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
          >
            <div class="bg-blue-400 p-6 rounded-lg shadow-xl w-80 text-center">
              <h2 class="text-lg font-semibold mb-4">
                You got: {{ result.name }}!
              </h2>
              <img
                :src="result.image"
                alt="Gacha Item"
                class="w-48 h-48 object-contain mx-auto mb-4"
              />
              <button
                @click="closeSquare"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div>
          <button @click="removeFish()">REMOVE BUTTON HERE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, reactive } from "vue";
import { fishList } from "@/fishList.js";

const result = ref(null);
let rolledItems = reactive([]);

function rollGacha(list) {
  let broke = gachaCost();
  if (broke === true) {
    alert("Not enough coins!");
  } else {
    const totalChance = list.reduce((sum, fish) => sum + fish.chance, 0);
    const random = Math.random() * totalChance;
    let accumulatedChance = 0;
    let selectedItem = null;
    for (let fish of list) {
      accumulatedChance += fish.chance;
      if (random < accumulatedChance) {
        result.value = fish;
        selectedItem = fish;
        break;
      }
    }

    if (selectedItem) {
      rolledItems.push(selectedItem);
    }
  }
}
function removeFish() {
  rolledItems = [];
  console.log("Bao");
}
function closeSquare() {
  result.value = null;
}

function gachaCost() {
  let cantAfford = false;
  let moneyAmount = parseInt(localStorage.getItem("coins"));
  if (moneyAmount >= 10) {
    let newAmount = moneyAmount - 10;
    localStorage.setItem("coins", newAmount);
  } else {
    cantAfford = true;
  }
  return cantAfford;
}
</script>
