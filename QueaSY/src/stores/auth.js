// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    login(username, password) {
      // Placeholder credentials
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
  },

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    this.error = error;
    if (!error) this.user = data.user;
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
});
