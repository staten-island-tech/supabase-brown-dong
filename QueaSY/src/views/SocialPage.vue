<template>
  <div class="w-full h-full">
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
      v-if="!loading"
      class="absolute w-[100rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
    >
      <h1 class="text-3xl font-bold mb-6">🌍 Other Players' Fish 🌍</h1>

      <div class="w-full space-y-10 overflow-y-auto px-6 max-h-[80vh]">
        <div
          v-for="(fishList, email) in groupedFish"
          :key="email"
          class="bg-blue-100 rounded-lg border-4 border-black p-4 shadow-md"
        >
          <h2 class="text-2xl font-bold mb-4 text-center">
            {{ email }}'s Fish
          </h2>
          <div class="grid grid-cols-3 gap-4">
            <SocialCard v-for="fish in fishList" :key="fish.id" :fish="fish" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/lib/supabase";
import SocialCard from "@/components/SocialCard.vue";
import { useFishStore } from "@/stores/fishStores";
import { useUserStore } from "@/stores/userStores";

const fishStore = useFishStore();
const userStore = useUserStore();

const allFish = ref([]);
const loading = ref(true);

onMounted(async () => {
  const { data, error } = await supabase
    .from("user_fish")
    .select("*, Users(email)")
    .order("date_added", { ascending: false });

  if (error) {
    console.error("Error fetching global fish stats:", error);
  } else {
    allFish.value = data;
    console.log(allFish.value);
  }

  const { a, b } = await supabase
    .from("public.Users") // Explicitly reference schema
    .select("user_id, email");

  console.log(a, b);

  loading.value = false;
});

const groupedFish = computed(() => {
  const groups = {};

  for (const fish of fishStore.decorateUserFish(allFish.value)) {
    const email =
      fish.Users?.email || userStore.currentUser?.email || "Unknown";
    if (!groups[email]) {
      groups[email] = [];
    }
    groups[email].push(fish);
  }

  return groups;
});
</script>
