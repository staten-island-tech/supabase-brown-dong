import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    coins: 0,
    level: 1,
  }),
  actions: {
    async loadUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      this.user = user;

      const { data, error } = await supabase
        .from("Users")
        .select("coins")
        .eq("user_id", user.id) // makes sure that supabases user_id is equal to to user.id, which is provided through the getUser
        // data -> user -> like everything under the sun basically theres so much stuff under its "details"
        .single();

      console.log("Data:", data);
      console.log("Error:", error);

      if (!error && data) {
        console.log("Coins from Supabase:", data?.coins);

        this.coins = data.coins; // makes the current value of the coins on the website = the value of coins in data
      }
    },

    async updateCoins(amount) {
      if (!this.user) return;

      const { error } = await supabase
        .from("Users")
        .update({ coins: amount })
        .eq("user_id", this.user.id)
        .single();

      if (!error) {
        this.coins = amount;
      }
    },
  },
});
