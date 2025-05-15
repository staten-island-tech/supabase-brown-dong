import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    login(username, password) {
      // placeholder
      const dummyUser = { username: "bob", password: "fish" };

      if (username === dummyUser.username && password === dummyUser.password) {
        this.user = { username: dummyUser.username };
        return true;
      }
      return false;
    },
    logout() {
      this.user = null;
    },

    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // duplicate email check
        if (error.message.includes("in use")) {
          auth.error.message = "twin this email already in use cuh 💔💔💔💔💔";
          alert("twin this email already in use cuh 💔💔💔💔💔");
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
      this.error = error;
      if (!error) this.user = data.user;
    },

    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },

    async fetchUser() {
      const { data } = await supabase.auth.getUser();
      this.user = data.user;
    },

    getters: {
      isAuthenticated: (state) => !!state.user,
    },
  },
});
