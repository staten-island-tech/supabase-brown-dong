<template>
  <div class="w-150 h-120>">
    <div class="w-7/8 h-3/4 bg-blue-600 mt-6 grid grid-cols-3 gap-4">
      <div
        v-for="(item, index) in rolledItems"
        :key="index"
        class="bg-white p-4 rounded-lg shadow-lg"
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
              @click="closeModal"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1>REMOVE BUTTON HERE</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, reactive } from "vue";
import { fishList } from "@/fishList.js";

const result = ref(null);
const rolledItems = reactive([]);

function rollGacha(list) {
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
  gachaCost();
}

function closeModal() {
  result.value = null;
}

function gachaCost() {
  let moneyAmount = parseInt(localStorage.getItem("coins"));
  if (moneyAmount >= 10) {
    let newAmount = moneyAmount - 10;
    localStorage.setItem("coins", newAmount);
  } else {
    alert("Not enough coins!");
  }
}
</script>
