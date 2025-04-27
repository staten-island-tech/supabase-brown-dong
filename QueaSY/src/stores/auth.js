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
        // signing up - covered by supabase!! yayayayayayaya

        email,
        password,
      });
      this.error = error; // if supabase says that theres an error, the error gets stored in the variable that also conveniently named error. wow! definitely not confusing and 100% clear.
      if (!error) this.user = data.user; // no error? yippe! the data from supabase (data.user) gets stored into pinia
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
