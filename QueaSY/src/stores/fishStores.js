import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useUserStore } from "./userStores";
import { supabase } from "@/lib/supabase";
import { fishList } from "@/fishList.js";

export const useFishStore = defineStore("fishStore", () => {
  const rolledItems = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const userStore = useUserStore();

  function decorateUserFish(userFish) {
    // takes supabase fish and adds the image and chance n sht to each entry

    return userFish.map((f) => {
      const match = fishList.find((fish) => fish.name === f.species);
      return {
        ...f, // < copies supabase stuff from fishList to be added to by the match. thanks chatgpt!
        id: f.fish_id,
        name: match?.name || f.species, // fallback to species
        image: match?.image || "default.png",
        chance: match?.chance || 0,
        rarity: match?.rarity,
      };
    });
  }

  async function fetchUserFish(userId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    userStore.currentUser = user;

    const { data, error } = await supabase
      .from("user_fish")
      .select("*")
      .eq("user_id", userId);

    if (!error && data) {
      rolledItems.value = decorateUserFish(data);
    }
  }

  async function addFish(fish) {
    const user = userStore.currentUser;
    if (!user) return;

    await supabase.from("user_fish").insert({
      user_id: user.id,
      species: fish.name.trim(),
      date_added: new Date().toISOString(),
    });
  }

  async function removeFish(id) {
    const user = userStore.currentUser;
    if (!user) return;

    const { error } = await supabase
      .from("user_fish")
      .delete()
      .eq("fish_id", id)
      .eq("user_id", user.id);

    if (error) {
      console.log("deleting failed yo");
      return;
    }
    rolledItems.value = rolledItems.value.filter((fish) => fish.id !== id);
    console.log("slimed");
  }

  return {
    rolledItems,
    loading,
    error,
    fetchUserFish,
    addFish,
    removeFish,
    decorateUserFish,
  };
});
