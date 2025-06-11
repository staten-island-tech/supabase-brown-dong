import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabase";

import HomePage from "@/views/HomePage.vue";
import FishTank from "@/views/FishTank.vue";
import StorePage from "@/views/StorePage.vue";
import SocialPage from "@/views/SocialPage.vue";
import HigherLower from "@/views/HigherLower.vue";
import SignUpView from "@/views/SignUpView.vue";
import UserStats from "@/views/UserStats.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home Page", component: HomePage },
    { path: "/signup", name: "Sign Up", component: SignUpView },
    {
      path: "/tank",
      name: "Fish Tank",
      component: FishTank,
      meta: { requiresAuth: true },
    },
    {
      path: "/stats",
      name: "User Stats",
      component: UserStats,
      meta: { requiresAuth: true },
    },
    {
      path: "/store",
      name: "Store",
      component: StorePage,
    },
    {
      path: "/social",
      name: "Social",
      component: SocialPage,
    },
    {
      path: "/HL",
      name: "HLGame",
      component: HigherLower,
    },
  ],
});

export default router;

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (to.meta.requiresAuth && !user) {
    next("/");
  } else {
    next();
  }
});
