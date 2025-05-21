import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const authError = ref(null);

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      // duplicate email check
      console.log(error);
      if (error.message.includes("already")) {
        alert("twin this email already in use cuh 💔💔💔💔💔");
      } else {
        authError.value = error;
        alert(`Error: ${error.message}`);
      }
    } else {
      user.value = data.user;
      authError.value = null;
      alert("Sign up successful twin ❤️ welcome twin");
    }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) user.value = data.user;
    else {
      authError.value = error;
      alert(authError.message);
    }

    authError.value = null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    user.value = null;
  }

  return {
    user,
    authError,
    signUp,
    signIn,
    signOut,
  };
});
