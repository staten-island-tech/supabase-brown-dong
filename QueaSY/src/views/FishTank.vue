<template>
  <div class="w-150 h-[100rem]">
    <div
      v-if="loading === true"
      class="fixed inset-0 flex items-center justify-center"
    >
      <img
        src="https://i.pinimg.com/originals/07/6a/57/076a57893486507bad1e909a7dcce2b1.gif"
        alt="Loading..."
        class="w-full h-full object-cover"
      />
    </div>
    <div
      v-if="loading === false"
      class="absolute w-[80rem] h-[50rem] flex flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center"
    >
      <div
        class="w-7/8 h-3/4 bg-blue-600 mt-6 grid grid-cols-3 gap-4 border-6 border-black overflow-auto"
      >
        <FishCard
          v-for="fish in fishStore.rolledItems"
          :key="fish.id || fish.name"
          :fish="fish"
          :removeMode="removeMode"
          :isSelected="selectedForSlimingOut.some((f) => f.id === fish.id)"
          :imgSrcs="fish.animation || []"
          :style="getPositionStyle(fish)"
          @selectedfishtobeslimed="toggleSwissCheesing"
        />
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
          <button
            v-if="!removeMode"
            style="background-image: url('/remove.jpg')"
            @click="
              removeMode = !removeMode;
              console.log(removeMode);
            "
            class="w-[150px] h-[50px] bg-no-repeat bg-center bg-contain border-none cursor-pointer"
          ></button>
          <button
            v-if="removeMode"
            style="background-image: url('/cancel.jpg')"
            @click="cancelSliming"
            class="w-[150px] h-[50px] bg-no-repeat bg-center bg-contain border-none cursor-pointer"
          ></button>

          <p class="mt-2 text-center">
            {{
              removeMode
                ? "nvm dont slime them ❤️‍🩹"
                : "SLIME THE FISH OUT👹👹👹👹👹 "
            }}
          </p>
        </div>
        <div v-if="removeMode && selectedForSlimingOut.length > 0" class="mt-4">
          <button
            @click="confirmRemoval"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Slime {{ selectedForSlimingOut.length }} Fish 🐟💀
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { fishList } from "@/fishList.js";
import { useFishStore } from "@/stores/fishStores";
import { useUserStore } from "@/stores/userStores";
import { supabase } from "@/lib/supabase";
import FishCard from "@/components/FishCard.vue";
import { nextTick } from "vue";

const fishStore = useFishStore();
const userStore = useUserStore();
const loading = ref(true);
const result = ref(null);
let rolledItems = reactive([]);

onMounted(async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      userStore.currentUser = user;
      await fishStore.fetchUserFish(user.id);
      fishStore.rolledItems = fishPosition(fishStore.rolledItems);
      fishStore.rolledItems = fishStore.rolledItems.map((fish) => {
        const fullFishData = fishList.find(
          (f) => f.name === fish.name || f.id === fish.fish_id
        );

        return {
          ...fish,
          animation: fullFishData.animation,
        };
      });
      console.log("Mapped rolledItems with animations:", fishStore.rolledItems);
    } else {
      console.warn(
        "yea yo user aint authenticated lil boy we cant fetch yo fish gang "
      );
      fishStore.rolledItems = null;
    }
  } finally {
    loading.value = false;
  }
});
const selectedForSlimingOut = ref([]);
function toggleSwissCheesing({ fish, selected }) {
  const exists = selectedForSlimingOut.value.some((f) => f.id === fish.id);
  if (selected) {
    selectedForSlimingOut.value.push(fish);
  } else if (!selected && exists) {
    const index = selectedForSlimingOut.value.findIndex(
      (f) => f.id === fish.id
    );
    if (index !== -1) {
      // -1 means it cant find anything matching
      selectedForSlimingOut.value.splice(index, 1); // Modify array in place
    }
  }
  console.log("Updated selection array:", selectedForSlimingOut.value);
}

function cancelSliming() {
  removeMode.value = false;
  selectedForSlimingOut.value = [];
}

async function confirmRemoval() {
  for (const fish of selectedForSlimingOut.value) {
    console.log(fish.fish_id);
    await fishStore.removeFish(fish.fish_id);
  }
  selectedForSlimingOut.value = [];
  fishStore.rolledItems = [...fishStore.rolledItems];
}
function closeSquare() {
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
  let selectedItem = null;

  for (let fish of list) {
    accumulated += fish.chance;
    if (random < accumulated) {
      selectedItem = fish;
      break;
    }
  }
  if (selectedItem) {
    await fishStore.addFish(selectedItem); // this saves and updates store
    result.value = selectedItem;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await fishStore.fetchUserFish(user.id);
    fishStore.rolledItems = fishPosition(fishStore.rolledItems);
  }
}
function getPositionStyle(fish) {
  if (fish) {
    return {
      position: "absolute",
      top: fish.position.top,
      left: fish.position.left,
      width: `${fish.size}px`,
      height: `${fish.size}px`,
    };
  }
}
function fishPosition(fishArray) {
  if (fishArray.type === "walker") {
    return fishArray.map((fish) => ({
      ...fish,
      position: {
        top: `${70}%`,
        left: `${Math.random() * 60 + 10}%`,
      },
      size: Math.floor(Math.random() * 40) + 50,
    }));
  } else {
    return fishArray.map((fish) => ({
      ...fish,
      position: {
        top: `${Math.random() * 55 + 10}%`,
        left: `${Math.random() * 60 + 10}%`,
      },
      size: Math.floor(Math.random()) + 50,
    }));
  }
}
</script>
