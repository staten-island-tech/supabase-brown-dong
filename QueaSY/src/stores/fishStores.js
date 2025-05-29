import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useUserStore } from "./userStores";
import { supabase } from "@/lib/supabase";

export const useFishStore = defineStore("fishStore", () => {
  const rolledItems = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const userStore = useUserStore();

  // 👇 automatically try to fetch fish when user is ready
  watch(
    () => userStore.currentUser?.value,
    async (user) => {
      if (user) {
        await fetchUserFish(user.id);
      }
    },
    { immediate: true }
  );

  async function fetchUserFish(userId) {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await supabase
      .from("user_fish")
      .select("*")
      .eq("user_id", userId);

    if (fetchError) {
      console.error("Error fetching fish:", fetchError);
      error.value = fetchError;
    } else {
      rolledItems.value = data;
    }

    loading.value = false;
  }

  async function addFish(fish) {
    const user = userStore.currentUser?.value;

    if (!user) {
      console.warn("User not loaded, can't save fish.");
      return;
    }

    const { error: insertError } = await supabase.from("user_fish").insert({
      user_id: user.id,
      species: fish.name,
      image: fish.image,
    });

    if (!insertError) {
      rolledItems.value.push(fish);
    } else {
      console.error("Failed to save fish:", insertError);
    }
  }

  return {
    rolledItems,
    loading,
    error,
    fetchUserFish,
    addFish,
  };
});
