import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // sets the user value to null (state is kinda like a reactive value, it can be edited)
  }),
  actions: {
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // duplicate email check
        console.log(error);
        if (error.message.includes("already")) {
          alert("twin this email already in use cuh 💔💔💔💔💔");
          // supabase.auth.error.message =
          //   "twin this email already in use cuh 💔💔💔💔💔";
        } else {
          this.error = error;
          alert(`Error: ${error.message}`);
          this.error = null;
        }
      } else {
        this.user = data.user;
        alert("Sign up successful twin ❤️ welcome twin");
      }
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) this.user = data.user;
      else {
        this.error = error;
        alert(error);
      }

      this.error = null;
    },
  },
});
