<template>
  <div class="w-150 h-[100rem]">
    <div
      class="absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center"
    >
      <div
        class="w-7/8 h-3/4 bg-blue-600 mt-6 grid grid-cols-3 gap-4 border-6 border-black"
      >
        <div>
          <div
            v-for="fish in fishStore.rolledItems"
            :key="fish.id || fish.name"
            class="bg-white p-4 rounded-lg shadow-lg"
          >
            <img
              :src="fish.image"
              :alt="fish.name"
              class="w-24 h-24 object-contain mx-auto"
            />
            <p class="text-center mt-2">{{ fish.name }}</p>
          </div>
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
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { fishList } from "@/fishList.js";
import { useFishStore } from "@/stores/fishStores";
import { useUserStore } from "@/stores/userStores";
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/lib/supabase";

const fishStore = useFishStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const result = ref(null);
const user = computed(() => authStore.user);

// clears tank if you're not logged in but. cookies exist so i dunno it should be fine
/*
watch(
  () => authStore.user,
  async (newUser) => {
    if (newUser) {
      // if newuser has a value (meaning theyre logged in)
      userStore.currentUser = newUser;
      await fishStore.fetchUserFish(newUser.id); // load
    } else {
      // otherwise reset
      result.value = null;
      fishStore.rolledItems = [];
    }
  }
); 
*/

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    userStore.currentUser = user;
    await fishStore.fetchUserFish(user.id);
  } else {
    console.warn("User not authenticated. Cannot fetch fish.");
  }
});

function closeModal() {
  result.value = null;
}

function gachaCost() {
  if (userStore.coins >= 10) {
    userStore.updateCoins(userStore.coins - 10);
    return false;
  }
  return true;
}

async function rollGacha(list) {
  if (gachaCost()) {
    alert("Not enough coins!");
    return;
  }

  const totalChance = list.reduce((sum, fish) => sum + fish.chance, 0);
  const random = Math.random() * totalChance;
  let accumulated = 0;
  let selected = null;

  for (let fish of list) {
    accumulated += fish.chance;
    if (random < accumulated) {
      selected = fish;
      break;
    }
  }

  if (selected) {
    await fishStore.addFish(selected); // this saves and updates store
    result.value = selected;
  }
}
</script>
