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
        name: match?.name || f.species, // fallback to species
        image: match?.image || "default.png",
        chance: match?.chance || 0,
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

    // try {
    //   const { data, error } = await supabase
    //     .from("user_fish")
    //     .select("*")
    //     .eq("user_id", user.id)
    //     .eq("species", fish.name.trim())
    //     .single();
    // } catch (err) {
    //   console.error("Unexpected Supabase error:", err);
    //   return;
    // }

    await supabase.from("user_fish").insert({
      user_id: user.id,
      species: fish.name.trim(),
      date_added: new Date().toISOString(),
    });
  }
  const selectedForSlimingOut = ref([]);

  async function removeFish(id) {
    const user = userStore.currentUser;
    if (!user) return;

    const response = await supabase.from("user_fish").delete().eq(id, 1);

    if (response) {
      console.log("slimed");
      console.log("remove" + selectedForSlimingOut);
    }
  }

  return {
    rolledItems,
    loading,
    error,
    fetchUserFish,
    addFish,
    removeFish,
    response,
  };
});
