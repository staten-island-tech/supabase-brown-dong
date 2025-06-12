<template>
  <div class="w-150 h-[100rem]">
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center z-50 bg-white"
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
      <h1 class="text-3xl font-bold mb-6">🐠 Your Fish Stats 🐠</h1>

      <div
        class="grid grid-cols-3 gap-4 w-full max-h-[75vh] overflow-y-auto bg-blue-100 p-4 rounded-lg shadow-inner"
      >
        <UserStatsCard
          v-for="fish in fishStore.rolledItems"
          :key="fish.id || fish.name"
          :fish="fish"
          :removeMode="removeMode"
          :isSelected="selectedForSlimingOut.some((f) => f.id === fish.id)"
          @selectedfishtobeslimed="toggleSwissCheesing"
        />
      </div>

      <div class="mt-6 flex flex-row items-center space-y-4">
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
import { onMounted, ref } from "vue";
import { useFishStore } from "@/stores/fishStores";
import { useUserStore } from "@/stores/userStores";
import { supabase } from "@/lib/supabase";
import UserStatsCard from "@/components/UserStatsCard.vue";
import gsap from "gsap";

const fishStore = useFishStore();
const userStore = useUserStore();

const loading = ref(true);
const removeMode = ref(false);
const selectedForSlimingOut = ref([]);

onMounted(async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      userStore.currentUser = user;
      await fishStore.fetchUserFish(user.id);
    } else {
      console.warn("Not logged in – no fish to show.");
      fishStore.rolledItems = [];
    }
  } finally {
    loading.value = false;
  }
});

function toggleSwissCheesing({ fish, selected }) {
  const exists = selectedForSlimingOut.value.some((f) => f.id === fish.id);
  if (selected && !exists) {
    selectedForSlimingOut.value.push(fish);
  } else if (!selected && exists) {
    selectedForSlimingOut.value = selectedForSlimingOut.value.filter(
      (f) => f.id !== fish.id
    );
  }
}

function cancelSliming() {
  removeMode.value = false;
  selectedForSlimingOut.value = [];
}

async function confirmRemoval() {
  const animationPromises = selectedForSlimingOut.value.map((fish) => {
    const fishElement = document.getElementById(fish.id);

    if (fishElement) {
      return gsap.to(fishElement, {
        scale: 10,
        opacity: 0,
        duration: 4,
        ease: "back.in",
        onComplete: () => {
          fishElement.remove();
        },
      });
    }
  });

  await Promise.all(animationPromises);

  for (const fish of selectedForSlimingOut.value) {
    await fishStore.removeFish(fish.id);
  }

  selectedForSlimingOut.value = [];
  removeMode.value = false;
}
</script>
