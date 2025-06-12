import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref(null);
  const coins = ref(0);
  const level = ref(1);

  async function loadUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    currentUser.value = user;

    const { data, error } = await supabase
      .from("Users")
      .select("coins, email")
      .eq("user_id", user.id) // makes sure that supabases user_id is equal to to user.id, which is provided through the getUser
      // data -> user -> like everything under the sun basically theres so much stuff under its "details"
      .single();

    // console.log("Data:", data);
    // console.log("Error:", error);

    if (!error && data) {
      console.log("Coins from Supabase:", data?.coins);

      coins.value = data.coins; // makes the current value of the coins on the website = the value of coins in data
      currentUser.value.email = data.email;
    }
    return user;
  }

  async function updateCoins(amount) {
    if (!currentUser.value) return;

    const { error } = await supabase
      .from("Users")
      .update({ coins: amount })
      .eq("user_id", currentUser.value.id)
      .single();

    if (!error) {
      coins.value = amount;
    }
  }
  return {
    currentUser,
    coins,
    level,
    loadUserData,
    updateCoins,
  };
});
