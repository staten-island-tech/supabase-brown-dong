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
    return userFish.map((f) => {
      const match = fishList.find((fish) => fish.name === f.species);
      return {
        ...f,
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

  //   async function addFish(fish) {
  //     const user = userStore.currentUser;

  //     const { data: existsAlready, error: fetchError } = await supabase
  //       .from("user_fish")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .eq("species", fish.name.trim())
  //       .single();

  //     if (existsAlready) {
  //       await supabase
  //         .from("user_fish")
  //         .update({ quantity: existsAlready.quantity + 1 })
  //         .eq("id", existsAlready.id);
  //     } else {
  //       await supabase.from("user_fish").insert({
  //         user_id: userStore.currentUser.id,
  //         species: fish.name,
  //         quantity: 1,
  //       });
  //     }

  //     //  const { error: insertError } = await supabase.from("user_fish").insert({
  //     //    user_id: user.id,
  //     //    species: fish.name,
  //     //  });

  //     //  if (!insertError) {
  //     //    rolledItems.value.push(fish);
  //     //  } else {
  //     //    console.error("Failed to save fish:", insertError);
  //     //  }
  //   }

  async function addFish(fish) {
    const user = userStore.currentUser;
    if (!user) return;

    let existsAlready = null;

    try {
      const { data, error } = await supabase
        .from("user_fish")
        .select("*")
        .eq("user_id", user.id)
        .eq("species", fish.name.trim())
        .single();

      if (data) {
        existsAlready = data;
      } else if (error && error.code !== "PGRST116") {
        // Only log real errors, not "no match found"
        console.error("Supabase fetch error:", error);
        return;
      }
    } catch (err) {
      console.error("Unexpected Supabase error:", err);
      return;
    }

    if (existsAlready && existsAlready.id) {
      // Update quantity if fish already exists
      await supabase
        .from("user_fish")
        .update({ quantity: existsAlready.quantity + 1 })
        .eq("id", existsAlready.id);
    } else {
      // Insert new fish row if not found
      await supabase.from("user_fish").insert({
        user_id: user.id,
        species: fish.name.trim(),
        quantity: 1,
      });
    }

    // Optionally refresh the store
    await fetchUserFish(user.id);
  }

  return {
    rolledItems,
    loading,
    error,
    fetchUserFish,
    addFish,
  };
});
