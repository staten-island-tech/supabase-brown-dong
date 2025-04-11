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
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
