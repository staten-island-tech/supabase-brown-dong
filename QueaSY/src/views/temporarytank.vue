<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabase";
import { useUserStore } from "@/stores/userStores";

const userStore = useUserStore();
const savedFish = ref([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from("UserFish")
    .select("*")
    .eq("user_id", userStore.user.id);

  if (error) {
    console.error("Error fetching fish:", error);
  } else {
    savedFish.value = data;
  }
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="fish in savedFish"
      :key="fish.id"
      class="bg-white p-4 rounded shadow text-center"
    >
      <img :src="fish.image" class="w-24 h-24 object-contain mx-auto" />
      <p class="mt-2">{{ fish.species }}</p>
    </div>
  </div>
</template>
